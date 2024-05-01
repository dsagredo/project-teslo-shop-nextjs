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

<p align="center">
<img width="1728" alt="Captura de pantalla 2023-04-08 a la(s) 22 49 39" src="https://user-images.githubusercontent.com/24228373/230752006-4bd099c5-e6b3-49b5-a353-14258ef9481a.png">
</p>

## Deploy on Vercel

https://teslo-mercado.vercel.app/
