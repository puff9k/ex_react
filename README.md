# Ex React

Maquette d'un site Next.js (App Router) + CSS vanilla + Prisma.

## Structure

```
prisma/
  schema.prisma            # modèles de la base (source de vérité)
  migrations/              # SQL généré par `prisma migrate dev`
  seed.ts                  # données de démo
src/
  app/                     # routing par dossiers (App Router)
    layout.tsx             # layout racine : header + footer
    globals.css            # variables CSS, reset, styles globaux
    page.tsx               # "/"
    not-found.tsx          # 404 (URL inconnue ou notFound())
    error.tsx              # error boundary global (Client Component)
    contact/
      page.tsx             # "/contact" (Server Component)
      ContactForm.tsx      # formulaire (Client Component, useActionState)
      actions.ts           # Server Action : validation + écriture en base
    messages/
      page.tsx             # "/messages" : liste lue en base (Server Component async)
      loading.tsx          # affiché pendant le chargement des données
      [id]/page.tsx        # "/messages/:id" : route dynamique
    api/messages/
      route.ts             # GET/POST /api/messages
      [id]/route.ts        # GET/DELETE /api/messages/:id
  components/              # composants réutilisables + leur CSS Module
  lib/
    prisma.ts              # instance unique du client Prisma
    messages.ts            # accès aux données (server-only)
    validation.ts          # validation partagée action / API
    subjects.ts            # libellés de l'enum, utilisable côté client
    format.ts              # helpers d'affichage
```

## Démarrage

```bash
cp .env.example .env     # puis renseigner DATABASE_URL
npm install              # lance aussi `prisma generate`
npm run db:migrate       # applique les migrations
npm run db:seed          # données de démo
npm run dev
npm run typecheck        # vérification TypeScript
```
