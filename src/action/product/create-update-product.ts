'use server';

import { z } from 'zod';
import { Gender, Product, Size } from '@prisma/client';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce
        .number()
        .min(0)
        .transform((val: number): number => Number(val.toFixed(2))),
    inStock: z.coerce
        .number()
        .min(0)
        .transform((val: number): number => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce
        .string()
        .transform((val: string): string[] => val.split(',')),
    tags: z.coerce.string(),
    gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {
        return {
            ok: false,
        };
    }

    const product = productParsed.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, ...rest } = product;

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            let product: Product;
            let tagsArray = rest.tags
                .split(',')
                .map((tag: string): string => tag.trim().toLowerCase());

            if (id) {
                product = await prisma.product.update({
                    where: { id },
                    data: {
                        ...rest,
                        sizes: { set: rest.sizes as Size[] },
                        tags: tagsArray,
                    },
                });
            } else {
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[],
                        },
                        tags: {
                            set: tagsArray,
                        },
                    },
                });
            }

            if (formData.getAll('images')) {
                const images = await uploadImages(
                    formData.getAll('images') as File[]
                );
                if (!images) {
                    throw new Error(
                        'No se pudo cargar las imágenes, rollingback'
                    );
                }

                await prisma.productImage.createMany({
                    data: images.map((image) => ({
                        url: image!,
                        productId: product.id,
                    })),
                });
            }

            return {
                product,
            };
        });

        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${product.slug}`);
        revalidatePath(`/products/${product.slug}`);

        return {
            ok: true,
            product: prismaTx.product,
        };
    } catch (error) {
        return {
            ok: false,
            message: 'Revisar los logs, no se pudo actualizar/crear',
        };
    }
};

const uploadImages = async (
    images: File[]
): Promise<(string | undefined)[] | null> => {
    try {
        const uploadPromises = images.map(
            async (image: File): Promise<string | undefined> => {
                try {
                    const buffer = await image.arrayBuffer();
                    const base64Image = Buffer.from(buffer).toString('base64');
                    return cloudinary.uploader
                        .upload(`data:image/png;base64,${base64Image}`)
                        .then((r: UploadApiResponse): string => r.secure_url);
                } catch (error) {}
            }
        );

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;
    } catch (error) {
        return null;
    }
};
