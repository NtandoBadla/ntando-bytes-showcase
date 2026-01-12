interface N8nResponse {
  response: string;
  success: boolean;
  error?: string;
}

interface N8nRequest {
  message: string;
  userId?: string;
  context?: any;
}

export const sendToN8nAgent = async (message: string, context?: any): Promise<string> => {
  const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  
  if (!n8nWebhookUrl) {
    throw new Error('N8N webhook URL not configured');
  }

  try {
    const requestData: N8nRequest = {
      message,
      userId: `user_${Date.now()}`,
      context: context || {}
    };

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`N8N request failed with status ${response.status}`);
    }

    const data: N8nResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'N8N agent returned an error');
    }

    return data.response;
  } catch (error) {
    console.error('N8N Agent Error:', error);
    throw error;
  }
};

export const validateN8nConfig = (): boolean => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  return !!(webhookUrl && webhookUrl.startsWith('http'));
};