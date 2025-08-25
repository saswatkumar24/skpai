import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

interface FixedChatBotProps {
  className?: string;
}

// Website data that the AI can access
const websiteData = {
  personal: {
    name: "Saswat Patro",
    title: "Senior Tech Lead",
    email: "saswat24@gmail.com",
    linkedin: "https://www.linkedin.com/in/saswat-kumar-patro-55874669/",
    github: "https://github.com/saswatkumar24",
    portfolio: "saswat.dev"
  },
  experience: [
    {
      year: "2022 - Present",
      title: "Senior Tech Lead",
      company: "HCL Tech (Deutsche Bank Client)",
      description: "Application management and Project Automation. Integrating different services and tools like Netcool, Newrelic and ServiceNow Integration & MS Teams integration with Geneos. Managing servers and maintaining their health through Nimsoft and NRI. Writing perl modules, scripts, unit tests to automate various alerts and reports as per client requirement.",
      skills: ["Perl", "Shell Scripting", "Netcool", "Newrelic", "ServiceNow", "Geneos", "Nimsoft", "NRI", "CI/CD", "Automation"]
    },
    {
      year: "2020 - 2022",
      title: "I Associate - Project",
      company: "Cognizant Technology Solutions (Mastercard Client)",
      description: "Application development and Database management. Implementing various protocols for Mastercard. Writing perl modules, scripts, unit tests for different projects as per client requirement.",
      skills: ["Perl", "Database Management", "Unit Testing", "Protocol Implementation"]
    },
    {
      year: "2017 - 2020",
      title: "IT Analyst",
      company: "Tata Consultancy Services (Humana Inc. Client)",
      description: "Application development and Database management. Designing jobs to automate processes like generating invoices, timesheet report etc. Writing perl modules for different projects as per the workflow given. Writing unit test case, sql query files and helper functions as required.",
      skills: ["Perl", "SQL", "Database Management", "Automation", "Unit Testing", "Shell Scripting"]
    },
    {
      year: "2015 - 2017",
      title: "Senior Member Tech",
      company: "Aptroid Technologies Pvt. Ltd. (Zeta Global)",
      description: "Automation tool designing, Log processing and Data analysis and management. Automating log processing. Automating the process of report generation, Sending mails of reports in real time. Report generation and analysing reports to increase the deliverability of campaigns.",
      skills: ["Automation", "Log Processing", "Data Analysis", "Report Generation", "Database Management"]
    },
    {
      year: "2014 - 2015",
      title: "Project Associate",
      company: "Zeta Global",
      description: "Email Marketing and Data analytics. Worked on Email marketing analysis, automation tool designing, research and development. Wrote various automation scripts for PMTA monitoring, Email suppressions, Email sending.",
      skills: ["Email Marketing", "Data Analytics", "Automation", "PMTA", "Zeta Mail"]
    }
  ],
  projects: [
    {
      title: "Application Management & Automation",
      description: "Leading application management and project automation for Deutsche Bank client. Integrating monitoring tools and automating alerts and reports.",
      tech: ["Perl", "Shell Scripting", "Netcool", "Newrelic", "ServiceNow", "Geneos"],
      category: "Automation",
      featured: true
    },
    {
      title: "Mastercard Protocol Implementation",
      description: "Implemented various protocols for Mastercard client. Developed perl modules and scripts with comprehensive unit testing.",
      tech: ["Perl", "Unit Testing", "Protocol Implementation", "Database Management"],
      category: "Development",
      featured: true
    },
    {
      title: "Process Automation & Reporting",
      description: "Designed automated jobs for invoice generation, timesheet reports, and database management. Developed comprehensive testing frameworks.",
      tech: ["Perl", "SQL", "Shell Scripting", "Automation", "Unit Testing"],
      category: "Automation",
      featured: false
    },
    {
      title: "Email Marketing Analytics Platform",
      description: "Developed automation tools for email marketing analysis, log processing, and campaign deliverability optimization.",
      tech: ["Automation", "Data Analytics", "Log Processing", "Email Marketing"],
      category: "Analytics",
      featured: false
    }
  ],
  skills: {
    frontend: ["Perl CGI", "React.js"],
    backend: ["Perl", "Shell Scripting", "Python", "MySQL", "Oracle"],
    ai_ml: ["Fundamentals of AI & ML", "LangChain", "OpenAI API", "Cursor", "Prompt Engineering"],
    tools: ["SVN", "Git", "Jira", "Rally", "ALM", "Postman", "Jenkins", "TeamCity", "New Relic", "Nimsoft", "NRI", "IBM Tivoli (Netcool)", "Geneos", "OpenTelemetry"],
    certifications: ["New Relic", "Splunk", "Fundamentals of AI & ML", "GCP (Digital Cloud Leader)"]
  },
  hobbies: [
    "🤖 AI & Machine Learning",
    "💻 Programming & Automation",
    "📊 Data Analysis",
    "🔧 DevOps & Tools",
    "📚 Continuous Learning",
    "🎯 Problem Solving"
  ]
};

