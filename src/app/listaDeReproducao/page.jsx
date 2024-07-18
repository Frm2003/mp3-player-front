'use client';

import Carousel from '@/components/carousel';
import Modal from '@/components/modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import { ListaProvider } from '@/context/listContext';

const styleTitle = {
    alingItens: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5em'
}

export default function Home() {

    useEffect(() => {
        document.querySelector('#openModal').addEventListener('click', () => abrirModal())
    }, [])

    const [show, setShow] = useState(false);
    const abrirModal = () => setShow(true);
    const fecharModal = () => setShow(false);

    const content1 =
        <>
            <div key={1} style={styleTitle}>
                <h2>Lista de Reprodução</h2>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="m80-280 150-400h86l150 400h-82l-34-96H196l-32 96H80Zm140-164h104l-48-150h-6l-50 150Zm328 164v-76l202-252H556v-72h282v76L638-352h202v72H548ZM360-760l120-120 120 120H360ZM480-80 360-200h240L480-80Z" />
                </svg>
            </div>
        </>

    const content2 =
        <div key={0} style={styleTitle}>
            <h2>Lista de Reprodução</h2>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />
        </div>

    return (
        <ListaProvider>
            <Carousel contents={[content1, content2]} />
            <Modal show={show} funcFechar={fecharModal} />
        </ListaProvider>
    );
}
