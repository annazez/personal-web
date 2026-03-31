# Personal Website

A fast, static personal website built with Astro and Tailwind CSS. 

> ⚠️ **Repository Notice**
> This repository is actively maintained on [Codeberg](https://codeberg.org/annazez/pages). The GitHub repository is an automated, read-only mirror. Please direct any issues or development matters to the Codeberg repository.

## 🚀 Tech Stack

- **Framework:** [Astro](https://astro.build/) (Static Site Generation)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing:** Custom i18n static routing (`/cs/`, `/en/`)
- **Deployment:** Codeberg Pages

## 📁 Project Structure

- `src/i18n/` - Custom routing logic and language dictionaries
- `src/pages/` - Static page templates and localized routes
- `src/components/` - Reusable UI components
- `src/styles/` - Global Tailwind CSS configuration

## 💻 Commands

All commands are run from the root of the project, from a terminal:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Builds your production site to `./dist/` |
| `npm run deploy` | Builds the site and deploys it to the `pages` branch |
| `npm run lint` | Runs ESLint to check code quality |
| `npm run format` | Runs Prettier to format the codebase |
| `npm run clean` | Removes cached files and build outputs |

## ⚖️ License

All Rights Reserved. No license is granted for the reproduction or modification of this code or its content.