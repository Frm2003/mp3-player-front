'use client';

import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface iContext {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<iContext>({
    show: false,
    setShow: () => {},
});

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <ModalContext.Provider value={{ show, setShow }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = (): iContext => useContext(ModalContext);
