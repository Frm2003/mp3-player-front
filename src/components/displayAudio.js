'use client';

import displayStyle from '@/styles/display.module.css';
import { useEstadosMusica } from '@/context/estadoMusicaContext';

import { useLayoutEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function DisplayAudio() {
	const displayRef = useRef();
	const { info } = useEstadosMusica();

	useLayoutEffect(() => {
		displayRef.current.style.bottom =
			document.querySelector('nav').clientHeight;
	}, []);

	return (
		<section
			id="displayAudio"
			className={displayStyle.body}
			ref={displayRef}
		>
			<article>
				<div className={displayStyle.aling}>
					<div className={displayStyle.text}>
						<h3>
							{info.musicaAtual
								? info.musicaAtual.nome.replace('.mp3', '')
								: 'Selecione uma musica'}
						</h3>
						<p>
							{info.musicaAtual
								? info.musicaAtual.artista
								: '...'}
						</p>
					</div>
					<div className={displayStyle.icon}>
						<FontAwesomeIcon
							icon={info.estado == 'pausado' ? faPause : faPlay}
							size="2x"
						/>
					</div>
				</div>
				<progress />
			</article>
		</section>
	);
}
