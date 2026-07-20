// Central content source for the site. Components read from here rather than
// hardcoding copy, so updates happen in one place.

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  period: string
  current: boolean
  highlights: string[]
}

export interface ProjectEntry {
  id: string
  name: string
  description: string
  stack: string[]
  status: 'live' | 'in-progress' | 'complete'
  context?: string
  url?: string
}

export interface SkillGroup {
  id: string
  label: string
  skills: string[]
}

export interface Profile {
  name: string
  role: string
  location: string
  summary: string
  email: string
  linkedin: string
  github: string
}

export const profile: Profile = {
  name: 'Jacob Mkhwanazi',
  role: 'ServiceNow Engineer / Full-Stack Developer',
  location: 'Johannesburg, South Africa',
  summary:
    'ITSM and LMS integration engineer building automated workflows and full-stack tooling across ServiceNow, HaloITSM, Cherwell, and Litmos — with a full-stack development practice on the side.',
  email: 'jacobesselmkhwanazi@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jacobesselmkhwanazi/',
  github: 'https://github.com/DestroyerOfCode12',
}

export const experience: ExperienceEntry[] = [
  {
    id: 'pink-elephant',
    company: 'Pink Elephant',
    role: 'ServiceNow Software Engineer/Developer',
    period: 'Feb 2026 — Present',
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
    current: false,
    highlights: [
      'Consulted on ServiceNow, Cherwell, and HaloITSM implementations for enterprise clients.',
      'Designed and built workflow automation to remove manual ITSM process steps.',
      'Managed CMDB structure and data quality across client instances.',
      'Architected API integrations connecting ITSM platforms to third-party systems.',
    ],
  },
]

export const projects: ProjectEntry[] = [
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
    id: 'malika-cakes',
    name: "Malika's Cake Boutique",
    description:
      'Full-stack e-commerce site for a bakery — customer-facing storefront and order management backend.',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Zustand', 'Node.js', 'Express', 'Prisma'],
    status: 'live',
    url: 'https://github.com/DestroyerOfCode12/malika-cakes',
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

export const skills: SkillGroup[] = [
  {
    id: 'itsm-lms',
    label: 'ITSM & LMS Platforms',
    skills: ['ServiceNow', 'HaloITSM', 'Cherwell', 'Litmos'],
  },
  {
    id: 'engineering',
    label: 'Engineering Stack',
    skills: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 'practices',
    label: 'Core Practices',
    skills: [
      'Workflow Automation',
      'API Integration Architecture',
      'CMDB',
      'ITIL',
      'ServiceNow CSA (in progress)',
    ],
  },
]
