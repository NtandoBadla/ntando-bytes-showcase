interface ChatGPTMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatGPTResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const SYSTEM_PROMPT = `You are Ntando Badla's AI virtual assistant helping visitors learn about Ntando, a skilled software developer from South Africa.

Respond appropriately to different question types:

GREETINGS: Match their style warmly
- "Hi/Hello" → "Hello! How are you?"
- "Ola" → "Ola! How are you?"
- "Awe" → "Awe! How are you?"

IDENTITY: "I'm Ntando's AI assistant, here to help with questions about his services and skills."

EDUCATION: Walter Sisulu University graduate with ICT in Application Development , graduated as a Software Developer.

TECH STACK: Frontend (React, HTML, CSS, TypeScript, Tailwind CSS), Backend (Java, ASP.NET, Laravel PHP), Database (MySQL), Tools (EmailJS, npm, Node.js).

PRICING: Website development starts from R2,000 depending on complexity and features required.

Answer each question type specifically. Keep responses under 150 words. Encourage contacting Ntando for detailed discussions.`;

// Fallback responses for common questions
const getFallbackResponse = (message: string): string | null => {
  const msg = message.toLowerCase();
  
  if (msg.includes('hi') || msg.includes('hello') || msg.includes('ola') || msg.includes('awe')) {
    if (msg.includes('ola')) return "Ola! How are you? I'm Ntando's AI assistant, here to help with questions about his services.";
    if (msg.includes('awe')) return "Awe! How are you? I'm Ntando's AI assistant, here to help with questions about his services.";
    return "Hello! How are you? I'm Ntando's AI assistant, here to help with questions about his services.";
  }
  
  if (msg.includes('who are you') || msg.includes('what are you')) {
    return "I'm Ntando's AI assistant, here to help with questions about his services, skills, and experience as a software developer.";
  }
  
  if (msg.includes('tech stack') || msg.includes('technologies') || msg.includes('skills')) {
    return "Ntando's tech stack includes: Frontend (React, HTML, CSS, TypeScript, Tailwind CSS), Backend (Java, ASP.NET, Laravel PHP), Database (MySQL), and tools like EmailJS, npm, and Node.js.";
  }
  
  if (msg.includes('education') || msg.includes('university') || msg.includes('Qualification')) {
    return "Ntando is a Walter Sisulu University graduate with a diploma in ICT in Application Development, and graduated as a Software Developer.";
  }
  
  if (msg.includes('price') || msg.includes('cost') || msg.includes('charge')) {
    return "Website development starts from R2,000 depending on complexity and features required. Contact Ntando for a personalized quote based on your specific needs.";
  }
  
  return null;
};

export const sendToChatGPT = async (message: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    return getFallbackResponse(message) || "I'm currently experiencing configuration issues. Please use the contact form to reach Ntando directly.";
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: message
          }
        ] as ChatGPTMessage[],
        max_tokens: 150,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      console.error('API Error Status:', response.status);
      const fallback = getFallbackResponse(message);
      if (fallback) return fallback;
      
      if (response.status === 401) {
        return "I'm experiencing authentication issues. Please use the contact form to reach Ntando directly.";
      }
      if (response.status === 429) {
        return "I'm experiencing high demand right now. Please try your question again in a moment.";
      }
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: ChatGPTResponse = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      return getFallbackResponse(message) || "I'm sorry, I couldn't process that request. Please try rephrasing your question.";
    }

    return content.trim();
  } catch (error) {
    console.error('ChatGPT API Error:', error);
    
    const fallback = getFallbackResponse(message);
    if (fallback) return fallback;
    
    return "I'm experiencing technical difficulties. Please try again later or use the contact form to reach Ntando directly.";
  }
};

export const validateApiKey = (): boolean => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  return !!(apiKey && apiKey.startsWith('sk-') && apiKey.length > 50);
};