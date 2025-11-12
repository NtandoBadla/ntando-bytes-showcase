# AI Chatbot Setup Guide

## Overview
This AI-powered chatbot integrates with your React + TypeScript + Tailwind CSS portfolio to provide:
- Text and voice communication
- ChatGPT API integration for intelligent responses
- Email notifications via EmailJS
- Text-to-speech responses
- Mobile-responsive design

## Prerequisites
- Node.js and npm installed
- OpenAI API account
- EmailJS account (already configured)

## Installation Steps

### 1. Install Dependencies
The chatbot uses existing dependencies in your project. No additional packages needed.

### 2. Environment Variables Setup

Update your `.env` file with the following variables:

```env
# Existing EmailJS configuration
VITE_EMAILJS_SERVICE_ID=service_g2e0rdz
VITE_EMAILJS_TEMPLATE_ID=template_gdw6kor
VITE_EMAILJS_PUBLIC_KEY=Llol5ilLg7owVcbPl

# New variables for chatbot
VITE_EMAILJS_CHAT_TEMPLATE_ID=template_chat_summary
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and replace `your_openai_api_key_here` in your `.env` file

### 4. Create EmailJS Chat Template

1. Log in to your [EmailJS dashboard](https://www.emailjs.com/)
2. Go to Email Templates
3. Create a new template with ID: `template_chat_summary`
4. Use this template content:

**Subject:** New Chat Session from {{user_name}}

**Body:**
```
Hello Ntando,

You have received a new chat session summary from your portfolio website.

User Details:
- Name: {{user_name}}
- Email: {{user_email}}
- Timestamp: {{timestamp}}

Chat Transcript:
{{chat_transcript}}

Best regards,
Your Portfolio Chatbot
```

### 5. Browser Permissions

The chatbot uses Web APIs that require user permission:
- **Microphone Access**: For voice input (Speech Recognition)
- **Audio Playback**: For text-to-speech responses

Users will be prompted to grant these permissions when they first use the features.

## Features

### 1. Chat Interface
- Floating chat button in bottom-right corner
- Clean, modern UI with Tailwind CSS styling
- Mobile-responsive design
- Welcome message on first interaction

### 2. Voice Input
- Click microphone button to start voice recording
- Automatic speech-to-text conversion
- Visual feedback during recording
- Fallback for unsupported browsers

### 3. AI Responses
- Integration with ChatGPT API (GPT-3.5-turbo)
- Context-aware responses about your portfolio
- Professional tone and helpful information
- Fallback responses for API errors

### 4. Voice Output
- Text-to-speech for all bot responses
- Play/stop controls for each message
- Adjustable speech rate and volume

### 5. Email Notifications
- Chat summary sent via EmailJS
- User contact information collection
- Full conversation transcript
- Timestamp and session details

## Usage

### For Users
1. Click the chat icon to open the chatbot
2. Type messages or use voice input (microphone button)
3. Listen to responses or read them
4. Request chat summary to be sent to you

### For You (Portfolio Owner)
- Receive email notifications with chat summaries
- Review user conversations and inquiries
- Follow up with potential clients/employers

## Customization

### Modify AI Personality
Edit the system prompt in `Chatbot.tsx`:

```typescript
const systemPrompt = `You are Ntando Badla's virtual assistant. Ntando is a skilled software developer and web developer. Answer questions about his skills, experience, and services professionally and helpfully.`;
```

### Styling
The chatbot uses your existing Tailwind CSS classes and shadcn/ui components. Modify the JSX classes to match your design preferences.

### Response Length
Adjust the `max_tokens` parameter in the ChatGPT API call to control response length.

## Troubleshooting

### Common Issues

1. **Voice Recognition Not Working**
   - Ensure HTTPS connection (required for microphone access)
   - Check browser compatibility (Chrome, Edge, Safari)
   - Grant microphone permissions

2. **ChatGPT API Errors**
   - Verify API key is correct and active
   - Check OpenAI account billing and usage limits
   - Ensure proper CORS configuration

3. **Email Not Sending**
   - Verify EmailJS template ID matches `.env` variable
   - Check EmailJS service configuration
   - Ensure user provides valid email address

4. **Text-to-Speech Issues**
   - Check browser compatibility
   - Ensure audio is not muted
   - Try different browsers if issues persist

### Browser Compatibility

- **Speech Recognition**: Chrome, Edge, Safari (latest versions)
- **Speech Synthesis**: All modern browsers
- **General Chat**: All browsers with JavaScript enabled

## Security Considerations

1. **API Key Protection**
   - Never commit API keys to version control
   - Use environment variables for all sensitive data
   - Consider server-side proxy for production

2. **Rate Limiting**
   - Implement client-side rate limiting for API calls
   - Monitor OpenAI usage and costs
   - Set up billing alerts

3. **User Data**
   - Chat conversations are not stored locally
   - Email summaries contain user-provided information
   - Follow privacy best practices

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Environment Variables in Production
Ensure all environment variables are properly set in your hosting platform:
- Vercel: Project Settings > Environment Variables
- Netlify: Site Settings > Environment Variables
- Other platforms: Follow their specific documentation

## Cost Considerations

### OpenAI API Costs
- GPT-3.5-turbo: ~$0.002 per 1K tokens
- Monitor usage in OpenAI dashboard
- Set up billing alerts and limits

### EmailJS Limits
- Free tier: 200 emails/month
- Upgrade if you expect high chat volume

## Support

If you encounter issues:
1. Check browser console for error messages
2. Verify all environment variables are set correctly
3. Test API keys independently
4. Review EmailJS template configuration

The chatbot is now ready to enhance user engagement on your portfolio website!