export const FixedChatBot: React.FC<FixedChatBotProps> = ({ className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Add welcome message when component mounts but don't auto-expand
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "Hi! I'm Saswat's AI assistant. I can help you learn about his experience, projects, skills, and more. What would you like to know?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      
      // Don't auto-expand the chat on page load
      setIsExpanded(false);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Function to generate AI response based on user input and website data
  const generateAIResponse = async (userInput: string): Promise<string> => {
    const input = userInput.toLowerCase();
    
    // Check if the question is about website content
    const isAboutWebsite = 
      input.includes('saswat') || 
      input.includes('experience') || 
      input.includes('project') || 
      input.includes('skill') || 
      input.includes('education') || 
      input.includes('contact') || 
      input.includes('linkedin') || 
      input.includes('github') || 
      input.includes('email') ||
      input.includes('hobby') ||
      input.includes('about') ||
      input.includes('work') ||
      input.includes('job') ||
      input.includes('technology') ||
      input.includes('tech stack') ||
      input.includes('hello') ||
      input.includes('hi') ||
      input.includes('hey');

    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! 👋 I'm Saswat's AI assistant. I can help you learn about his experience, projects, skills, and more. What would you like to know?";
    }

    if (!isAboutWebsite) {
      return "I can only provide information about Saswat's portfolio, experience, projects, skills, and contact details. For questions outside this scope, please contact Saswat directly through the contact page.";
    }

    // Generate contextual responses based on the question
    if (input.includes('currently working') || input.includes('current job') || input.includes('where working now') || input.includes('present job')) {
      const currentJob = websiteData.experience[0]; // First entry is current job
      return `Saswat is currently working as ${currentJob.title} at ${currentJob.company} since ${currentJob.year}. He is leading application management and project automation for the Deutsche Bank client, integrating monitoring tools and automating alerts and reports.`;
    }

    if (input.includes('total experience') || input.includes('years of experience') || input.includes('how many years')) {
      return `Saswat has 11 years of professional experience in application development, automation, and database management.`;
    }

    if (input.includes('experience') || input.includes('work history') || input.includes('all jobs')) {
      const exp = websiteData.experience;
      return `Saswat has 11 years of professional experience:\n\n${exp.map(e => 
        `• ${e.year}: ${e.title} at ${e.company}\n  ${e.description}`
      ).join('\n\n')}`;
    }

    if (input.includes('project')) {
      const projects = websiteData.projects;
      return `Saswat has worked on several key projects:\n\n${projects.map(p => 
        `• ${p.title} (${p.category})\n  ${p.description}\n  Technologies: ${p.tech.join(', ')}`
      ).join('\n\n')}`;
    }

    if (input.includes('skill') || input.includes('technology') || input.includes('tech')) {
      const skills = websiteData.skills;
      return `Saswat's technical skills include:\n\nProgramming Languages: ${skills.frontend.join(', ')}\nDatabases & Tools: ${skills.backend.join(', ')}\nAI/ML: ${skills.ai_ml.join(', ')}\nMonitoring & DevOps: ${skills.tools.join(', ')}\n\nCertifications: ${skills.certifications.join(', ')}`;
    }

    if (input.includes('contact') || input.includes('email') || input.includes('linkedin') || input.includes('github')) {
      const contact = websiteData.personal;
      return `You can reach Saswat through:\n\n• Email: ${contact.email}\n• LinkedIn: ${contact.linkedin}\n• GitHub: ${contact.github}\n• Portfolio: ${contact.portfolio}`;
    }

    if (input.includes('hobby') || input.includes('interest')) {
      return `Saswat's hobbies and interests include:\n\n${websiteData.hobbies.join('\n')}`;
    }

    if (input.includes('about') || input.includes('who')) {
      return `Saswat Patro is a Senior Tech Lead with 11 years of experience in application development, automation, and database management. He specializes in Perl programming, shell scripting, automation tools, and has recently expanded into AI/ML technologies. He has worked with major clients like Deutsche Bank, Mastercard, Humana Inc., and Zeta Global. He's passionate about automation, problem-solving, and continuous learning in technology.`;
    }

    // Default response for general questions about the website
    return "I can help you learn about Saswat's experience, projects, skills, education, contact information, and hobbies. What specific information are you looking for?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Ensure chat stays expanded
    setIsExpanded(true);

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse = await generateAIResponse(inputValue);
      
      // Replace loading message with actual response
      setMessages(prev => prev.map(msg => 
        msg.isLoading ? {
          id: msg.id,
          text: aiResponse,
          isUser: false,
          timestamp: new Date()
        } : msg
      ));
      
      // Focus the input field after response is received
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } catch (error) {
      // Replace loading message with error
      setMessages(prev => prev.map(msg => 
        msg.isLoading ? {
          id: msg.id,
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          isUser: false,
          timestamp: new Date()
        } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleClose = () => {
    // Instead of completely closing, just minimize
    setIsExpanded(false);
  };

  return (
    <div className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 z-60 ${className}`}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-pink-500">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">AI</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Chat with Saswat AI</h3>
                  <p className="text-xs text-purple-100">Your Personal AI Assistant</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:text-purple-200 transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 h-64">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                        message.isUser
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.isLoading ? (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                        </div>
                      ) : (
                        <p className="whitespace-pre-line">{message.text}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Saswat"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Input Button - Always visible */}
      <motion.div
        className="relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.button
          onClick={handleInputClick}
          className="chat-trigger-button w-full bg-white hover:bg-gray-50 border border-gray-300 rounded-full px-5 py-3 text-gray-700 text-sm transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-between min-w-[220px]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-medium">{isExpanded ? 'Chat open' : 'Chat with Saswat AI'}</span>
          <motion.div
            className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center ml-2"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white text-sm">{isExpanded ? '✕' : '↗'}</span>
          </motion.div>
        </motion.button>
        
        {/* Notification dot */}
        {!isExpanded && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white">•</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
