import { initialData } from './seed';
import prisma from '../lib/prisma';
import { countries } from './seed-countries';

async function main(): Promise<void> {
    // 1. Borrar registros previos
    //await Promise.all([
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.address.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    //]);

    const { categories, products, users } = initialData;

    // Categories
    const categoriesData = categories.map((name: string): { name: string } => ({
        name,
    }));

    await prisma.category.createMany({
        data: categoriesData,
    });

    await prisma.country.createMany({
        data: countries,
    });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce(
        (
            map: Record<string, string>,
            category: { id: string; name: string }
        ): Record<string, string> => {
            map[category.name.toLowerCase()] = category.id;
            return map;
        },
        {} as Record<string, string>
    );

    // Products
    products.forEach(async (product: any): Promise<void> => {
        const { type, images, ...rest } = product;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type],
            },
        });

        const ImagesData = images.map(
            (image: any): { url: any; productId: string } => ({
                url: image,
                productId: dbProduct.id,
            })
        );

        await prisma.productImage.createMany({
            data: ImagesData,
        });
    });

    // Users
    await prisma.user.createMany({
        data: users,
    });
}

((): void => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();
