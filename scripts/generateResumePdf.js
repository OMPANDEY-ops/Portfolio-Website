const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generatePDF() {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 36,
  });

  const outputPath = path.join(__dirname, '..', 'public', 'Om_Pandey_Resume.pdf');
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const primaryColor = '#111111';
  const secondaryColor = '#D7263D';
  const textColor = '#333333';

  // HEADER
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(22)
    .text('OM PANDEY', { align: 'center' });

  doc
    .fillColor(secondaryColor)
    .font('Helvetica-Bold')
    .fontSize(11)
    .text('Aspiring AI / GenAI Engineer | Raipur, India', { align: 'center' });

  doc
    .fillColor('#555555')
    .font('Helvetica')
    .fontSize(9.5)
    .text('+91 7646964673 | ompandey1811@gmail.com | github.com/OMPANDEY-ops | linkedin.com/in/om-pandey-789756387', {
      align: 'center',
    });

  doc.moveDown(0.5);
  doc.strokeColor('#CCCCCC').lineWidth(0.8).moveTo(36, doc.y).lineTo(559, doc.y).stroke();
  doc.moveDown(0.5);

  function sectionHeader(title) {
    doc.moveDown(0.3);
    doc
      .fillColor(primaryColor)
      .font('Helvetica-Bold')
      .fontSize(11)
      .text(title.toUpperCase());
    doc.strokeColor('#D7263D').lineWidth(1.5).moveTo(36, doc.y + 2).lineTo(559, doc.y + 2).stroke();
    doc.moveDown(0.4);
  }

  // SUMMARY
  sectionHeader('Summary');
  doc
    .fillColor(textColor)
    .font('Helvetica')
    .fontSize(9)
    .text(
      'Computer Science (Cybersecurity) undergraduate with hands-on experience building full-stack web applications (Next.js, React, Node.js) and applied NLP projects using Python and transformer-based models. Comfortable across the stack from UI to backend APIs, with a working foundation in machine learning fundamentals and a strong interest in moving into GenAI / LLM application engineering. Currently building toward production experience with LLM APIs, retrieval-based systems, and agentic workflows.',
      { align: 'justify', lineGap: 1.5 }
    );

  // CORE SKILLS
  sectionHeader('Core Skills');
  const skills = [
    ['Languages:', 'Python, Java, JavaScript, C, C++'],
    ['AI / ML:', 'PyTorch, NLP (BERT/Transformer models), Reinforcement Learning fundamentals'],
    ['Web & Backend:', 'Next.js, React.js, Node.js, REST APIs, Flask, Streamlit'],
    ['Cybersecurity:', 'Linux, Nmap, Burp Suite, VAPT, Solidity (basics)'],
    ['Tools & Platforms:', 'Git, GitHub, Docker, Figma, Tableau, Replit, Claude'],
    ['Coursework:', 'Data Structures & Algorithms, Cryptography and Cyber Defence, Artificial Intelligence'],
  ];

  skills.forEach(([label, val]) => {
    doc
      .fillColor(primaryColor)
      .font('Helvetica-Bold')
      .fontSize(9)
      .text(label + ' ', { continued: true })
      .fillColor(textColor)
      .font('Helvetica')
      .text(val, { lineGap: 1 });
  });

  // EDUCATION
  sectionHeader('Education');
  const edu = [
    {
      school: "Siksha 'O' Anusandhan Deemed to be University",
      dates: '2024 – 2028',
      degree: 'B.Tech, Computer Science Engineering (Cybersecurity) | CGPA 7.89',
      location: 'Bhubaneswar, India',
    },
    {
      school: 'Kendriya Vidyalaya B.M.Y, Bhilai',
      dates: '2023 – 2024',
      degree: 'CBSE Class XII | 78.2%',
      location: 'Bhilai, India',
    },
    {
      school: 'Kendriya Vidyalaya B.M.Y, Bhilai',
      dates: '2021 – 2022',
      degree: 'CBSE Class X | 86%',
      location: 'Bhilai, India',
    },
  ];

  edu.forEach((e) => {
    const y = doc.y;
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9.5).text(e.school, 36, y);
    doc.fillColor('#666666').font('Helvetica').fontSize(9).text(e.dates, 36, y, { align: 'right' });
    
    const y2 = doc.y;
    doc.fillColor(textColor).font('Helvetica-Oblique').fontSize(8.5).text(e.degree, 36, y2);
    doc.fillColor('#666666').font('Helvetica').fontSize(8.5).text(e.location, 36, y2, { align: 'right' });
    doc.moveDown(0.3);
  });

  // PROJECTS
  sectionHeader('Projects');

  const projects = [
    {
      name: 'CyberVerse 2.0 — AI-Native Cybersecurity Operations Dashboard',
      link: 'github.com/OMPANDEY-ops/Cyberverse',
      stack: 'React 18, TypeScript, Vite, Tailwind CSS, WebGL/Canvas 3D, Python FastAPI, WebSockets, JWT, Docker, GitHub Actions',
      bullets: [
        'Built full-stack security-operations web app with interactive 3D "digital twin" visualization of enterprise infrastructure nodes and real-time packet-flow overlays.',
        'Designed multi-tab investigation workspace and evidence-upload pipeline parsing EVTX, PCAP, JSON, LOG, CSV files with SHA-256 hashing.',
        'Implemented Python FastAPI backend with OpenAPI docs, JWT-based authentication, and WebSocket telemetry channel (/ws/telemetry).',
        'Added minimalist chat-style assistant panel ("Sentinel") as interface layer for future AI-assisted triage; containerized with Docker CI/CD.',
      ],
    },
    {
      name: 'AI-Summarizer',
      link: 'github.com/OMPANDEY-ops/AI-Summarizer',
      stack: 'Python, Streamlit, Hugging Face Transformers (DistilBART), PyPDF2, python-docx',
      bullets: [
        'Built Streamlit app that summarizes pasted notes or uploaded PDF/Word documents using transformer-based DistilBART model.',
        'Added document text extraction (PyPDF2 for PDFs, python-docx for Word files) and post-processed model output into structured summaries.',
      ],
    },
    {
      name: 'Next.js AI Chatbot (Vercel Chat SDK template)',
      link: 'github.com/OMPANDEY-ops/nextjs-ai-chatbot',
      stack: 'Next.js App Router, Vercel AI SDK, xAI/OpenAI model routing, Auth.js, Neon Postgres',
      bullets: [
        'Deployed and configured Vercel AI Chatbot starter (Chat SDK), wiring model provider routing through unified API, Auth.js, and Neon Postgres.',
        'Explored AI SDK tool-calling and generative-UI hooks for custom chat features.',
      ],
    },
    {
      name: 'Frontend Clone Suite — Spotify, Netflix & Instagram-style Apps (learning projects)',
      link: '',
      stack: 'Next.js, React, TypeScript, Tailwind CSS, Framer Motion',
      bullets: [
        'Built three UI-focused clone applications (music streaming, video-streaming landing page, and social feed) back-to-back to practice component architecture.',
        'Spotify Clone: full audio-player engine using HTML5 Audio API & Framer Motion. CineStream: Netflix-style landing page. InstaPulse: Instagram-style feed.',
      ],
    },
  ];

  projects.forEach((p) => {
    const y = doc.y;
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9.5).text(p.name, 36, y, { width: 380 });
    if (p.link) {
      doc.fillColor(secondaryColor).font('Helvetica').fontSize(8.5).text(p.link, 400, y, { align: 'right' });
    }
    doc.fillColor('#666666').font('Helvetica-Oblique').fontSize(8.5).text(p.stack, 36);
    p.bullets.forEach((b) => {
      doc.fillColor(textColor).font('Helvetica').fontSize(8.5).text('•  ' + b, 44, doc.y, { width: 505, lineGap: 1 });
    });
    doc.moveDown(0.25);
  });

  // CERTIFICATIONS & EXTRA-CURRICULARS
  sectionHeader('Certifications & Extra-Curriculars');
  const certs = [
    'IBM SkillsBuild — Getting Started with Artificial Intelligence (Mar 2026)',
    'Deloitte Job Simulations — Technology, Data Analytics & Cybersecurity (Forage, Jul 2025)',
    'NCC "A" Certificate — NCC GP HQ, Raipur (Jan 2021)',
    'Core Member, SOA Official CodingNinjas 10X on Campus — Mentored 500+ students in competitive programming.',
    'Media Head, SOA Literary Club — Public speaker, event management, and content writer.',
  ];

  certs.forEach((c) => {
    doc.fillColor(textColor).font('Helvetica').fontSize(8.5).text('•  ' + c, 44, doc.y, { width: 505, lineGap: 1.5 });
  });

  doc.end();

  stream.on('finish', () => {
    console.log('PDF successfully created at:', outputPath);
  });
}

generatePDF();
