import type { PortfolioData, SpeechLine } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  name: 'Om Pandey',
  title: 'Aspiring AI / GenAI Engineer',
  location: 'India',
  contact: {
    email: 'ompandey1811@gmail.com',
    phone: '+91 7646964673',
    github: 'https://github.com/OMPANDEY-ops',
    linkedin: 'https://www.linkedin.com/in/om-pandey-789756387',
  },
  education: [
    {
      school: "Siksha 'O' Anusandhan Deemed to be University",
      degree: 'B.Tech, Computer Science Engineering (Cybersecurity)',
      dates: '2024 – 2028',
      detail: 'CGPA 7.89',
      location: 'Bhubaneswar, India',
    },
    {
      school: 'Kendriya Vidyalaya B.M.Y, Bhilai',
      degree: 'CBSE Class XII',
      dates: '2023 – 2024',
      detail: '78.2%',
    },
    {
      school: 'Kendriya Vidyalaya B.M.Y, Bhilai',
      degree: 'CBSE Class X',
      dates: '2021 – 2022',
      detail: '86%',
    },
  ],
  techStack: {
    Languages: ['Python', 'Java', 'JavaScript', 'C', 'C++'],
    'AI / ML': ['PyTorch', 'NLP (BERT/Transformer models)', 'Reinforcement Learning fundamentals'],
    'Web & Backend': ['Next.js', 'React.js', 'Node.js', 'REST APIs', 'Flask', 'Streamlit'],
    Cybersecurity: ['Linux', 'Nmap', 'Burp Suite', 'VAPT', 'Solidity (basics)'],
    'Tools & Platforms': ['Git', 'GitHub', 'Docker', 'Figma', 'Tableau', 'Replit', 'Claude'],
  },
  projects: [
    {
      name: 'CyberVerse 2.0 — AI-Native Cybersecurity Operations Dashboard',
      github: 'https://github.com/OMPANDEY-ops/Cyberverse',
      stack: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'WebGL/Canvas 3D', 'Python FastAPI', 'WebSockets', 'JWT', 'Docker', 'GitHub Actions'],
      description: "A full-stack security-operations dashboard with an interactive 3D 'digital twin' of enterprise infrastructure, a multi-tab investigation workspace, an evidence-upload pipeline (EVTX/PCAP/JSON/LOG/CSV with SHA-256 hashing), and a FastAPI backend with JWT auth and live WebSocket telemetry. Includes a UI-layer AI assistant panel; containerized with Docker and CI/CD via GitHub Actions.",
    },
    {
      name: 'AI-Summarizer',
      github: 'https://github.com/OMPANDEY-ops/AI-Summarizer',
      stack: ['Python', 'Streamlit', 'Hugging Face Transformers (DistilBART)', 'PyPDF2', 'python-docx'],
      description: 'A Streamlit app that summarizes pasted notes or uploaded PDF/Word documents using a transformer-based summarization model (DistilBART), with PDF/DOCX text extraction and bullet-point summary output.',
    },
    {
      name: 'Next.js AI Chatbot (Vercel Chat SDK template)',
      github: 'https://github.com/OMPANDEY-ops/nextjs-ai-chatbot',
      stack: ['Next.js App Router', 'Vercel AI SDK', 'xAI/OpenAI model routing', 'Auth.js', 'Neon Postgres'],
      description: "Deployed and configured the Vercel AI Chatbot starter (Chat SDK) — wired up model-provider routing through the AI SDK's unified API, Auth.js authentication, and Neon Postgres for chat history persistence. Explored the AI SDK's tool-calling and generative-UI hooks.",
    },
    {
      name: 'Frontend Clone Suite (learning projects)',
      github: null,
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      description: 'A trio of frontend clone projects built as exercises in component architecture, animation, and responsive design.',
      note: 'Built back-to-back as practice in component architecture, animation, and responsive design. All three use local/mock data, not production backends.',
      projects: [
        {
          name: 'Spotify Clone',
          github: 'https://github.com/OMPANDEY-ops/Spotify-Clone',
          description: 'Music-streaming UI clone with a full audio-player engine (play/pause/shuffle/repeat, seek, volume, lyrics modal, queue drawer) using the HTML5 Audio API and Framer Motion.',
        },
        {
          name: 'CineStream',
          github: 'https://github.com/OMPANDEY-ops/Cinestream',
          description: 'Netflix-style landing page with hero banner, horizontal carousels, a details modal, and live client-side search/filtering.',
        },
        {
          name: 'InstaPulse',
          github: 'https://github.com/OMPANDEY-ops/Instapulse',
          description: 'Instagram-style feed with stories, a reels-style scroll-snapped video feed, a direct-messages UI, and post/profile modals.',
        },
      ],
    },
    {
      name: 'ZEK — Post-Quantum Hardware Security Vault & TRNG',
      github: null,
      stack: ['Hardware security', 'Cryptography', 'Entropy-based TRNG'],
      description: 'Contributed as cybersecurity lead on a hardware vault and true random number generator leveraging Zener diode avalanche breakdown for hardware-based entropy.',
    },
  ],
  certifications: [
    { name: 'IBM SkillsBuild — Getting Started with Artificial Intelligence', date: 'Mar 2026' },
    { name: 'Deloitte Job Simulation — Technology (Forage)', date: 'Jul 2025' },
    { name: 'Deloitte Job Simulation — Data Analytics (Forage)', date: 'Jul 2025' },
    { name: 'Deloitte Job Simulation — Cybersecurity (Forage)', date: 'Jul 2025' },
    { name: "NCC 'A' Certificate — NCC GP HQ, Raipur", date: 'Jan 2021' },
  ],
  extracurriculars: [
    {
      role: 'Core Member, SOA Official CodingNinjas 10X on Campus',
      dates: 'Feb 2026 – Present',
      description: 'Mentored 500+ students in competitive programming and development, and collaborated with fellow club members on multiple projects.',
    },
    {
      role: 'Media Head, SOA Literary Club',
      dates: 'Jun 2025 – Present',
      description: 'Public speaker, creative and content writer, and literature enthusiast. Core skills: public speaking, event management, public relations, and creative and content writing.',
    },
  ],
};

export const avatarSpeechLines: SpeechLine[] = [
  {
    id: 'home',
    section: 'home',
    text: "Hey, I'm Om — a computer science student building my way into AI engineering, one full-stack project and one late night at a time. Scroll down and I'll walk you through what I've built.",
  },
  {
    id: 'tech-stack',
    section: 'tech-stack',
    text: "Here's what I actually work with day to day — full-stack web with Next.js and React, Python for AI and NLP work, and Linux/security tooling from my cybersecurity coursework.",
  },
  {
    id: 'literature',
    section: 'literature',
    text: "Outside of code, I'm Media Head for my college's Literary Club — public speaking, event management, and content writing. I also mentor 500+ students in competitive programming through our coding club.",
  },
  {
    id: 'contact',
    section: 'contact',
    text: "That's me — if any of this lines up with what you're building, let's talk.",
  },
];
