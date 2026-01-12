# N8N AI Agent Integration Guide

## N8N Workflow Setup

### 1. Create New Workflow in N8N

1. Open your n8n instance
2. Create a new workflow
3. Add the following nodes:

### 2. Node Configuration

#### Webhook Node (Trigger)
- **HTTP Method**: POST
- **Path**: `/webhook/chatbot`
- **Response Mode**: Respond to Webhook
- **Response Data**: JSON

#### AI Agent Node (OpenAI/ChatGPT)
- **Resource**: Chat
- **Operation**: Message a Model
- **Model**: gpt-3.5-turbo or gpt-4
- **Messages**: 
  ```json
  [
    {
      "role": "system",
      "content": "You are Ntando Badla's advanced AI assistant. You have access to enhanced capabilities through n8n automation. Provide helpful, accurate responses about Ntando's services, skills, and experience."
    },
    {
      "role": "user", 
      "content": "{{ $json.message }}"
    }
  ]
  ```

#### HTTP Response Node
- **Response Code**: 200
- **Response Body**:
  ```json
  {
    "success": true,
    "response": "{{ $node['OpenAI'].json.choices[0].message.content }}",
    "timestamp": "{{ $now }}"
  }
  ```

### 3. Advanced N8N Features You Can Add

#### A. Database Integration
- Add **MySQL/PostgreSQL** node to log conversations
- Store user interactions for analytics

#### B. Email Notifications
- Add **Email** node to notify you of important queries
- Trigger on specific keywords or user requests

#### C. Calendar Integration
- Add **Google Calendar** node for appointment scheduling
- Automatically book consultations

#### D. CRM Integration
- Add **HubSpot/Salesforce** node to track leads
- Automatically create contacts from chat interactions

#### E. Conditional Logic
- Add **IF** nodes for complex routing
- Different responses based on user intent

### 4. Sample Enhanced Workflow Structure

```
Webhook → IF (Intent Detection) → Branch 1: OpenAI Chat
                                → Branch 2: Calendar Booking
                                → Branch 3: Email Notification
                                → Branch 4: Database Log
                                → HTTP Response
```

### 5. Environment Variables for N8N

Set these in your n8n environment:
- `OPENAI_API_KEY`: Your OpenAI API key
- `DATABASE_URL`: Database connection string (if using)
- `EMAIL_SERVICE`: Email service credentials

### 6. Testing Your Integration

1. Deploy your n8n workflow
2. Copy the webhook URL
3. Update your `.env` file with the webhook URL
4. Test the chatbot integration

### 7. Error Handling

The workflow should handle:
- Invalid requests
- API failures
- Rate limiting
- Timeout errors

### 8. Security Considerations

- Use HTTPS for webhook URLs
- Implement rate limiting
- Validate incoming requests
- Sanitize user inputs

## Benefits of N8N Integration

1. **Enhanced Capabilities**: Access to 400+ integrations
2. **Workflow Automation**: Complex business logic
3. **Data Persistence**: Store and analyze conversations
4. **Multi-service Integration**: Connect multiple APIs
5. **Visual Workflow**: Easy to modify and maintain
6. **Scalability**: Handle high-volume requests
7. **Monitoring**: Built-in execution logs and error tracking