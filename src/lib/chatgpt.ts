import { formatCVForChatbot } from '@/data/cv-knowledge';

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

const getSystemPrompt = (): string => {
  const cvData = formatCVForChatbot();
  
  return `You are Ntando Badla's AI virtual assistant helping visitors learn about Ntando, a skilled software developer from South Africa.

Respond appropriately to different question types:

GREETINGS: Match their style warmly
- "Hi/Hello" → "Hello! How are you?"
- "Ola" → "Ola! How are you?"
- "Awe" → "Awe! How are you?"

IDENTITY: "I'm Ntando's AI assistant, here to help with questions about his services and skills."

Here is Ntando's complete CV information:
${cvData}

When asked about specific topics, provide COMPLETE and DETAILED information:

EDUCATION questions: Include ALL education details - university, degree, achievements, high school, internships, and certifications.

EXPERIENCE questions: Include ALL work experience with companies, positions, durations, responsibilities, and technologies used.

SKILLS questions: List ALL technical skills including programming languages, databases, frameworks, and tools.

PROJECTS questions: Describe ALL projects with technologies, features, achievements, AND explain WHY Ntando built each one. Always include the motivation/reason behind each project.

ACHIEVEMENTS questions: List ALL accomplishments, certifications, and leadership roles.

SERVICES questions: Provide pricing, technologies offered, and service features.

CONTACT questions: Provide email, phone, and website information.

CURRENTLY BUSY WITH questions: Tell them exactly what Ntando is currently working on and focused on right now.

Always be comprehensive and detailed in your responses. Don't summarize - give complete information. Keep responses under 300 words but include all relevant details. Encourage contacting Ntando for detailed discussions.`;
};

