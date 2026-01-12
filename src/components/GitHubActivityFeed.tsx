import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, GitCommit, Star, GitFork, ExternalLink, RefreshCw } from "lucide-react";
import { githubService, GitHubRepo, GitHubCommit, GitHubStats } from "@/services/githubService";

const GitHubActivityFeed = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGitHubData();
  }, []);

  const loadGitHubData = async () => {
    setIsLoading(true);
    try {
      const [reposData, commitsData, statsData] = await Promise.all([
        githubService.getRepositories(),
        githubService.getRecentCommits(),
        githubService.getUserStats()
      ]);
      
      setRepos(reposData);
      setCommits(commitsData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load GitHub data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const ContributionHeatmap = ({ data }: { data: Array<{ date: string; count: number }> }) => {
    const weeks = [];
    for (let i = 0; i < data.length; i += 7) {
      weeks.push(data.slice(i, i + 7));
    }

    const getIntensity = (count: number) => {
      if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
      if (count <= 1) return 'bg-green-200 dark:bg-green-900';
      if (count <= 2) return 'bg-green-300 dark:bg-green-700';
      if (count <= 3) return 'bg-green-400 dark:bg-green-600';
      return 'bg-green-500 dark:bg-green-500';
    };

    return (
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`w-3 h-3 rounded-sm ${getIntensity(day.count)}`}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const LanguageChart = ({ languages }: { languages: Record<string, number> }) => {
    const total = Object.values(languages).reduce((sum, count) => sum + count, 0);
    const sortedLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500'];

    return (
      <div className="space-y-3">
        {sortedLanguages.map(([language, count], index) => {
          const percentage = (count / total) * 100;
          return (
            <div key={language} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                  {language}
                </span>
                <span className="text-muted-foreground">{count} repos</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${colors[index]}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="github-activity" className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-4xl md:text-5xl font-bold animate-slide-up">
                GitHub Activity
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={loadGitHubData}
                disabled={isLoading}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time view of my coding activity and open source contributions
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full" />
          </div>

          {/* Stats Overview */}
          {stats && (
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-6 text-center">
                  <Github className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{stats.totalRepos}</div>
                  <div className="text-sm text-muted-foreground">Repositories</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-6 text-center">
                  <GitCommit className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{stats.totalCommits}</div>
                  <div className="text-sm text-muted-foreground">Commits</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{stats.totalStars}</div>
                  <div className="text-sm text-muted-foreground">Stars Earned</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">{Object.keys(stats.languages).length}</div>
                  <div className="text-sm text-muted-foreground">Languages</div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contribution Heatmap */}
            <Card className="lg:col-span-2 border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <GitCommit className="w-5 h-5" />
                  Contribution Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats && <ContributionHeatmap data={stats.contributionData} />}
                <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map(level => (
                      <div
                        key={level}
                        className={`w-3 h-3 rounded-sm ${
                          level === 0 ? 'bg-gray-100 dark:bg-gray-800' : 
                          level === 1 ? 'bg-green-200 dark:bg-green-900' :
                          level === 2 ? 'bg-green-300 dark:bg-green-700' :
                          level === 3 ? 'bg-green-400 dark:bg-green-600' : 'bg-green-500 dark:bg-green-500'
                        }`}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </CardContent>
            </Card>

            {/* Language Distribution */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="text-primary">Top Languages</CardTitle>
              </CardHeader>
              <CardContent>
                {stats && <LanguageChart languages={stats.languages} />}
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Recent Repositories */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Github className="w-5 h-5" />
                  Recent Repositories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {repos.slice(0, 4).map((repo) => (
                  <div key={repo.name} className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-primary">{repo.name}</h4>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{repo.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      {repo.language && (
                        <Badge variant="secondary" className="text-xs">
                          {repo.language}
                        </Badge>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {repo.forks}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Commits */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <GitCommit className="w-5 h-5" />
                  Recent Commits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {commits.slice(0, 6).map((commit) => (
                  <div key={commit.sha} className="flex items-start gap-3 p-3 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{commit.message}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{commit.repo}</span>
                        <span>•</span>
                        <span>{commit.sha}</span>
                        <span>•</span>
                        <span>{new Date(commit.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={commit.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivityFeed;