import { createClient } from '@supabase/supabase-js';

export interface ProjectMetrics {
  users: number;
  uptime: number;
  performance: number;
  security: string;
  lastUpdated: Date;
}

export interface ProjectStats {
  votesphere: ProjectMetrics;
  lockerSystem: ProjectMetrics;
}

const voteSphereClient = createClient(
  import.meta.env.VITE_VOTESPHERE_SUPABASE_URL,
  import.meta.env.VITE_VOTESPHERE_SUPABASE_ANON_KEY
);

const amandlaClient = createClient(
  import.meta.env.VITE_AMANDLA_SUPABASE_URL,
  import.meta.env.VITE_AMANDLA_SUPABASE_ANON_KEY
);

class MetricsService {
  private cache: Map<string, { data: ProjectMetrics; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 30000;

  async fetchVoteSphereMetrics(): Promise<ProjectMetrics> {
    try {
      const { count, error } = await voteSphereClient
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;

      return {
        users: count ?? 0,
        uptime: 99.8,
        performance: 95,
        security: 'A+',
        lastUpdated: new Date()
      };
    } catch (err) {
      console.warn('VoteSphere Supabase error:', err);
      return { users: 0, uptime: 99.8, performance: 95, security: 'A+', lastUpdated: new Date() };
    }
  }

  async fetchLockerSystemMetrics(): Promise<ProjectMetrics> {
    try {
      const [studentsRes, adminsRes, parentsRes] = await Promise.all([
        amandlaClient.from('students').select('*', { count: 'exact', head: true }),
        amandlaClient.from('admin').select('*', { count: 'exact', head: true }),
        amandlaClient.from('parents').select('*', { count: 'exact', head: true }),
      ]);

      const total = (studentsRes.count ?? 0) + (adminsRes.count ?? 0) + (parentsRes.count ?? 0);

      return {
        users: total,
        uptime: 99.5,
        performance: 92,
        security: '+85%',
        lastUpdated: new Date()
      };
    } catch (err) {
      console.warn('Amandla Supabase error:', err);
      return { users: 0, uptime: 99.5, performance: 92, security: '+85%', lastUpdated: new Date() };
    }
  }

  async getMetricsWithCache(projectId: string): Promise<ProjectMetrics> {
    const cached = this.cache.get(projectId);
    const now = Date.now();

    if (cached && now - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    const metrics = projectId === 'votesphere'
      ? await this.fetchVoteSphereMetrics()
      : await this.fetchLockerSystemMetrics();

    this.cache.set(projectId, { data: metrics, timestamp: now });
    return metrics;
  }

  async getAllMetrics(): Promise<ProjectStats> {
    const [votesphere, lockerSystem] = await Promise.all([
      this.getMetricsWithCache('votesphere'),
      this.getMetricsWithCache('locker-system')
    ]);

    return { votesphere, lockerSystem };
  }
}

export const metricsService = new MetricsService();
