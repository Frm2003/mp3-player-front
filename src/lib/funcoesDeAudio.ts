import type Musica from './classeMusica';

interface iControleMusica {
    estado: 'pausado' | 'tocando';
    audioAtual: HTMLAudioElement | undefined;
    musicaAtual: Musica | undefined;
    duracao: string | undefined;
}

export function tocar(
    musica: Musica,
    audioAtual: HTMLAudioElement | undefined,
    setInfo: React.Dispatch<React.SetStateAction<iControleMusica>>
): void {
    if (audioAtual) audioAtual.pause();

    const audio = new Audio(musica.caminho);
    audio.play();

    setInfo({
        estado: 'tocando',
        audioAtual: audio,
        musicaAtual: musica,
        duracao: '',
    });

    audio.addEventListener('ended', () => avancar(musica, audioAtual, setInfo));
}

export function avancar(
    musica: Musica,
    audioAtual: HTMLAudioElement | undefined,
    setInfo: React.Dispatch<React.SetStateAction<iControleMusica>>
): void {
    if (musica.proximo == undefined) {
        while (musica.anterior != undefined) {
            musica = musica.anterior;
        }
        tocar(musica, audioAtual, setInfo);
        return;
    }
    tocar(musica.proximo, audioAtual, setInfo);
}

export function voltar(
    musica: Musica,
    audioAtual: HTMLAudioElement | undefined,
    setInfo: React.Dispatch<React.SetStateAction<iControleMusica>>
): void {
    if (musica.anterior == undefined) {
        while (musica.proximo != undefined) {
            musica = musica.proximo;
        }
        tocar(musica, audioAtual, setInfo);
        return;
    }
    tocar(musica.anterior, audioAtual, setInfo);
}
