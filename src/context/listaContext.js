'use client';

import { Lista } from '@/lib/classeLista';
import { createContext, useContext, useState } from 'react';

const lista = new Lista();
const ListaContext = createContext(lista);

export const ListaProvider = ({ children }) => {
	const [lista] = useState(new Lista());

	return (
		<ListaContext.Provider value={{ lista }}>
			{children}
		</ListaContext.Provider>
	);
};

export const useList = () => useContext(ListaContext);

// TALVEZ SEJA INTERESSANTE TIRA O STATE