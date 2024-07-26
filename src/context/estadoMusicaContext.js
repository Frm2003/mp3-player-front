'use client';

import { createContext, useContext, useState } from 'react';

const controleMusica = {
	estado: 'pausado',
	audioAtual: null,
	musicaAtual: null,
	duracao: null,
};

const EstadosContext = createContext(controleMusica);

export const EstadosMusicaProvider = ({ children }) => {
	const [info, setInfo] = useState({
		estado: 'pausado',
		audioAtual: null,
		musicaAtual: null,
		duracao: null,
	});

	return (
		<EstadosContext.Provider value={{ info, setInfo }}>
			{children}
		</EstadosContext.Provider>
	);
};

export const useEstadosMusica = () => useContext(EstadosContext);
