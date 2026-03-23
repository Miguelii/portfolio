# Miguel Goncalves — Developer Portfolio

Live at [miguelgoncalves.dev](https://www.miguelgoncalves.dev)

## Stack

- **Next.js 16** with App Router and Turbopack
- **Sanity** as headless CMS with an embedded Studio at `/studio`
- **Three.js** with React Three Fiber, Drei, and Rapier for 3D scenes
- **Motion** for animations
- **Tailwind CSS 4**
- **Vitest** and Testing Library for tests
- **AI Tooling:** Claude Code with Vercel's agent skills

## Code Quality Tools

This project uses automated code quality tools to maintain consistency:

- **vite-plus**: Unified toolchain that bundles linting, formatting and testing:
    - **oxlint**: Rust-based linter (replaces ESLint)
    - **oxfmt**: Rust-based code formatter (replaces Prettier)
    - **Vitest**: Unit testing with jsdom environment
- **Knip**: Detects unused files, exports, and dependencies
- **TypeScript**: Provides type safety
- **Husky**: Runs pre-commit hooks automatically
- **SonarQube Cloud**: Continuous code analysis for bugs, vulnerabilities, and code smells

## License

This project is open-source and available under the [MIT license](./LICENSE).

Feel free to use or modify it, as long as credit is properly given to the original author.
