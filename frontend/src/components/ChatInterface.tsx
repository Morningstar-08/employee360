import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

// Types for chat messages
interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content:
        "Hello! I'm your Employee360 AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //Main API integration call
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsThinking(true);

    // --- START: API INTEGRATION ---
    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add your auth token if required
          // 'Authorization': `Bearer ${your_jwt_token}`
        },
        body: JSON.stringify({ message: inputText }),
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      // Add a placeholder for the AI's response
      const aiResponseId = Date.now().toString();
      setMessages((prev) => [
        ...prev,
        {
          id: aiResponseId,
          content: "", // Start with empty content
          sender: "ai",
          timestamp: new Date(),
        },
      ]);

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value);

        // SSE format is "data: {...}\n\n"
        const lines = chunk.split("\n\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonString = line.substring(6);
            if (jsonString) {
              const parsed = JSON.parse(jsonString);
              // Update the AI message content as new chunks arrive
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiResponseId
                    ? { ...msg, content: msg.content + (parsed.content || "") }
                    : msg
                )
              );
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      // Optionally handle the error in the UI
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content:
            "Sorry, I'm having trouble connecting. Please try again later.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
    // --- END: API INTEGRATION ---
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)] bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-sm border">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-white/80 backdrop-blur-sm rounded-t-lg">
        <Avatar className="h-10 w-10 ring-2 ring-blue-100">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <Bot className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-gray-900">
            Employee360 AI Assistant
          </h2>
          <p className="text-sm text-gray-500">
            Here to help with employee insights
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white/50 to-gray-50/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3 max-w-4xl transition-all duration-200 ease-in-out",
              message.sender === "user" ? "flex-row-reverse ml-auto" : "mr-auto"
            )}
          >
            <Avatar
              className={cn(
                "h-8 w-8 flex-shrink-0 ring-2 transition-all duration-200",
                message.sender === "user"
                  ? "order-2 ring-green-100"
                  : "ring-blue-100"
              )}
            >
              <AvatarFallback
                className={cn(
                  "transition-colors duration-200",
                  message.sender === "user"
                    ? "bg-gradient-to-br from-green-500 to-green-600 text-white"
                    : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                )}
              >
                {message.sender === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </AvatarFallback>
            </Avatar>

            <div
              className={cn(
                "flex flex-col gap-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl",
                message.sender === "user" ? "items-end" : "items-start"
              )}
            >
              <Card
                className={cn(
                  "p-3 shadow-sm border-0 transition-all duration-200 hover:shadow-md",
                  message.sender === "user"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                    : "bg-white border border-gray-100 hover:border-gray-200"
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              </Card>
              <span className="text-xs text-gray-500 px-1">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {/* Thinking indicator */}
        {isThinking && (
          <div className="flex items-start gap-3 max-w-4xl mr-auto animate-in fade-in duration-300">
            <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-blue-100">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <Card className="p-4 bg-white border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    AI is thinking...
                  </span>
                </div>
              </Card>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white/80 backdrop-blur-sm rounded-b-lg">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about employee insights, retention, or anything else..."
              className="resize-none min-h-[44px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white/80"
              disabled={isThinking}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isThinking}
            className="h-[44px] px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
