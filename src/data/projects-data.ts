import { type ProjectType } from '@/shared/types/Project'

export const ProjectsData: ProjectType[] = [
    {
        id: 'booking-platform',
        nda: true,
        title: 'Online Booking Platform',
        projectUrl: null,
        description:
            '<p><strong>Lead developer</strong> for a worldwide appointment scheduling booking platform in the public sector.</p>',
        longDescription: `
      <p>
      Online booking platform designed to simplify appointment scheduling and reduce in-person wait times. With a focus on accessibility and user experience.
      </p>

      <br/>

      <p>
        Serving <strong>1M+ users worldwide</strong>, the platform reduced phone line wait times by <strong>over 90%</strong>, freeing up staff and improving overall service efficiency.
      </p>

      <br/>

      <p>
      Led frontend development, making key technical and architectural decisions, and optimizing performance.
      </p>
    `,
        imageUrl: null,
        techStack: [],
        label: 'Lead Delevoper',
        year: '',
        workProject: true,
        priority: 2,
        showcaseFeatures: [
            {
                value: '2M+',
                label: 'Users worldwide',
            },
            {
                value: '-90%',
                label: 'Reduction in phone wait times',
            },
        ],
    },

    {
        id: 'cms-portal',
        nda: true,
        title: 'CMS‑Powered Website & Portal',
        projectUrl: null,
        description:
            '<p><strong>Lead developer</strong> responsible for full-stack development of a public website (powered by a headless CMS), private portal, and admin back office.</p>',
        longDescription: `
      <p>
      Platform composed of a public website, a private user portal and a administrative backoffice.
  </p>

  <br/>

  <p>
    The public-facing website is powered by a headless CMS, allowing content managers to easily update and publish dynamic content without developer involvement.
  </p>

  <br/>

  <p>
    In the private portal, users can submit and track dynamic forms. While administrators handle approvals and workflow in the administrative back office.
  </p>
  
  <br/>

  <p>
    Responsible for full-stack development, making key technical and architectural decisions.
  </p>
    `,
        imageUrl: null,
        techStack: [],
        label: 'Lead Delevoper',
        year: '',
        workProject: true,
        priority: 3,
    },

    {
        id: 'saas-portal',
        nda: true,
        title: 'Multi-Tenant Client Portal',
        projectUrl: null,
        description:
            '<p><strong>Lead developer</strong> for a multi-tenant SaaS client portal in the utilities sector, integrated with a headless CMS.</p>',
        longDescription: `
<p>
    Multi-tenant SaaS platform serving as a private client portal for companies in the utilities sector, covering electricity and gas services, serving <strong>1.5M+ users</strong> .
  </p>

  <br/>

  <p>
    Fully integrated with a headless CMS, enabling content authors to make and publish updates at any time of the day without developer involvement.
  </p>

  <br/>

  <p>
    As Lead Developer, i was responsible for the architecture, database design, technical decisions and team organization. As well as collaborating closely with project managers, UX teams, and QA teams.
  </p>
    `,
        imageUrl: null,
        techStack: [],
        label: 'Lead Delevoper',
        year: '',
        workProject: true,
        priority: 1,
        showcaseFeatures: [
            {
                value: '1M+',
                label: 'Users nationwide',
            },
        ],
    },
]
