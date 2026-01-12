import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Mic, MicOff, Send, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useChatbot } from "@/hooks/use-chatbot";
import { sendToChatGPT, validateApiKey } from "@/lib/chatgpt";
import { sendToN8nAgent, validateN8nConfig } from "@/lib/n8n-agent";
import emailjs from '@emailjs/browser';



const Chatbot = () => {
  const { toast } = useToast();
  const {
    messages,
    isLoading,
    userInfo,
    setIsLoading,
    addMessage,
    updateUserInfo,
    setMessages
  } = useChatbot();
  
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [useN8nAgent, setUseN8nAgent] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage(
        "👋 Hi there! I'm Ntando's virtual assistant. You can type or record your question — how can I help you today?",
        false
      );
    }
  }, [isOpen, messages.length, addMessage]);

  useEffect(() => {
    if (isOpen) {
      const hasN8n = validateN8nConfig();
      const hasChatGPT = validateApiKey();
      
      if (!hasN8n && !hasChatGPT) {
        toast({
          title: "Configuration Notice",
          description: "AI features may be limited. Please use the contact form for direct communication.",
          variant: "default",
        });
      } else if (!hasN8n) {
        setUseN8nAgent(false);
        toast({
          title: "Using ChatGPT",
          description: "N8N agent not configured, falling back to ChatGPT.",
          variant: "default",
        });
      }
    }
  }, [isOpen, toast]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Could not recognize speech. Please try again.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      toast({
        title: "Voice Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };



  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessageText = inputText;
    addMessage(userMessageText, true);
    setInputText("");
    setIsLoading(true);

    try {
      let response: string;
      
      if (useN8nAgent && validateN8nConfig()) {
        try {
          response = await sendToN8nAgent(userMessageText, {
            userInfo,
            timestamp: new Date().toISOString()
          });
        } catch (n8nError) {
          console.warn('N8N agent failed, falling back to ChatGPT:', n8nError);
          response = await sendToChatGPT(userMessageText);
        }
      } else {
        response = await sendToChatGPT(userMessageText);
      }
      
      addMessage(response, false);
      speakText(response);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage("I'm sorry, something went wrong. Please try again.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailSummary = async () => {
    if (!userInfo.name || !userInfo.email) {
      setShowUserForm(true);
      return;
    }

    try {
      const chatTranscript = messages
        .filter(msg => msg.id !== 'welcome')
        .map(msg => `${msg.isUser ? userInfo.name || 'Visitor' : 'Assistant'}: ${msg.text}`)
        .join('\n');

      const emailData = {
        user_name: userInfo.name,
        user_email: userInfo.email,
        chat_transcript: chatTranscript,
        timestamp: new Date().toLocaleString(),
      };

      // Send to Ntando (owner)
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CHAT_TEMPLATE_ID,
        {
          to_email: 'ntandobadla1@gmail.com',
          ...emailData
        }
      );

      // Send copy to user
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: userInfo.email,
          ...emailData
        }
      );

      // Send WhatsApp notification to Ntando
      const whatsappMessage = `🤖 New Chat Summary\n\nFrom: ${userInfo.name}\nEmail: ${userInfo.email}\nTime: ${new Date().toLocaleString()}\n\nChat Summary:\n${chatTranscript.substring(0, 500)}...\n\nCheck your email for full details.`;
      const whatsappUrl = `https://wa.me/27746148629?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      // Clear chat and show confirmation
      setMessages([]);
      addMessage("Thank you! Chat summary sent to both you and Ntando. He will get in touch with you soon. A WhatsApp notification has also been sent.", false);
      setShowUserForm(false);
      
      toast({
        title: "Chat Summary Sent!",
        description: "Summary sent to both emails and WhatsApp notification created.",
      });
    } catch (error) {
      console.error('Email Error:', error);
      toast({
        title: "Error",
        description: "Failed to send chat summary. Please try the contact form.",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative group">
          {/* Tooltip */}
          <div className="absolute bottom-16 right-0 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            🤖 How can I assist you?
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
          </div>
          
          {/* Chat Button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full shadow-xl bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <div className="flex flex-col items-center">
              <span className="text-lg">🤖</span>
              <MessageCircle className="h-4 w-4 mt-1" />
            </div>
          </Button>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-3rem)] shadow-xl z-50 transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        } md:w-96 md:h-[500px]`}>
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-lg">Chat with Ntando's AI</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex flex-col h-[400px] p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {!message.isUser && message.id !== 'welcome' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => isSpeaking ? stopSpeaking() : speakText(message.text)}
                        className="mt-2 h-6 w-6 p-0"
                      >
                        {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* User Info Form */}
            {showUserForm && (
              <div className="p-4 border-t bg-secondary/50">
                <p className="text-sm mb-2">Please provide your details to send chat summary:</p>
                <div className="space-y-2">
                  <Input
                    placeholder="Your Name"
                    value={userInfo.name}
                    onChange={(e) => updateUserInfo({ name: e.target.value })}
                  />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => updateUserInfo({ email: e.target.value })}
                  />
                  <Input
                    placeholder="WhatsApp Number (optional)"
                    type="tel"
                    value={userInfo.whatsapp || ''}
                    onChange={(e) => updateUserInfo({ whatsapp: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button onClick={sendEmailSummary} size="sm" className="flex-1">
                      Send Summary
                    </Button>
                    <Button onClick={() => setShowUserForm(false)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex gap-2 mb-2">
                <Button onClick={sendEmailSummary} variant="outline" size="sm" className="text-xs">
                  Send Chat Summary
                </Button>
                {validateN8nConfig() && (
                  <Button 
                    onClick={() => setUseN8nAgent(!useN8nAgent)} 
                    variant={useN8nAgent ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                  >
                    {useN8nAgent ? "🤖 N8N" : "💬 GPT"}
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={isListening ? stopListening : startListening}
                  variant="outline"
                  size="icon"
                  className={isListening ? 'bg-red-500 text-white' : ''}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button onClick={sendMessage} disabled={isLoading || !inputText.trim()} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;