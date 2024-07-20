import listaStyle from '@/styles/lista.module.css';

import { tocar } from '@/lib/funcoesDeAudio.';
import { useEstadosMusica } from '@/context/estadoMusicaContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useLayoutEffect, useRef } from 'react';

const calcHeight = (height, soma) => {
	height.forEach((e) => {
		soma += e;
	});
	return `${window.innerHeight - (soma + 20)}px`;
};

export default function Lista({ list, height }) {
	const { info, setInfo } = useEstadosMusica();
	const listRef = useRef(null);

	useLayoutEffect(() => {
		listRef.current.style.height = calcHeight(height, 0);
		window.addEventListener(
			'resize',
			() => (listRef.current.style.height = calcHeight(height, 0))
		);
	}, []);

	return (
		<ul className={listaStyle.body} ref={listRef}>
			{list.map((musica, index) => (
				<li key={index}>
					<div>
						<FontAwesomeIcon
							icon={musica.tipo == 'arquivo' ? faFileAudio : null}
						/>
					</div>
					<div
						onClick={() => tocar(musica, info.audioAtual, setInfo)}
					>
						<h3>{musica.nome.replace('.mp3', '')}</h3>
						<p>{musica.artista}</p>
					</div>
					<div>
						<FontAwesomeIcon icon={faEllipsisH} />
					</div>
				</li>
			))}
		</ul>
	);
}
