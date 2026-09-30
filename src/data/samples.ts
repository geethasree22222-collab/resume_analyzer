export interface SampleCandidate {
  id: string;
  name: string;
  email: string;
  targetRole: string;
  resumeFileName: string;
  resumeContent: string;
}

export const SAMPLE_CANDIDATES: SampleCandidate[] = [
  {
    id: 'swe-lead',
    name: 'Geetha Sree Manchala',
    email: 'geethasreemanchala@gmail.com',
    targetRole: 'Senior Full-Stack Automation Engineer',
    resumeFileName: 'Geetha_Manchala_Senior_Engineer_Resume.pdf',
    resumeContent: `GEETHA SREE MANCHALA
Email: geethasreemanchala@gmail.com | Location: Bengaluru / Remote | LinkedIn: linkedin.com/in/geethasree-manchala

EXECUTIVE SUMMARY
Results-driven Senior Full-Stack and Automation Engineer with 6+ years of experience architecting resilient distributed systems, enterprise n8n workflow automations, and cloud-native AI integrations. Spearheaded automation pipelines reducing manual operational overhead by 42% across cross-functional engineering teams.

PROFESSIONAL EXPERIENCE

Lead Automation Architect — CloudScale Systems (2022 – Present)
• Designed and orchestrated 40+ production n8n workflows integrating webhooks, Slack, PostgreSQL, and LLM reasoning models, processing 250,000+ monthly events with 99.98% pipeline uptime.
• Automated candidate evaluation and document extraction pipelines, trimming applicant screening turnaround time from 72 hours to 90 seconds.
• Architected RESTful microservices in Node.js and TypeScript handling concurrent payload ingestions with sub-200ms p95 latency.
• Mentored a team of 7 junior engineers in workflow design, distributed systems observability, and CI/CD pipelines.

Senior Software Engineer — Innovate Labs (2019 – 2022)
• Built scalable client-facing dashboards using React, TypeScript, and Tailwind CSS, increasing user engagement by 34%.
• Implemented automated ETL pipelines transforming semi-structured PDF documents into validated relational database entities.
• Optimized database indexing and query plans, cutting peak memory consumption by 38% and storage costs by $18,000 annually.

TECHNICAL EXPERTISE
• Automation & Orchestration: n8n, Webhooks, Zapier, Apache Airflow, Docker, Kubernetes
• Languages: TypeScript, JavaScript, Python, SQL, HTML5, CSS3
• Frameworks & Libraries: React, Node.js, Express, Next.js, Tailwind CSS
• Databases & Cloud: PostgreSQL, Supabase, Redis, AWS (S3, Lambda), Google Cloud Run
• Methodologies: Agile / Scrum, TDD, Clean Architecture, CI/CD, Microservices

EDUCATION
Bachelor of Technology in Computer Science & Engineering
JNTU — First Class with Distinction
`,
  },
  {
    id: 'pm-tech',
    name: 'Aravind Patel',
    email: 'aravind.patel@example.com',
    targetRole: 'Lead Technical Product Manager',
    resumeFileName: 'Aravind_Patel_Product_Lead.pdf',
    resumeContent: `ARAVIND PATEL
Email: aravind.patel@example.com | San Francisco, CA | Portfolio: aravindpatel.dev

SUMMARY
Strategic Technical Product Leader with 8 years of experience scaling AI-powered workflow automation and B2B SaaS platforms. Managed product roadmaps generating $14.2M in annual recurring revenue.

EXPERIENCE
Principal Product Manager — Nexus Automations (2021 – Present)
• Directed product strategy for enterprise workflow integration engine connecting 120+ third-party SaaS APIs.
• Increased workflow activation rate by 54% through friction-free visual node builders and self-serve templates.
• Partnered with engineering leads to launch real-time document analysis feature adopted by 400+ enterprise accounts within 60 days.

Senior Product Manager — DataFlow Corp (2017 – 2021)
• Spearheaded customer onboarding redesign reducing churn by 22% and improving NPS from 41 to 68.
• Defined telemetry metrics, OKRs, and pricing tiers for the cloud automation platform.

EDUCATION & CERTIFICATIONS
MBA, Tech Innovation — UC Berkeley Haas
BS in Electrical Engineering & Computer Science — UC Berkeley
`,
  },
];
