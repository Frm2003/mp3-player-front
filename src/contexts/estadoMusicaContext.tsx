'use client';

import type Musica from '@/lib/classeMusica';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface iControleMusica {
    estado: 'pausado' | 'tocando';
    audioAtual: HTMLAudioElement | undefined;
    musicaAtual: Musica | undefined;
    duracao: string | undefined;
}

interface EstadosContextType {
    info: iControleMusica;
    setInfo: React.Dispatch<React.SetStateAction<iControleMusica>>;
}

const controleMusicaInicial: iControleMusica = {
    estado: 'pausado',
    audioAtual: undefined,
    musicaAtual: undefined,
    duracao: undefined,
};

const EstadosContext = createContext<EstadosContextType>({
    info: controleMusicaInicial,
    setInfo: () => {},
});

export const EstadosMusicaProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [info, setInfo] = useState<iControleMusica>(controleMusicaInicial);

    return (
        <EstadosContext.Provider value={{ info, setInfo }}>
            {children}
        </EstadosContext.Provider>
    );
};

export const useEstadosMusica = (): EstadosContextType =>
    useContext(EstadosContext);
