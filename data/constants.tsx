import { BrainCircuit, Briefcase, ScrollText } from "lucide-react";
import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const testimonials = [
  {
    quote:
      "The AI-powered interview prep was a game-changer. Landed my dream job at a top tech company!",
    author: "Sarah Chen",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    role: "Software Engineer",
    company: "Tech Giant Co.",
  },
  {
    quote:
      "The industry insights helped me pivot my career successfully. The salary data was spot-on!",
    author: "Michael Rodriguez",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    role: "Product Manager",
    company: "StartUp Inc.",
  },
  {
    quote:
      "My resume's ATS score improved significantly. Got more interviews in two weeks than in six months!",
    author: "Priya Patel",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    role: "Marketing Director",
    company: "Global Corp",
  },
];

export const industries = [
  {
    id: "tech",
    name: "Technology",
    subIndustries: [
      "Software Development",
      "IT Services",
      "Cybersecurity",
      "Cloud Computing",
      "Artificial Intelligence/Machine Learning",
      "Data Science & Analytics",
      "Internet & Web Services",
      "Robotics",
      "Quantum Computing",
      "Blockchain & Cryptocurrency",
      "IoT (Internet of Things)",
      "Virtual/Augmented Reality",
      "Semiconductor & Electronics",
    ],
  },
  {
    id: "finance",
    name: "Financial Services",
    subIndustries: [
      "Banking",
      "Investment Banking",
      "Insurance",
      "FinTech",
      "Wealth Management",
      "Asset Management",
      "Real Estate Investment",
      "Private Equity",
      "Venture Capital",
      "Cryptocurrency & Digital Assets",
      "Risk Management",
      "Payment Processing",
      "Credit Services",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    subIndustries: [
      "Healthcare Services",
      "Biotechnology",
      "Pharmaceuticals",
      "Medical Devices",
      "Healthcare IT",
      "Telemedicine",
      "Mental Health Services",
      "Genomics",
      "Clinical Research",
      "Healthcare Analytics",
      "Elder Care Services",
      "Veterinary Services",
      "Alternative Medicine",
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Industrial",
    subIndustries: [
      "Automotive",
      "Aerospace & Defense",
      "Electronics Manufacturing",
      "Industrial Manufacturing",
      "Chemical Manufacturing",
      "Consumer Goods",
      "Food & Beverage Processing",
      "Textile Manufacturing",
      "Metal Fabrication",
      "3D Printing/Additive Manufacturing",
      "Machinery & Equipment",
      "Packaging",
      "Plastics & Rubber",
    ],
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    subIndustries: [
      "E-commerce Platforms",
      "Retail Technology",
      "Fashion & Apparel",
      "Consumer Electronics",
      "Grocery & Food Retail",
      "Luxury Goods",
      "Sports & Recreation",
      "Home & Garden",
      "Beauty & Personal Care",
      "Pet Products",
      "Specialty Retail",
      "Direct-to-Consumer (D2C)",
      "Department Stores",
    ],
  },
  {
    id: "media",
    name: "Media & Entertainment",
    subIndustries: [
      "Digital Media",
      "Gaming & Esports",
      "Streaming Services",
      "Social Media",
      "Digital Marketing",
      "Film & Television",
      "Music & Audio",
      "Publishing",
      "Advertising",
      "Sports Entertainment",
      "News & Journalism",
      "Animation",
      "Event Management",
    ],
  },
  {
    id: "education",
    name: "Education & Training",
    subIndustries: [
      "EdTech",
      "Higher Education",
      "Professional Training",
      "Online Learning",
      "K-12 Education",
      "Corporate Training",
      "Language Learning",
      "Special Education",
      "Early Childhood Education",
      "Career Development",
      "Educational Publishing",
      "Educational Consulting",
      "Vocational Training",
    ],
  },
  {
    id: "energy",
    name: "Energy & Utilities",
    subIndustries: [
      "Renewable Energy",
      "Clean Technology",
      "Oil & Gas",
      "Nuclear Energy",
      "Energy Management",
      "Utilities",
      "Smart Grid Technology",
      "Energy Storage",
      "Carbon Management",
      "Waste Management",
      "Water & Wastewater",
      "Mining",
      "Environmental Services",
    ],
  },
  {
    id: "consulting",
    name: "Professional Services",
    subIndustries: [
      "Management Consulting",
      "IT Consulting",
      "Strategy Consulting",
      "Digital Transformation",
      "Business Advisory",
      "Legal Services",
      "Accounting & Tax",
      "Human Resources",
      "Marketing Services",
      "Architecture",
      "Engineering Services",
      "Research & Development",
      "Business Process Outsourcing (BPO)",
    ],
  },
  {
    id: "telecom",
    name: "Telecommunications",
    subIndustries: [
      "Wireless Communications",
      "Network Infrastructure",
      "Telecom Services",
      "5G Technology",
      "Internet Service Providers",
      "Satellite Communications",
      "Data Centers",
      "Fiber Optics",
      "Mobile Technology",
      "VoIP Services",
      "Network Security",
      "Telecom Equipment",
      "Cloud Communications",
    ],
  },
  {
    id: "transportation",
    name: "Transportation & Logistics",
    subIndustries: [
      "Electric Vehicles",
      "Autonomous Vehicles",
      "Logistics & Supply Chain",
      "Aviation",
      "Railways",
      "Maritime Transport",
      "Urban Mobility",
      "Fleet Management",
      "Last-Mile Delivery",
      "Warehousing",
      "Freight & Cargo",
      "Public Transportation",
      "Space Transportation",
    ],
  },
  {
    id: "agriculture",
    name: "Agriculture & Food",
    subIndustries: [
      "AgTech",
      "Farming",
      "Food Production",
      "Sustainable Agriculture",
      "Precision Agriculture",
      "Aquaculture",
      "Vertical Farming",
      "Agricultural Biotechnology",
      "Food Processing",
      "Organic Farming",
      "Plant-Based Foods",
      "Agricultural Equipment",
      "Indoor Farming",
    ],
  },
  {
    id: "construction",
    name: "Construction & Real Estate",
    subIndustries: [
      "Commercial Construction",
      "Residential Construction",
      "Real Estate Development",
      "Property Management",
      "Construction Technology",
      "Building Materials",
      "Infrastructure Development",
      "Smart Buildings",
      "Interior Design",
      "Facilities Management",
      "Real Estate Technology",
      "Sustainable Building",
      "Urban Planning",
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality & Tourism",
    subIndustries: [
      "Hotels & Resorts",
      "Restaurants & Food Service",
      "Travel Technology",
      "Tourism",
      "Event Planning",
      "Vacation Rentals",
      "Cruise Lines",
      "Catering",
      "Theme Parks",
      "Travel Agencies",
      "Hospitality Management",
      "Online Travel Booking",
      "Cultural Tourism",
    ],
  },
  {
    id: "nonprofit",
    name: "Non-Profit & Social Services",
    subIndustries: [
      "Charitable Organizations",
      "Social Services",
      "Environmental Conservation",
      "Humanitarian Aid",
      "Education Non-Profits",
      "Healthcare Non-Profits",
      "Arts & Culture",
      "Community Development",
      "International Development",
      "Animal Welfare",
      "Youth Organizations",
      "Social Enterprise",
      "Advocacy Organizations",
    ],
  },
];

export const howItWorks = [
  {
    title: "Professional Onboarding",
    description: "Share your industry and expertise for personalized guidance",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Craft Your Documents",
    description: "Create ATS-optimized resumes and compelling cover letters",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Prepare for Interviews",
    description:
      "Practice with AI-powered mock interviews tailored to your role",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track Your Progress",
    description: "Monitor improvements with detailed performance analytics",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];

export const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-primary" />,
    title: "AI-Powered Career Guidance",
    description:
      "Get personalized career advice and insights powered by advanced AI technology.",
  },
  {
    icon: <Briefcase className="w-10 h-10 mb-4 text-primary" />,
    title: "Interview Preparation",
    description:
      "Practice with role-specific questions and get instant feedback to improve your performance.",
  },
  {
    icon: <LineChart className="w-10 h-10 mb-4 text-primary" />,
    title: "Industry Insights",
    description:
      "Stay ahead with real-time industry trends, salary data, and market analysis.",
  },
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-primary" />,
    title: "Smart Resume Creation",
    description: "Generate ATS-optimized resumes with AI assistance.",
  },
];

export const faqs = [
  {
    question: "What makes Sensai unique as a career development tool?",
    answer:
      "Sensai combines AI-powered career tools with industry-specific insights to help you advance your career. Our platform offers three main features: an intelligent resume builder, a cover letter generator, and an adaptive interview preparation system. Each tool is tailored to your industry and skills, providing personalized guidance for your professional journey.",
  },
  {
    question: "How does Sensai create tailored content?",
    answer:
      "Sensai learns about your industry, experience, and skills during onboarding. It then uses this information to generate customized resumes, cover letters, and interview questions. The content is specifically aligned with your professional background and industry standards, making it highly relevant and effective.",
  },
  {
    question: "How accurate and up-to-date are Sensai's industry insights?",
    answer:
      "We update our industry insights weekly using advanced AI analysis of current market trends. This includes salary data, in-demand skills, and industry growth patterns. Our system constantly evolves to ensure you have the most relevant information for your career decisions.",
  },
  {
    question: "Is my data secure with Sensai?",
    answer:
      "Absolutely. We prioritize the security of your professional information. All data is encrypted and securely stored using industry-standard practices. We use Clerk for authentication and never share your personal information with third parties.",
  },
  {
    question: "How can I track my interview preparation progress?",
    answer:
      "Sensai tracks your performance across multiple practice interviews, providing detailed analytics and improvement suggestions. You can view your progress over time, identify areas for improvement, and receive AI-generated tips to enhance your interview skills based on your responses.",
  },
  {
    question: "Can I edit the AI-generated content?",
    answer:
      "Yes! While Sensai generates high-quality initial content, you have full control to edit and customize all generated resumes, cover letters, and other content. Our markdown editor makes it easy to refine the content to perfectly match your needs.",
  },
];

export const stats = [
  {
    label: "50+",
    desc: "Industries Covered",
  },
  {
    label: "1000+",
    desc: "Interview Questions",
  },
  {
    label: "95%",
    desc: "Success Rate",
  },
  {
    label: "24/7",
    desc: "AI Support",
  },
];
