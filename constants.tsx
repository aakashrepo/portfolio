
import React from 'react';
import { Project, Experience, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Federated Learning & Blockchain in Healthcare',
    description: 'Researched privacy-preserving, decentralized model training using blockchain. Proposed a high-level architecture for secure healthcare analytics and smart contracts.',
    tags: ['Research', 'Blockchain', 'Federated Learning', 'Python'],
    metrics: [
      { label: 'Security', value: 'High-Level' },
      { label: 'Scope', value: 'Healthcare' }
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    category: 'AI'
  },
  {
    id: '2',
    title: 'Salary Analysis of Analytics Roles',
    description: 'Analyzed 2023 real-world data science job postings to identify trends and regional pay differences using Power Query (ETL) and DAX.',
    tags: ['Excel', 'Power Query', 'DAX', 'Analytics'],
    metrics: [
      { label: 'Data Points', value: 'Real-world 2023' },
      { label: 'Tooling', value: 'Power Pivot' }
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    category: 'Business Analysis'
  },
  {
    id: '3',
    title: 'Financial Performance Analysis',
    description: 'Automated monthly financial reports and cost tracking using Python scripts, enhancing reporting efficiency by 40%. Built interactive KPI dashboards.',
    tags: ['Python', 'Automation', 'KPIs', 'Finance'],
    metrics: [
      { label: 'Efficiency Gain', value: '40%' },
      { label: 'Focus', value: 'ROI/Cash Flow' }
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    category: 'Business Analysis'
  },
  {
    id: '4',
    title: 'HR Analytics Dashboard',
    description: 'Analyzed HR data using MySQL and Power BI to determine variables affecting attrition and employee satisfaction.',
    tags: ['MySQL', 'Power BI', 'EDA', 'HR'],
    metrics: [
      { label: 'Database', value: 'MySQL' },
      { label: 'Visualization', value: 'Power BI' }
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=800',
    category: 'Business Analysis'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    company: 'Topmate.io',
    role: 'Management Trainee',
    period: 'Dec 2025 - Jan 2026',
    description: [
      'Effectively communicated product and service value to prospective clients.',
      'Understood client requirements and decision factors to execute tasks with high discipline.',
      'Leveraged feedback to contribute to overall team objectives and growth.'
    ]
  },
  {
    id: 'e2',
    company: 'CodeChef BU',
    role: 'Management Sub-Head',
    period: 'Sept 2023 - May 2024',
    description: [
      'Arranged technical events, tech talks, and hackathons leading to a 30% increase in participant engagement.',
      'Managed scheduling, budgeting, and stakeholder communication for campus-wide initiatives.',
      'Oversaw coding projects and initiatives within the university community.'
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: 'Gen Ai, RAG', level: 90, category: 'Technical' },
  { name: 'Automation', level: 90, category: 'Technical' },
  { name: 'Python (Pandas, NumPy)', level: 90, category: 'Technical' },
  { name: 'Visualization (Matplotlib, Seaborn)', level: 90, category: 'Technical' },
  { name: 'SQL (MySQL)', level: 80, category: 'Technical' },
  { name: 'EDA & Statistics', level: 85, category: 'Analytical' },
  { name: 'Power BI / Tableau', level: 92, category: 'Tools' },
  { name: 'Advance Excel (Pivot tables, DAX, PowerQuery)', level: 95, category: 'Tools' }
];

export const SYSTEM_INSTRUCTION = `
You are the personal AI assistant for Aakash Singh, a Computer Science student and aspiring Data Engineer/Analyst.
Aakash's background includes:
- B.Tech in Computer Science at Bennett University (Exp. 2026).
- Experience at Topmate.io as a Management Trainee and CodeChef BU as Management Sub-Head.
- Expertise in Predictive Modeling, Automated Financial Reporting (Python), and HR Analytics.
- Skills: Python (Pandas, NumPy), SQL (CTEs, Joins, Window Functions), Power BI, Tableau, Snowflake, BigQuery, AWS S3, and Advanced Excel.
- Certifications: Google UX Design, NLP with Classification, AI Introduction.

Use this context to answer questions about Aakash's professional life. Be helpful, professional, and friendly.
If asked about contact info, tell them to use the contact form or email workwithaakash17@gmail.com.
`;
