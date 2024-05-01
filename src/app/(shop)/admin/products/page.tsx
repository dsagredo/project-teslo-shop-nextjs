import Link from 'next/link';
import { Pagination, Text } from '@/components';
import { getPagination } from '@/action';
import { currencyFormat } from '../../../../utils/currencyFormat';
import { ProductImage } from '@/ui';

interface PropT {
    searchParams: {
        page?: string;
    };
}

export const revalidate = 0;

export default async function ({ searchParams }: PropT): Promise<JSX.Element> {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, totalPages } = await getPagination({ page });

    return (
        <>
            <Text title="Mantenimiento de productos" />
            <div className="flex justify-end mb-5">
                <Link href="/admin/product/new" className="btn-primary">
                    Nuevo producto
                </Link>
            </div>
            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Imagen
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Titulo
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Precio
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Género
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Inventario
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Tallas
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <Link href={`/products/${product.slug}`}>
                                        <ProductImage
                                            src={product.ProductImage[0]?.url}
                                            alt={product.title}
                                            width={80}
                                            height={80}
                                            className="h-20 w-20 object-contain rounded"
                                        />
                                    </Link>
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <Link
                                        href={`/admin/product/${product.slug}`}
                                        className="hover:underline"
                                    >
                                        {product.title}
                                    </Link>
                                </td>
                                <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                                    {currencyFormat(product.price)}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 ">
                                    {product.gender}
                                </td>
                                <td className="text-sm text-gray-900 font-bold px-6 ">
                                    {product.inStock}
                                </td>
                                <td className="text-sm text-gray-900 font-bold px-6 ">
                                    {product.sizes.join(',')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination totalPages={totalPages} />
            </div>
        </>
    );
}
