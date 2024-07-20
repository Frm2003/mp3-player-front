'use client';

import Carousel from '@/components/carousel';
import Lista from '@/components/lista';
import Modal from '@/components/modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMagnifyingGlass,
	faArrowDownAZ,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import { useList } from '@/context/listaContext';

const styleTitle = {
	alingItens: 'center',
	display: 'flex',
	justifyContent: 'space-between',
	padding: '0.5em',
};

const contentCaurosel1 = () => {
	const { lista } = useList();

	const [navComponent, setNavComponent] = useState(null);
	const [h2Component, setH2Component] = useState(null);
	const [displayComponent, setDisplayComponent] = useState(null);

	useEffect(() => {
		setNavComponent(document.querySelector('nav'));
		setH2Component(document.querySelector('h2'));
		setDisplayComponent(document.querySelector('#displayAudio'));
	}, []);

	return (
		<>
			<div style={styleTitle}>
				<h2>Lista de Reprodução</h2>
				<FontAwesomeIcon icon={faArrowDownAZ} size="2x" />
			</div>
			{navComponent && (
				<Lista
					list={lista.selectAll()}
					height={[
						navComponent.clientHeight,
						h2Component.clientHeight,
						displayComponent.clientHeight,
					]}
				/>
			)}
		</>
	);
};

const contentCaurosel2 = () => {
	return (
		<>
			<div style={styleTitle}>
				<h2>Lista de Reprodução</h2>
				<FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />
			</div>
		</>
	);
};

export default function Home() {
	useEffect(() => {
		document
			.querySelector('#openModal')
			.addEventListener('click', () => abrirModal());
	}, []);

	const [show, setShow] = useState(false);
	const abrirModal = () => setShow(true);
	const fecharModal = () => setShow(false);

	return (
		<>
			<Carousel contents={[contentCaurosel1(), contentCaurosel2()]} />
			<Modal show={show} funcFechar={fecharModal} />
		</>
	);
}
