import { type ProjectType } from '@/types/Project'

export const ProjectsLib: ProjectType[] = [
   {
      id: 'euromar',
      title: 'EUROMAR Portal',
      projectUrl: 'https://www.eu-registry.com/euromar/',
      description:
         'Developed a public website power by CrafterCMS and a private user portal with a admin backoffice.',
      longDescription: `
      <p>
      The <strong>EUROMAR Portal</strong> is a project i worked on at <strong>CGI</strong>, made up of two main parts: a public website and a private user portal for the EU ship registry.
      </p>

      <br/>

      <p>
      The public site was built with CrafterCMS as content manager, to allow easy dynamic content updates by the client. 
      </p>

      <br/>

      <p>
      The private portal has two sections:
      </p>

      <ul>
         <li>
         <strong>Admin BackOffice</strong> — where admins can manage and approve users, and create dynamic forms to be filled by users.
         </li>
         <li>
         <strong>User Area</strong> — where logged-in users can access and submit those forms including managing their account.
         </li>
      </ul>

      <br/>

      <p>
      The project was built with <em>Next.js</em>, <em>TypeScript</em>, <em>Supabase</em> for auth and database and styled with <em>Tailwind CSS</em>.
      </p>

      `,
      imageUrl: '/projects/euromar.webp',
      techStack: ['React.js', 'Next.js', 'Tailwind', 'Typescript', 'Supabase', 'CrafterCMS'],
      company: 'CGI',
      year: '2024',
      workProject: true,
   },
   {
      id: 'agendamentos-online',
      title: 'Portugal Embassies Appointments Portal',
      projectUrl: 'https://agendamentos.mne.gov.pt/en/login',
      description: 'Developed the new scheduling website for consulates and embassies of Portugal.',
      longDescription: `
      <p>
      This platform is a project i worked on at <strong>CGI</strong>. Developed for the <strong>Portuguese Ministry of Foreign Affairs</strong> to simplify the process of scheduling appointments at consular offices worldwide.
      </p>

      <br/>

      <p>
      Used by Portuguese citizens and foreign residents to book in-person appointments.
      </p>

      <br/>

      <p>
      Built with a focus on usability, performance, and accessibility for a wide range of users.
      </p>

      <br/>

      <p>
      This was a <strong>high-impact</strong> public service platform, helping reduce in-person wait times and making the scheduling process more efficient.
      </p>

      <br/>

      <p>
      The project was built with <em>Next.js</em>, <em>TypeScript</em> and styled with <em>Tailwind CSS</em>.
      </p>
      `,
      imageUrl: '/projects/appointments.webp',
      techStack: ['Next.js', 'Tailwind', 'Typescript'],
      company: 'CGI',
      year: '2023',
      workProject: true,
   },
   {
      id: 'gassu-form',
      title: 'GasSU Contract Form',
      projectUrl: 'https://www.gassu.pt/gassu/contratar/',
      description: 'Delevoped a contract form for new customers of GasSU.',
      longDescription: `
      <p>
      This is a project i worked on at <strong>CGI</strong>. Its a contract form for <strong>Gás Serviço Universal (GASSU)</strong>, where new customers can apply to get natural gas at home.
      </p>

      <br/>

      <p>
      Simple and designed to make the contracting process easier for new clients.
      </p>

      <br/>

      <p>
      The project was built with <em>Next.js</em>, <em>TypeScript</em> and styled with <em>Tailwind CSS</em>.
      </p>

      `,
      imageUrl: '/projects/gassu.webp',
      techStack: ['Next.js', 'Tailwind', 'Typescript'],
      company: 'CGI',
      year: '2025',
      workProject: true,
   },
   {
      id: 'geometrix',
      title: 'Geometrix',
      projectUrl: 'https://www.hypatiamat.com/jogos/geometrixv7/index.html',
      longDescription: `
      <p>
      This project was developed as part of my final university project, in collaboration with <strong>Hypatiamat</strong> — an educational platform with games for elementary school students.
      </p>

      <br/>

      <p>
      The game, <strong>Geometrix</strong>, teaches basic geometry concepts in a fun and interactive way.
      </p>

      <br/>

      <p>
      Students earn points, climb the rankings, and learn while playing.
      </p>

      <br/>
      
      <p>
      Worked directly with the <strong>Hypatiamat</strong> team, giving me my first real experience working with a client and understanding how things work in a professional setting.
      </p>

      <br/>

      <p>
      The game was built using <strong>Phaser.js</strong>, a fast, free and fun open source framework for Canvas and WebGL powered browser games.
      </p>
      `,
      description:
         'Developed a geometry game for Hypatiamat, a platform with various games for elementary school students.',
      imageUrl: '/projects/geometrix.webp',
      techStack: ['Javascript', 'Phaser.js'],
      company: 'University',
      year: '2022',
      workProject: true,
   },
   {
      id: 'luisa-mendes',
      title: 'Luisa Mendes - Makeup Artist',
      projectUrl: 'https://luisamendes.vercel.app',
      longDescription: `
      <p>
      A personal portfolio I built for a makeup artist, to help showcase her work.
      </p>

      <br/>

      <p>
      Clean and minimal design to highlight her photos and portfolio.
      </p>

      <br/>

      <p>
      The project was built with <em>Next.js</em>, <em>TypeScript</em> and styled with <em>Tailwind CSS</em>.
      </p>
      `,
      description: 'Developed a personal portfolio showcasing the work of a makeup artist.',
      imageUrl: '/projects/luisamendes.webp',
      techStack: ['Next.js', 'Tailwind', 'Typescript'],
      company: 'Client',
      year: '2025',
      workProject: true,
   },

   {
      id: 'queue-dash',
      title: 'QueueDash',
      projectUrl: 'https://bullmq-redis-dash.vercel.app/',
      longDescription: `
      <p>
         <strong>QueueDash</strong> is a side project I built for fun and learning — a simple dashboard that shows how to handle background jobs using <strong>BullMQ</strong>, <strong>Redis</strong>, and <strong>Next.js</strong>.
      </p>

      <br/>

      <p>
      Shows how to offload long-running tasks (like sending emails) to background workers.
      </p>

      <br/>

      <p>   
      Built with new latest Next.js/React.js features:
      </p>

      <ul>
         <li>
         <strong>React Compiler</strong>
         </li>
         <li>
         <strong>Partial Prerendering (PPR)</strong>
         </li>
         <li>
         <strong>App Router</strong>
         </li>
         <li>
         <strong>tRPC</strong> - End-to-end typesafe API
         </li>
         <li>
         <strong>React Query</strong> - Caching and revalidating
         </li>
      </ul>

      <br/>

      <p>
      Uses <strong>Redis</strong> to persist and manage queue state, with <strong>BullMQ</strong> handling the job lifecycle.
      </p>

      <br/>

      <p>   
      Also includes a separate <strong>Node.js</strong> serve running a <strong>BullMQ worker</strong> to process the background jobs.
      </p>
      `,
      description: 'A simple and educational demo showcasing how to manage background jobs.',
      imageUrl: '/projects/queue-dash.webp',
      techStack: ['BullMQ', 'Redis', 'Node.js', 'tRPC', 'Next.js', 'Tailwind', 'Typescript'],
      company: 'Open Source',
      year: '2025',
      workProject: false,
   },
]
