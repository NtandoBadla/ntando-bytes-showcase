import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { validateApiKey } from '@/lib/chatgpt';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ChatbotTest = () => {
  const [testResults, setTestResults] = useState<{
    apiKey: boolean | null;
    speechRecognition: boolean | null;
    speechSynthesis: boolean | null;
    emailjs: boolean | null;
  }>({
    apiKey: null,
    speechRecognition: null,
    speechSynthesis: null,
    emailjs: null,
  });

  const runTests = () => {
    // Test API Key
    const apiKeyValid = validateApiKey();
    
    // Test Speech Recognition
    const speechRecognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    
    // Test Speech Synthesis
    const speechSynthesisSupported = 'speechSynthesis' in window;
    
    // Test EmailJS
    const emailjsConfigured = !!(
      import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY &&
      import.meta.env.VITE_EMAILJS_CHAT_TEMPLATE_ID
    );

    setTestResults({
      apiKey: apiKeyValid,
      speechRecognition: speechRecognitionSupported,
      speechSynthesis: speechSynthesisSupported,
      emailjs: emailjsConfigured,
    });
  };

  const getIcon = (result: boolean | null) => {
    if (result === null) return <AlertCircle className="h-5 w-5 text-gray-400" />;
    return result ? 
      <CheckCircle className="h-5 w-5 text-green-500" /> : 
      <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getStatus = (result: boolean | null) => {
    if (result === null) return 'Not tested';
    return result ? 'Working' : 'Not configured';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Chatbot Configuration Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runTests} className="w-full">
          Run Tests
        </Button>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>OpenAI API Key</span>
            <div className="flex items-center gap-2">
              {getIcon(testResults.apiKey)}
              <span className="text-sm">{getStatus(testResults.apiKey)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Speech Recognition</span>
            <div className="flex items-center gap-2">
              {getIcon(testResults.speechRecognition)}
              <span className="text-sm">{getStatus(testResults.speechRecognition)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Speech Synthesis</span>
            <div className="flex items-center gap-2">
              {getIcon(testResults.speechSynthesis)}
              <span className="text-sm">{getStatus(testResults.speechSynthesis)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>EmailJS Config</span>
            <div className="flex items-center gap-2">
              {getIcon(testResults.emailjs)}
              <span className="text-sm">{getStatus(testResults.emailjs)}</span>
            </div>
          </div>
        </div>
        
        {Object.values(testResults).some(result => result !== null) && (
          <div className="text-xs text-gray-600 mt-4">
            <p>This test component can be removed after setup verification.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatbotTest;