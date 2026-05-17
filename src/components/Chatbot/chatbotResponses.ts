export interface ChatResponse {
  message: string;
  followUp?: string[];
  links?: { text: string; url: string }[];
}

export const chatbotResponses: Record<string, ChatResponse> = {
  greeting: {
    message: "👋 Hi! I'm Niri, your AI assistant from Nirikshan AI.\nHow can I help you today?\nYou can ask me about our company, services, projects, or how to contact us.",
    followUp: ["🧠 Our Expertise", "🚀 Projects", "👥 About Nirikshan AI", "📞 Contact Us"]
  },
  
  "🧠 Our Expertise": {
    message: "At Nirikshan AI, our expertise spans across multiple domains:\n\n• Generative AI – Custom AI models for text, image, and workflow generation.\n\n• Machine Learning – Predictive analytics, pattern recognition, and automation.\n\n• AI Consulting – Strategy, deployment, and optimization for businesses.\n\n• Computer Vision – Image-based analysis and intelligent monitoring systems.",
    followUp: ["📚 See project examples", "🤝 Book a consultation"],
    links: [{ text: "Visit our Expertise page", url: "/expertise" }]
  },
  
  "🚀 Projects": {
    message: "We've delivered impactful AI solutions for both national and international clients.\nSome highlights include:\n\n• Hackathon Evaluation System: Real-time scoring platform for multi-judge events.\n\n• Pariksha Protector: AI-based exam monitoring with 95% cheating detection accuracy.",
    followUp: ["🔗 View live demos", "🧠 Learn more about our technology"],
    links: [{ text: "View All Projects", url: "/projects" }]
  },
  
  "👥 About Nirikshan AI": {
    message: "Nirikshan AI Private Limited is an Indian technology company focused on developing AI-driven solutions for real-world challenges.\n\nWe specialize in Generative AI, Machine Learning, AI Consulting, and Automation — helping businesses innovate, optimize, and grow with the power of artificial intelligence.",
    followUp: ["🔍 Learn about our journey", "💡 Explore our mission and values", "👨‍💼 Meet our leadership team"],
    links: [{ text: "Learn More About Us", url: "/who-we-are" }]
  },
  
  "🔍 Learn about our journey": {
    message: "Our journey began in 2024 with a community called Sochilhive, focused on hackathons and teaching events.\n\nLater that year, we evolved into Nirikshan AI, and by 2025, became Nirikshan AI Private Limited, registered under MSME.\n\nToday, we collaborate with national and international clients, building AI solutions that make a difference.",
    followUp: ["🏆 Explore milestones", "💼 Meet the team"],
    links: [{ text: "Read Our Full Journey", url: "/journey" }]
  },
  
  "💡 Explore our mission and values": {
    message: "Our mission is to make cutting-edge AI technology accessible and practical for everyone.\n\nWe believe in:\n• Simple & Accessible solutions\n• Affordable AI for all businesses\n• Real Results that matter\n• Local Partnership and support\n\nWe're here to bring the power of AI to everyone, not just the big players.",
    followUp: ["👥 About Nirikshan AI", "🧠 Our Expertise"],
    links: [{ text: "Learn More", url: "/who-we-are" }]
  },
  
  "👨‍💼 Meet our leadership team": {
    message: "Our team consists of passionate AI experts, engineers, and innovators dedicated to solving real-world problems.\n\nWe combine technical excellence with practical business understanding to deliver solutions that truly make a difference.",
    followUp: ["💼 Career Opportunities", "👥 About Nirikshan AI"],
    links: [{ text: "Meet Our Team", url: "/who-we-are" }]
  },
  
  "🏆 Explore milestones": {
    message: "Key milestones in our journey:\n\n2024: Started as Sochilhive community\n2024: Evolved into Nirikshan AI\n2025: Incorporated as Nirikshan AI Private Limited\n\nFrom community events to enterprise AI solutions, we've grown while staying true to our mission.",
    followUp: ["🔍 Learn about our journey", "👥 About Nirikshan AI"],
    links: [{ text: "View Our Journey", url: "/journey" }]
  },
  
  "💼 Meet the team": {
    message: "Our diverse team brings together expertise in AI, machine learning, software engineering, and business strategy.\n\nWe're passionate about using technology to solve real-world problems.",
    followUp: ["👨‍💼 Meet our leadership team", "💼 Career Opportunities"],
    links: [{ text: "See Team Profiles", url: "/who-we-are" }]
  },
  
  "📞 Contact Us": {
    message: "You can reach our team at admin@nirikshanai.com or through the Contact Us form on our website.\n\nWe're available Monday to Saturday, 10 AM – 6 PM (IST).\n\nFor partnership or business inquiries, please include your organization name and project brief — our team will respond within 24 hours.",
    followUp: ["📧 Visit Contact Page", "💼 Career Opportunities"],
    links: [{ text: "Contact Us Now", url: "/contact" }]
  },
  
  "📧 Visit Contact Page": {
    message: "You can fill out our contact form or reach us directly:\n\n📧 Email: admin@nirikshanai.com\n🕐 Hours: Monday-Saturday, 10 AM – 6 PM (IST)\n\nWe look forward to hearing from you!",
    followUp: ["🧠 Our Expertise", "🚀 Projects"],
    links: [{ text: "Go to Contact Page", url: "/contact" }]
  },
  
  "💼 Career Opportunities": {
    message: "We're always looking for passionate innovators to join our growing AI team!\n\nExplore open roles and internships in AI development, data science, and product design.\n\n👉 Visit our Career section or email admin@nirikshanai.com with your CV and portfolio.",
    followUp: ["📧 Visit Careers Page", "🧠 Our Expertise"],
    links: [{ text: "View Open Positions", url: "/careers" }]
  },
  
  "📧 Visit Careers Page": {
    message: "Check out our current openings and apply today!\n\nSend your CV and portfolio to admin@nirikshanai.com\n\nWe're looking for talented individuals in:\n• AI Development\n• Data Science\n• Product Design\n• Software Engineering",
    followUp: ["👥 About Nirikshan AI", "💼 Meet the team"],
    links: [{ text: "View Careers", url: "/careers" }]
  },
  
  "📚 See project examples": {
    message: "Check out our portfolio of AI solutions including:\n\n• Hackathon Evaluation System\n• Pariksha Protector (AI Exam Monitoring)\n• Custom ML Models\n• Computer Vision Applications\n\nEach project showcases our commitment to practical, impactful AI solutions.",
    followUp: ["🔗 View live demos", "🧠 Our Expertise"],
    links: [{ text: "View All Projects", url: "/projects" }]
  },
  
  "🤝 Book a consultation": {
    message: "Ready to discuss your AI project? Let's talk!\n\nReach out to us at admin@nirikshanai.com or fill out our contact form. We'll get back to you within 24 hours to schedule a consultation.\n\nWe offer free initial consultations to understand your needs.",
    followUp: ["📞 Contact Us"],
    links: [{ text: "Contact Us Now", url: "/contact" }]
  },
  
  "🔗 View live demos": {
    message: "Our live project demonstrations showcase real-world AI applications:\n\n• Interactive dashboards\n• AI-powered monitoring systems\n• Automated evaluation platforms\n\nContact us to see specific demos or discuss your project requirements.",
    followUp: ["🤝 Book a consultation", "📞 Contact Us"],
    links: [{ text: "View Projects", url: "/projects" }]
  },
  
  "🧠 Learn more about our technology": {
    message: "Our technology stack includes:\n\n• Advanced Machine Learning frameworks\n• Computer Vision (OpenCV)\n• Generative AI models\n• Cloud infrastructure\n• Real-time processing systems\n\nWe stay at the forefront of AI innovation while ensuring practical, scalable solutions.",
    followUp: ["🧠 Our Expertise", "🤝 Book a consultation"],
    links: [{ text: "Explore Our Expertise", url: "/expertise" }]
  },
  
  fallback: {
    message: "I didn't quite get that 🤔 — you can ask about:\n\n• Our company or mission\n• AI services we offer\n• Our projects and case studies\n• How to get in touch\n\nFeel free to ask me anything about Nirikshan AI!",
    followUp: ["🧠 Our Expertise", "🚀 Projects", "👥 About Nirikshan AI", "📞 Contact Us"]
  }
};

