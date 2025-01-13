# Startup Idea Platform

Startup Idea Platform is a modern web application designed for entrepreneurs and innovators to share, discover, and explore startup ideas. Built using a cutting-edge tech stack, it offers dynamic content updates, pitch submissions, and an engaging user experience.

## Tech Stack

- **React 19**: A powerful library for building interactive user interfaces.
- **Next.js 15**: A React framework for server-side rendering and static site generation.
- **Sanity**: A real-time, structured content platform for managing dynamic data.
- **TailwindCSS**: A utility-first CSS framework for efficient and customizable styling.
- **ShadCN**: A design system for building consistent UI components.
- **TypeScript**: A strongly typed programming language for improved code quality and maintainability.

---

## 🔋 Features

### 👉 Live Content API
Dynamically displays the latest startup ideas on the homepage using Sanity’s Content API, ensuring up-to-date content.

### 👉 GitHub Authentication
Provides secure and streamlined login using GitHub accounts, allowing users quick access to the platform.

### 👉 Pitch Submission
Enables users to submit their startup ideas, including the title, description, category, and multimedia links (image or video).

### 👉 View Pitches
Allows browsing of all submitted pitches with filtering options by category for easier navigation.

### 👉 Pitch Details Page
Displays detailed information for each pitch, including multimedia content and a full description.

### 👉 Profile Page
Each user has a profile page listing all the pitches they have submitted.

### 👉 Editor Picks
Admins can feature top startup ideas with the "Editor Picks" option, managed via Sanity Studio.

### 👉 Views Counter
Implements a view tracking system to count the number of views for each pitch, replacing traditional upvotes.

### 👉 Search
Offers search functionality for quick and efficient loading and viewing of pitches.

### 👉 Minimalistic Design
Focuses on a clean and fresh user interface with essential pages, prioritizing simplicity and ease of use.

### 👉 Latest Framework Features
Leverages the newest features of React 19, Next.js 15, and Sanity for enhanced performance and developer experience.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Manav-Chudasama/Startup-Idea-Platform.git
   cd startup-idea-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and configure the environment variables:
   ```env
   AUTH_SECRET="" # Added by `npx auth`. Read more: https://cli.authjs.dev
   AUTH_GITHUB_ID= ""
   AUTH_GITHUB_SECRET= ""
   NEXT_PUBLIC_SANITY_PROJECT_ID=""
   NEXT_PUBLIC_SANITY_DATASET=""
   NEXT_PUBLIC_SANITY_API_VERSION="vX"
   SANITY_WRITE_TOKEN=""
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to access the application.

---

## Contributing

We welcome contributions! Fork the repository, create a new branch, and submit a pull request with your changes.