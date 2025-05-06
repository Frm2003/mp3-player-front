import type { ReactNode } from 'react';

interface iProps<T> {
    list: T[];
    functionRender: (item: T) => ReactNode;
}

export default function ListLayoutBody<T>({ list, functionRender }: iProps<T>) {
    return (
        <>
            {list.map((item, index: number) => (
                <li key={index}>{functionRender(item)}</li>
            ))}
        </>
    );
}
