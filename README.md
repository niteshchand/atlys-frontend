Atlys Frontend Assignment

This project is built as part of the Atlys Frontend Hiring Task.
It implements an auth flow (Sign In, Sign Up) and Feed page based on the provided Figma design.

🚀 Tech Stack

Next.js 15 (with App Router)

TypeScript

TailwindCSS

Framer Motion (for smooth animations)

🔑 Features

Feed page with:

Post composer (create new posts).

Display of published posts.

Interaction buttons (non-functional → show alert).

Authentication flow:

Sign In / Sign Up pages.

Users redirected to /feed after login.

Test accounts:

demo@example.com / password123  
test@user.com / testpass


For unauthenticated users:

Any feed interaction triggers Sign In modal.

🛠 Getting Started

Clone the repo and install dependencies:

git clone https://github.com/niteshchand/atlys-frontend.git
cd atlys-frontend
npm install


Run the dev server:

npm run dev


Visit 👉 http://localhost:3000
.

🌍 Live Demo

Deployed on Vercel
 → https://atlys-frontend-wine.vercel.app

✨ Notes

This project focuses only on frontend — no real backend or database.

Post publishing works locally (in-memory state).