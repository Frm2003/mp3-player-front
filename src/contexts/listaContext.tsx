'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Lista } from '@/lib/classeLista';

interface ListaContextType {
    lista: Lista;
}

const ListaContext = createContext<ListaContextType | undefined>(undefined);

export const ListaProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [lista] = useState<Lista>(new Lista());

    return (
        <ListaContext.Provider value={{ lista }}>
            {children}
        </ListaContext.Provider>
    );
};

export const useList = (): ListaContextType => {
    const context = useContext(ListaContext);
    if (context === undefined) {
        throw new Error('useList must be used within a ListaProvider');
    }
    return context;
};
