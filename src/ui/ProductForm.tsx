'use client';

import { createUpdateProduct, deleteProductImage } from '@/action';
import { CategoryT, FormInputT, Product, ProductImageT } from '@/interfaces';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ProductImage } from './ProductImage';

interface ProductFormT {
    product: Partial<Product> & { ProductImage?: ProductImageT[] };
    categories: CategoryT[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const ProductForm = ({
    product,
    categories,
}: ProductFormT): JSX.Element => {
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { isValid },
        getValues,
        setValue,
        watch,
    } = useForm<FormInputT>({
        defaultValues: {
            ...product,
            tags: product.tags?.join(', '),
            sizes: product.sizes ?? [],
            images: undefined,
        },
    });

    watch('sizes');

    const onSizeChanged = (size: string): void => {
        const sizes = new Set(getValues('sizes'));
        sizes.has(size) ? sizes.delete(size) : sizes.add(size);
        setValue('sizes', Array.from(sizes));
    };

    const onSubmit = async (data: FormInputT): Promise<void> => {
        const formData = new FormData();

        const { images, ...ProductToSave } = data;

        if (product.id) {
            formData.append('id', product.id ?? '');
        }

        formData.append('title', ProductToSave.title);
        formData.append('slug', ProductToSave.slug);
        formData.append('description', ProductToSave.description);
        formData.append('price', ProductToSave.price.toString());
        formData.append('inStock', ProductToSave.inStock.toString());
        formData.append('sizes', ProductToSave.sizes.toString());
        formData.append('tags', ProductToSave.tags);
        formData.append('categoryId', ProductToSave.categoryId);
        formData.append('gender', ProductToSave.gender);

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        const { ok, product: updatedProduct } = await createUpdateProduct(
            formData
        );

        if (!ok) {
            alert('Producto no se pudo actualizar');
            return;
        }

        router.replace(`/admin/product/${updatedProduct?.slug}`);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
        >
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('title', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('slug', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('description', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Inventario</span>
                    <input
                        type="number"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('inStock', { required: true, min: 0 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input
                        type="number"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('price', { required: true, min: 0 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('tags', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('gender', { required: true })}
                    >
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoria</span>
                    <select
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('categoryId', { required: true })}
                    >
                        <option value="">[Seleccione]</option>
                        {categories.map(
                            (category: CategoryT): JSX.Element => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <button className="btn-primary w-full">Guardar</button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                {/* As checkboxes */}
                <div className="flex flex-col">
                    <span>Tallas</span>
                    <div className="flex flex-wrap">
                        {sizes.map(
                            (size: string): JSX.Element => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div
                                    key={size}
                                    onClick={() => onSizeChanged(size)}
                                    className={clsx(
                                        'p-2 cursor-pointer border rounded-md mr-2 w-14 transition-all text-center',
                                        {
                                            'bg-blue-500 text-white':
                                                getValues('sizes').includes(
                                                    size
                                                ),
                                        }
                                    )}
                                >
                                    <span>{size}</span>
                                </div>
                            )
                        )}
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Fotos</span>
                        <input
                            type="file"
                            multiple
                            {...register('images', { required: true })}
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {product.ProductImage?.map(
                            (image: ProductImageT): JSX.Element => (
                                <div key={image.id}>
                                    <ProductImage
                                        alt={product.title ?? ''}
                                        src={image.url}
                                        width={300}
                                        height={300}
                                        className="rounded-t shadow-md"
                                    />
                                    <button
                                        className="btn-danger w-full rounded-b-xl"
                                        type="button"
                                        onClick={(): Promise<
                                            | {
                                                  ok: boolean;
                                                  error: string;
                                                  message?: undefined;
                                              }
                                            | {
                                                  ok: boolean;
                                                  message: string;
                                                  error?: undefined;
                                              }
                                            | undefined
                                        > =>
                                            deleteProductImage(
                                                image.id,
                                                image.url
                                            )
                                        }
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};
