export function tocar(musica, audioAtual, setInfo) {
    if (audioAtual) audioAtual.pause();

    const audio = new Audio(musica.caminho);
    audio.play();

    setInfo({estado: 'tocando', audioAtual: audio, musicaAtual: musica});

    audio.addEventListener('ended', () => avancar(musica, audioAtual, setInfo));
}

export function avancar(musica, audioAtual, setInfo) {
    if (musica.proximo == null) {
        while (musica.anterior != null) {
            musica = musica.anterior;
        }
        tocar(musica, audioAtual, setInfo);
        return;
    }
    tocar(musica.proximo, audioAtual, setInfo);
}

export function voltar(musica, audioAtual, setInfo) {
    if (musica.anterior == null) {
        while (musica.proximo != null) {
            musica = musica.proximo;
        }
        tocar(musica, audioAtual, setInfo);
        return;
    }
    tocar(musica.anterior, audioAtual, setInfo);
}
