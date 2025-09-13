Atlys Frontend Assignment

This project was built as part of the Atlys Frontend Hiring Task.
It implements an authentication flow (Sign In / Sign Up) and a Feed page inspired by the provided Figma design.

🚀 Tech Stack

Next.js 15 (App Router)

TypeScript

TailwindCSS

Framer Motion (animations)

🔑 Features

Authentication

Sign In / Sign Up pages.

Redirect to /feed after login.

Test accounts:

demo@example.com / password123

test@user.com / testpass

Feed Page

Post composer (create new posts).

Published posts displayed instantly.

Interaction buttons (Like, Comment, Share → currently show alerts).

Unauthenticated Users

Any feed interaction triggers Sign In modal.

🛠 Getting Started

Clone and install:

git clone https://github.com/niteshchand/atlys-frontend.git
cd atlys-frontend
npm install


Run the dev server:

npm run dev


Visit 👉 http://localhost:3000

🌍 Live Demo

Deployed on Vercel:
👉 https://atlys-frontend-wine.vercel.app

✨ Notes

This project focuses only on the frontend.

Post publishing works in local state only (no real backend).