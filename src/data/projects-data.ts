import { type ProjectType } from '@/types/Project'

export const ProjectsData: ProjectType[] = [
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
        label: 'University - Hypatiamat',
        year: '2022',
        workProject: false,
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
        label: 'Private Client',
        year: '2025',
        workProject: false,
    },

    {
        id: 'nuve',
        title: 'Nuvē - Premium Cars',
        projectUrl: 'https://nuve-premium.vercel.app/',
        longDescription: `
      <p>
         <strong>Nuvē - Premium Cars</strong> is a test project designed as a premium digital showcase for exotic vehicles and high-performance supercars.
      </p>

      <br/>

      <p>
      A standout feature of the platform is the interactive <strong>3D showroom</strong>, where users can view selected supercar models in full 360-degree rotation.
      </p>

      <br/>

      <p>
      This immersive experience was implemented using <strong>Three.js</strong> and <strong>GLTF models</strong>.
      </p>

      <br/>

      <p>
      The project was built with <em>Next.js</em>, <em>TypeScript</em> and styled with <em>Tailwind CSS</em>.
      </p>

      `,
        description:
            'Fictional luxury platform showcasing exclusive supercars with 3D experiences.',
        imageUrl: '/projects/nuve.webp',
        techStack: ['Three.js', 'GLTF', 'Next.js', 'Tailwind', 'Typescript'],
        label: 'Open Source',
        year: '2025',
        workProject: false,
        priority: 1,
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
        label: 'Open Source',
        year: '2025',
        workProject: false,
    },
]
