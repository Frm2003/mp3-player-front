export function tocar(musica, audioAtual, setInfo) {
	if (audioAtual) audioAtual.pause();

	const audio = new Audio(musica.caminho);
	audio.play();

	const newState = {
		estado: 'tocando',
		audioAtual: audio,
		musicaAtual: musica,
	};

	setInfo(newState);
}
