import type Musica from './classeMusica';

interface iControleMusica {
    estado: 'pausado' | 'tocando';
    audioAtual: HTMLAudioElement | undefined;
    musicaAtual: Musica | undefined;
    duracao: number | undefined;
}

export function tocar(
    musica: Musica | undefined,
    audioAtual: HTMLAudioElement | undefined,
    setInfo: React.Dispatch<React.SetStateAction<iControleMusica>>
): void {
    if (audioAtual) audioAtual.pause();

    let audio: HTMLAudioElement | undefined = undefined;

    if (musica != undefined) {
        audio = new Audio(musica.caminho);
        audio.play();
        audio.addEventListener('ended', () =>
            avancar(musica, audioAtual, setInfo)
        );
        audio.addEventListener('loadedmetadata', () => {
            setInfo({
                estado: 'tocando',
                audioAtual: audio,
                musicaAtual: musica,
                duracao: audio?.duration,
            });
        });
    }
}

export function avancar(
    musica: Musica | undefined,
    audioAtual: HTMLAudioElement | undefined,
    setInfo: React.Dispatch<React.SetStateAction<iControleMusica>>
): void {
    if (musica) {
        if (musica.proximo == undefined) {
            while (musica.anterior != undefined) {
                musica = musica.anterior;
            }
            tocar(musica, audioAtual, setInfo);
            return;
        }
        tocar(musica.proximo, audioAtual, setInfo);
    }
}

export function voltar(
    musica: Musica | undefined,
    audioAtual: HTMLAudioElement | undefined,
    setInfo: React.Dispatch<React.SetStateAction<iControleMusica>>
): void {
    if (musica) {
        if (musica.anterior == undefined) {
            while (musica.proximo != undefined) {
                musica = musica.proximo;
            }
            tocar(musica, audioAtual, setInfo);
            return;
        }
        tocar(musica.anterior, audioAtual, setInfo);
    }
}

export const pausar = (
    info: iControleMusica,
    setInfo: React.Dispatch<React.SetStateAction<iControleMusica>>
): void => {
    setInfo({
        estado: 'pausado',
        audioAtual: info.audioAtual,
        musicaAtual: info.musicaAtual,
        duracao: info.duracao,
    });
};

export const continuar = (
    info: iControleMusica,
    setInfo: React.Dispatch<React.SetStateAction<iControleMusica>>
): void => {
    setInfo({
        estado: 'tocando',
        audioAtual: info.audioAtual,
        musicaAtual: info.musicaAtual,
        duracao: info.duracao,
    });
};
