'use client';

import Musica from '@/utils/Musica';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface iContext {
    list: Musica[];
    setList: React.Dispatch<React.SetStateAction<Musica[]>>;
}

const ListFileContext = createContext<iContext>({
    list: [],
    setList: () => {},
});

export const ListFileProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [list, setList] = useState<Musica[]>([]);

    return (
        <ListFileContext.Provider value={{ list, setList }}>
            {children}
        </ListFileContext.Provider>
    );
};

export const useListFileContext = (): iContext => useContext(ListFileContext);
