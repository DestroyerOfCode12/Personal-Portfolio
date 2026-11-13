// Single content source. Scraped from the live site (jacob-mkhwanazi.netlify.app)
// via Firecrawl; components never hardcode copy.

export const profile = {
  name: 'Jacob Mkhwanazi',
  role: 'ServiceNow Engineer / Full-Stack Developer',
  location: 'Johannesburg, South Africa',
  headline: ['I make enterprise', 'systems talk to', 'each other.'],
  summary:
    'ITSM and LMS integration engineer building automated workflows and full-stack tooling across ServiceNow, HaloITSM, Cherwell, and Litmos — with a full-stack development practice on the side.',
  email: 'jacobesselmkhwanazi@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jacobesselmkhwanazi/',
  github: 'https://github.com/DestroyerOfCode12',
  site: 'https://jacob-mkhwanazi.netlify.app',
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  period: string
  startDate: string
  current: boolean
  highlights: string[]
}

export const experience: ExperienceEntry[] = [
  {
    id: 'pink-elephant',
    company: 'Pink Elephant',
    role: 'ServiceNow Software Engineer/Developer',
    period: 'Feb 2026 — Present',
    startDate: '2026-02-01',
    current: true,
    highlights: [
      'Deliver ITSM/LMS integration projects end to end, from scoping through go-live.',
      'Build ServiceNow scripting, workflows, and dashboards for client environments.',
      'Configure and maintain HaloITSM instances for multiple clients.',
    ],
  },
  {
    id: 'adaptive',
    company: 'Adaptive',
    role: 'Technical Consultant',
    period: '2023 — 2026',
    startDate: '2023-01-01',
    current: false,
    highlights: [
      'Consulted on ServiceNow, Cherwell, and HaloITSM implementations for enterprise clients.',
      'Designed and built workflow automation to remove manual ITSM process steps.',
      'Managed CMDB structure and data quality across client instances.',
      'Architected API integrations connecting ITSM platforms to third-party systems.',
    ],
  },
]

export function getYearsOfExperience(): number {
  const earliest = Math.min(...experience.map((e) => new Date(e.startDate).getTime()))
  return Math.floor((Date.now() - earliest) / (1000 * 60 * 60 * 24 * 365.25))
}

export interface Project {
  id: string
  name: string
  description: string
  stack: string[]
  status: 'live' | 'in-progress' | 'complete'
  context?: string
  url?: string
  liveUrl?: string
  featured?: boolean
  image?: string
}

export const projects: Project[] = [
  {
    id: 'malika-cakes',
    name: "Malika's Cake Boutique",
    description:
      'Full-stack e-commerce site for a bakery — customer-facing storefront and order management backend.',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Zustand', 'Node.js', 'Express', 'Prisma'],
    status: 'live',
    url: 'https://github.com/DestroyerOfCode12/malika-cakes',
    liveUrl: 'https://malikas-cakes.netlify.app/',
    featured: true,
    image: '/projects/malika-cakes.png',
  },
  {
    id: 'payfast-litmos',
    name: 'PayFast × Litmos Enrollment Integration',
    description:
      'Node.js integration automating course enrollment triggered by PayFast payment events, syncing purchasers directly into Litmos.',
    stack: ['Node.js', 'PayFast API', 'Litmos API'],
    status: 'live',
    context: 'Pink Elephant',
  },
  {
    id: 'litmos-halo-crm-sage',
    name: 'Litmos / HaloITSM / CRM / Sage One Integration',
    description:
      'Multi-system integration synchronizing customer, billing, and support data across Litmos, HaloITSM, a CRM, and Sage One.',
    stack: ['Node.js', 'REST APIs', 'HaloITSM', 'Litmos', 'Sage One'],
    status: 'in-progress',
    context: 'Pink Elephant',
  },
  {
    id: 'rbm-haloitsm-onboarding',
    name: 'Reserve Bank of Malawi — HaloITSM Onboarding',
    description:
      'Full HaloITSM configuration and onboarding for the Reserve Bank of Malawi, delivered as a 46-sheet configuration workbook covering service catalog, workflows, and access structure.',
    stack: ['HaloITSM', 'ITSM Configuration'],
    status: 'complete',
    context: 'Adaptive',
  },
  {
    id: 'resume-engine',
    name: 'ResumeEngine',
    description:
      'AI-assisted resume tailoring app that adapts a base resume to a target job description using the Claude API.',
    stack: ['React', 'Vite', 'TypeScript', 'Zustand', 'Claude API'],
    status: 'in-progress',
    url: 'https://github.com/DestroyerOfCode12/cv-vault',
  },
]

export interface SkillGroup {
  id: string
  label: string
  skills: string[]
}

export const skills: SkillGroup[] = [
  { id: 'itsm-lms', label: 'ITSM & LMS Platforms', skills: ['ServiceNow', 'HaloITSM', 'Cherwell', 'Litmos'] },
  {
    id: 'engineering',
    label: 'Engineering Stack',
    skills: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 'practices',
    label: 'Core Practices',
    skills: ['Workflow Automation', 'API Integration Architecture', 'CMDB', 'ITIL', 'ServiceNow CSA (in progress)'],
  },
]

export const story = {
  eyebrow: '03 — Approach',
  text:
    'The work spans two registers: configuring and automating the ITSM/LMS platforms that keep organizations running, and building full-stack applications when the problem calls for custom software rather than platform configuration.',
  note: 'Currently ITIL Foundation and Practitioner certified, working toward the ServiceNow CSA.',
}

// Draft working principles (my wording, not scraped) — edit freely.
export const principles = [
  { title: 'Configure before you code', body: 'Use the platform properly first. Custom software is for what configuration cannot reach.' },
  { title: 'Integrations are products', body: 'Every connection between systems gets a clear owner, error handling and a way to be checked.' },
  { title: 'Automate the manual step', body: 'Find the step people repeat, remove it, and keep the process readable afterwards.' },
  { title: 'Leave it documented', body: 'Hand over workbooks and structure the next engineer can actually follow.' },
]

