# EmailJS Templates Setup

## Required Templates

### 1. Chat Summary Template (for Ntando)
**Template ID**: `template_rz0619f`

**Subject**: New Chat Session from {{user_name}}

**Body**:
```
Hello Ntando,

You have received a new chat session from your portfolio website.

User Details:
- Name: {{user_name}}
- Email: {{user_email}}
- WhatsApp: {{user_whatsapp}}
- Timestamp: {{timestamp}}

Chat Transcript:
{{chat_transcript}}

Please follow up with this potential client.

Best regards,
Your Portfolio Chatbot
```

### 2. User Copy Template (for visitors)
**Template ID**: `template_user_copy`

**Subject**: Chat Summary - Thank you for contacting Ntando Badla

**Body**:
```
Hello {{user_name}},

Thank you for reaching out through my portfolio website! Here's a copy of our conversation:

Chat Summary:
{{chat_transcript}}

Session Details:
- Date: {{timestamp}}
- Your Email: {{user_email}}

I will review our conversation and get back to you soon. If you have any urgent questions, feel free to contact me directly.

Best regards,
Ntando Badla
Software Developer

Email: ntandobadla1@gmail.com
WhatsApp: +27 74 614 8629
```

## Setup Instructions

1. **Login to EmailJS Dashboard**
2. **Go to Email Templates**
3. **Create both templates with the exact Template IDs above**
4. **Set recipient emails**:
   - Chat Summary Template: Use `{{to_email}}` variable
   - User Copy Template: Use `{{to_email}}` variable
5. **Test both templates**

## Features

When users click "Send Chat Summary":
- ✅ **Email sent to you** with full chat details
- ✅ **Email sent to user** with conversation copy
- ✅ **WhatsApp notification** opens automatically for emergency alert
- ✅ **Chat gets cleared** after sending
- ✅ **Confirmation message** shown to user

## WhatsApp Integration

The system automatically opens WhatsApp with a pre-filled message containing:
- User's name and email
- Timestamp
- Chat summary (first 500 characters)
- Link to check email for full details

This ensures you get immediate notification of new inquiries!