# Backend

## Requirements

- node 20 or better (preferably only even versions)
- prisma cli (installed globally) (newest)
- nest cli (installed globally) (newest)
- docker (newest)
- `.env` file created from the `.env.example` template

## How to run

Preparation:

- `npm i`
- `docker-compose up -d`
- `npx prisma generate`
- `npx prisma migrate deploy`
- `npx prisma db pull` - optional to check if the migration was successful
- `npm run start:dev`
- `npx prisma studio` - optional to watch the changes within the db in real time
