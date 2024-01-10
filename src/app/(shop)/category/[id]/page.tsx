import { CategoryT } from '@/interfaces/category.interface';

export default function ({ params }: CategoryT): JSX.Element {
    const { id } = params;

    return (
        <div>
            <h1>Hello Page {id}</h1>
        </div>
    );
}
