# EmailJS Setup Guide

To enable email functionality in your contact form, follow these steps:

## 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose Gmail (or your preferred email provider)
4. Connect your Gmail account (ntandobadla1@gmail.com)
5. Copy the Service ID

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
Hello,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. Save the template and copy the Template ID

## 4. Get Public Key
1. Go to "Account" > "General"
2. Copy your Public Key

## 5. Update Environment Variables
Update the `.env` file with your actual values:

```
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## 6. Test the Form
1. Restart your development server: `npm run dev`
2. Fill out the contact form on your website
3. Check your email (ntandobadla1@gmail.com) for the message

## Important Notes
- Keep your `.env` file secure and don't commit it to version control
- EmailJS free plan allows 200 emails per month
- Make sure to enable "Allow less secure apps" in Gmail if needed