# Teslo Shop App with NextJS and Prisma.

A comprehensive and fairly large application for managing and selling products using Next.js and Prisma Client
<br>

## Build-With:

-   next-auth
-   bcryptjs
-   @prisma/client
-   @paypal/react-paypal-js
-   cloudinary
-   swiper
-   zustand
-   zod

## Features

-   User management
-   Administrative dashboard
-   Image uploads
-   Payment validation

## Installation

```sh
$ git clone https://github.com/dsagredo/project-teslo-shop-nextjs.git
$ cd project-teslo-shop-nextjs/

1. Create a copy of the `.env.template` and rename it to `.env` then change the environment variables.
2. Install dependencies with `npm install`
3. Launch the database with `docker compose up -d`
4. Run Prisma migrations with `npx prisma migrate dev`
5. Execute seed data with `npm run seed`
6. Run the project with `npm run dev`
```

![Home - Teslo _ Shop](https://github.com/dsagredo/project-teslo-shop-nextjs/assets/24228373/6bf7c368-e78e-4585-95ba-e15c5833f511)

## Deploy on Vercel

https://teslo-mercado.vercel.app/