export const getResponse = (userMessage: string): ChatResponse => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for direct matches first
  if (chatbotResponses[userMessage]) {
    return chatbotResponses[userMessage];
  }
  
  // Keyword matching for natural language
  if (lowerMessage.includes('expertise') || lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('capabilities')) {
    return chatbotResponses["🧠 Our Expertise"];
  }
  
  if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio') || lowerMessage.includes('case study')) {
    return chatbotResponses["🚀 Projects"];
  }
  
  if (lowerMessage.includes('about') || lowerMessage.includes('company') || lowerMessage.includes('who are you') || lowerMessage.includes('what is nirikshan')) {
    return chatbotResponses["👥 About Nirikshan AI"];
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('get in touch')) {
    return chatbotResponses["📞 Contact Us"];
  }
  
  if (lowerMessage.includes('journey') || lowerMessage.includes('story') || lowerMessage.includes('history') || lowerMessage.includes('background')) {
    return chatbotResponses["🔍 Learn about our journey"];
  }
  
  if (lowerMessage.includes('mission') || lowerMessage.includes('values') || lowerMessage.includes('believe') || lowerMessage.includes('vision')) {
    return chatbotResponses["💡 Explore our mission and values"];
  }
  
  if (lowerMessage.includes('team') || lowerMessage.includes('people') || lowerMessage.includes('leadership') || lowerMessage.includes('founder')) {
    return chatbotResponses["👨‍💼 Meet our leadership team"];
  }
  
  if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('hiring') || lowerMessage.includes('opportunity') || lowerMessage.includes('work with')) {
    return chatbotResponses["💼 Career Opportunities"];
  }
  
  if (lowerMessage.includes('demo') || lowerMessage.includes('live') || lowerMessage.includes('show me')) {
    return chatbotResponses["🔗 View live demos"];
  }
  
  if (lowerMessage.includes('consult') || lowerMessage.includes('discuss') || lowerMessage.includes('meeting') || lowerMessage.includes('talk')) {
    return chatbotResponses["🤝 Book a consultation"];
  }
  
  if (lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('how do you build')) {
    return chatbotResponses["🧠 Learn more about our technology"];
  }
  
  if (lowerMessage.includes('generative ai') || lowerMessage.includes('gpt') || lowerMessage.includes('llm')) {
    return {
      message: "Generative AI is one of our core specialties! We develop custom AI models for:\n\n• Text generation and conversational agents\n• Content creation and automation\n• Image and video generation\n• Workflow optimization\n\nWant to learn more about our AI capabilities?",
      followUp: ["🧠 Our Expertise", "🤝 Book a consultation"],
      links: [{ text: "Explore Generative AI Services", url: "/expertise/artificial-intelligence/generative-ai" }]
    };
  }
  
  if (lowerMessage.includes('computer vision') || lowerMessage.includes('opencv') || lowerMessage.includes('image recognition')) {
    return {
      message: "Computer Vision is at the heart of what we do! Our expertise includes:\n\n• Object detection and tracking\n• Image analysis and classification\n• Real-time video processing\n• Quality inspection systems\n\nWe use OpenCV and advanced ML models to solve complex visual challenges.",
      followUp: ["🧠 Our Expertise", "📚 See project examples"],
      links: [{ text: "Learn About Computer Vision", url: "/expertise/artificial-intelligence/computer-vision" }]
    };
  }
  
  if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml') || lowerMessage.includes('predictive')) {
    return {
      message: "Our Machine Learning solutions help businesses make data-driven decisions:\n\n• Predictive analytics\n• Pattern recognition\n• Anomaly detection\n• Recommendation systems\n\nWe build custom ML models tailored to your specific needs.",
      followUp: ["🧠 Our Expertise", "🤝 Book a consultation"],
      links: [{ text: "Explore ML Services", url: "/expertise/artificial-intelligence/machine-learning" }]
    };
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing') || lowerMessage.includes('how much')) {
    return {
      message: "Our pricing varies based on project scope, complexity, and requirements. We offer competitive rates and flexible engagement models.\n\nFor a detailed quote, please contact us with your project details. We'll provide a customized proposal within 24 hours.",
      followUp: ["📞 Contact Us", "🤝 Book a consultation"]
    };
  }
  
  if (lowerMessage.includes('location') || lowerMessage.includes('where are you') || lowerMessage.includes('office')) {
    return {
      message: "Nirikshan AI Private Limited is based in India and registered under MSME.\n\nWe work with clients both nationally and internationally, offering remote collaboration and on-site support as needed.",
      followUp: ["📞 Contact Us", "👥 About Nirikshan AI"]
    };
  }
  
  return chatbotResponses.fallback;
};