const getFallbackResponse = (message: string): string | null => {
  const msg = message.toLowerCase();
  
  if (msg.includes('thank') || msg === 'ty' || msg.includes('appreciate') || msg.includes('thanks')) {
    return "My pleasure! Feel free to ask if there's anything else you'd like to know about Ntando.";
  }

  if (msg.includes('who is ntando') || msg.includes('tell me about ntando') || msg.includes('about ntando')) {
    return `Ntando Badla is a Full Stack Software Developer from Stellenbosch Kayamandi, South Africa.

He holds a Diploma in ICT Application Development from Walter Sisulu University (graduated with distinction, 2024) and has hands-on experience building full-stack web applications using React, Python, Java, Laravel, and MySQL.

He's worked as a Software Developer Intern at Codecraft, an Asset Auditor at Akhile, and a Tutor at WSU. He also completed an IT internship at NetCampus where he earned Microsoft Azure and Office 365 certifications.

His standout projects include VoteSphere (a secure online voting platform) and a Smart Locker Booking System for Amandla High School.

You can reach him at ntandobadla1@gmail.com or +27 74 614 8629.`;
  }

  if (msg.includes('hi') || msg.includes('hello') || msg.includes('ola') || msg.includes('awe') || msg.includes('hey')) {
    if (msg.includes('ola')) return "Ola! How are you? I'm Ntando's AI assistant, here to help with questions about his services.";
    if (msg.includes('awe')) return "Awe! How are you? I'm Ntando's AI assistant, here to help with questions about his services.";
    return "Hello! How are you? I'm Ntando's AI assistant, here to help with questions about his services.";
  }

  if (msg.includes('who are you') || msg.includes('what are you')) {
    return "I'm Ntando's AI assistant, here to help with questions about his services, skills, and experience as a software developer.";
  }
  
  if (msg.includes('education') || msg.includes('university') || msg.includes('qualification') || msg.includes('study') || msg.includes('degree')) {
    return `Ntando's Education:

Walter Sisulu University (Dec 2024)
- Diploma in ICT Application Development
- Graduated with distinction
- Average score: 65%
- Built Residence Management System (Oracle Apex)
- Deputy Chairperson of House Committee

Vulamasango Secondary School (Dec 2020)
- Grade 12 completed
- Student leader for 3 consecutive years

NetCampus IT Internship (May 2025)
- Azure Data Services certification
- Microsoft 365 Copilot training
- Data Management & Analytics`;
  }
  
  if (msg.includes('experience') || msg.includes('work') || msg.includes('job') || msg.includes('employment')) {
    return `Ntando's Work Experience:

VoteSphere Project (Aug-Sep 2025)
- Full Stack Developer
- Built secure online voting platform
- React + Tailwind CSS frontend
- MySQL database management

Akhile - Asset Auditor (Apr-May 2025)
- Physical asset verification across sites
- Python, JavaScript, React

Codecraft - Software Developer Intern (Apr 2025)
- Contact Management System (30% efficiency boost)
- Web Scraping App (40% time reduction)
- Java, JSoup development

Walter Sisulu University - Tutor (Jun-Nov 2024)
- ICT modules mentoring
- Front-end to back-end integration`;
  }
  
  if (msg.includes('tech stack') || msg.includes('technologies') || msg.includes('skills') || msg.includes('programming')) {
    return `Ntando's Technical Skills:

Programming: Java, PHP, Laravel, React, HTML, VB.NET, CSS, JavaScript, Python
Databases: MySQL, Oracle Apex, MS SQL Server
Design: Figma
Frameworks: React, Laravel, .NET Framework
Systems: ERP, IMS, BAAN, SSRS
Other: DevOps, CI/CD, Cloud concepts, API integration`;
  }
  
  if (msg.includes('project') || msg.includes('portfolio') || msg.includes('built') || msg.includes('developed')) {
    return `Ntando's Key Projects:

VoteSphere - Online Voting Platform
- React, Tailwind CSS, Python, MySQL
- Secure authentication & role management
- Live: vote-phere.netlify.app
- Why built: Many communities rely on manual voting which is slow and error-prone. Ntando built VoteSphere to provide a secure, transparent digital voting solution.

Residence Management System
- Oracle Apex development
- Student & room management
- Why built: To solve manual residence administration at WSU — automating room allocation and record-keeping for students and staff.

Car Selling Website
- Team collaboration project
- Vehicle listings & search
- Why built: Local car dealers lacked an online presence, so the team built a platform giving sellers a digital storefront and buyers an easy way to browse vehicles.

Contact Management System
- Java-based, 30% efficiency improvement
- Why built: To replace inefficient manual contact management at Codecraft, creating a structured searchable system that saves time and reduces errors.

Web Scraping Application
- Java & JSoup, 40% time reduction
- Why built: To eliminate tedious manual data collection from multiple websites, automating the process and freeing up time for more valuable work.`;
  }

  if (msg.includes('busy') || msg.includes('currently') || msg.includes('working on') || msg.includes('what are you doing') || msg.includes('what is ntando doing')) {
    return `Here's what Ntando is currently busy with:

Ntando has been shortlisted for the CAPACITI – Clickatell Academy programme (March 2026 intake) for Systems Support, Full Stack Development, and Automation Testing. He has an on-site interview coming up for this exciting 6–12 month programme.

He is also:
- Preparing for the CAPACITI interview
- Continuing to build and improve his portfolio projects
- Sharpening his skills in React, Python, and automation testing

This is a fantastic opportunity and he is very focused on making the most of it!`;
  }
  
  if (msg.includes('price') || msg.includes('cost') || msg.includes('charge') || msg.includes('service')) {
    return `Ntando's Services:

Web Development: Starting from R2,000
Technologies: React, Laravel, Java, Python, MySQL
Features: Responsive design, Database integration, API development, Authentication, Performance optimization, DevOps deployment

Consulting: Technical consulting and mentoring
Contact: ntandobadla1@gmail.com | +27 74 614 8629`;
  }
  
  if (msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('phone')) {
    return `Contact Ntando:

Email: ntandobadla1@gmail.com
Phone: +27 74 614 8629
Website: ntando.netlify.app
Location: Stellenbosch Kayamandi, South Africa
LinkedIn: linkedin.com/in/ntando-badla
GitHub: github.com/ntandobadla`;
  }
  
  return null;
};

export const sendToChatGPT = async (message: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const fallback = getFallbackResponse(message);
  
  if (!apiKey) {
    return fallback || "I don't have an answer for that right now, but you can reach Ntando directly at ntandobadla1@gmail.com or +27 74 614 8629.";
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
            content: getSystemPrompt()
          },
          {
            role: 'user',
            content: message
          }
        ] as ChatGPTMessage[],
        max_tokens: 300,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      console.error('API Error Status:', response.status);
      if (fallback) return fallback;
      if (response.status === 429) {
        return "I'm a little busy right now — please try again in a moment!";
      }
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: ChatGPTResponse = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      return fallback || "Could you rephrase that? I want to make sure I give you the right answer.";
    }

    return content.trim();
  } catch (error) {
    console.error('ChatGPT API Error:', error);
    
    if (fallback) return fallback;
    return "I didn't quite catch that — could you try asking in a different way? Or feel free to contact Ntando directly at ntandobadla1@gmail.com.";
  }
};

export const validateApiKey = (): boolean => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  return !!(apiKey && apiKey.startsWith('sk-') && apiKey.length > 50);
};