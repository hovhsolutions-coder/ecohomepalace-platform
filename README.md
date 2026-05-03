# Eco Home Palace

Premium home services matching platform connecting homeowners with qualified local professionals.

## Public Pages

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Services overview, categories, conversion CTA |
| Start Project | `/intake` | 6-step premium lead capture form |
| Thank You | `/thanks` | Confirmation, matching status, next steps |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM + SQLite
- **Deployment**: Vercel

## Environment Variables

```
DATABASE_URL="file:./dev.db"
FOUNDER_PASSWORD="eco-founder-2025"
```

## Development

```bash
npm install
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Internal

- `/board` - Founder-only lead management (protected by `FOUNDER_PASSWORD`)
- `/api/leads` - Lead submission endpoint with auto-classification
