# MERN Portfolio — Software Dev → AI Engineer

A responsive portfolio site built on the MERN stack (MongoDB, Express,
React, Node.js). Projects are stored in MongoDB and served through a
small API; the contact form also saves messages to the database.

```
portfolio-mern/
├── client/     React + Vite frontend
└── server/     Express + MongoDB backend
```

## 1. Requirements

- Node.js 18+ and npm
- MongoDB running locally, or a free MongoDB Atlas cluster

Install MongoDB locally on Ubuntu:
```bash
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
```
(Or skip this and use a free Atlas connection string instead — see below.)

## 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
CLIENT_ORIGIN=http://localhost:5173
```
If using Atlas, replace `MONGO_URI` with your Atlas connection string.

Seed sample projects into the database:
```bash
npm run seed
```

Start the API:
```bash
npm run dev
```
It runs on `http://localhost:5000`. Check `http://localhost:5000/api/health`.

## 3. Set up the frontend

In a new terminal:
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173`. The Vite dev server proxies `/api` calls to
the Express server automatically (see `vite.config.js`).

## 4. Personalize it

Edit `client/src/data/profile.js` — your name, tagline, about text,
skills, email, and social links all live there. No component code needs
to change for basic personalization.

Add your own projects either by editing `server/config/seed.js` and
re-running `npm run seed`, or by POSTing to the API:
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"My Project","description":"What it does","tags":["React","Node"],"githubUrl":"https://github.com/you/repo"}'
```

Drop your resume PDF into `client/public/resume.pdf` to make the navbar
"resume.pdf" link work.

## 5. Build for production

```bash
cd client
npm run build
```
This outputs static files to `client/dist`, which you can deploy to
Vercel, Netlify, or any static host. Deploy `server/` separately (e.g.
Render, Railway, or a VPS) and point `CLIENT_ORIGIN` / your frontend's
API base URL at it.

## Design notes

- Dark, signal/circuit-inspired theme — deep navy background, teal +
  violet accents, monospace section labels styled like code comments.
- The hero features an animated neural-network graph (pure SVG/CSS,
  no dependencies) as a nod to the software → AI transition.
- Fully responsive: single-column on mobile, grid layouts from tablet
  width up. Respects `prefers-reduced-motion`.
