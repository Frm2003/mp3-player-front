export function tocar(musica, control) {
    if (control.audioAtual.var) { control.audioAtual.var.pause() }

    const urlAudio = URL.createObjectURL(musica.caminho)
    const audio = new Audio(urlAudio)
    audio.play()

    control.audioAtual.set(audio)
    control.musicaAtual.set(musica)
    control.estadoMusica.set('tocando')

    audio.addEventListener('ended', () => avancar(musica, control))
}

export function avancar(musica, controle) {
    if (musica.proximo == null) {
        while (musica.anterior != null) { musica = musica.anterior }
        tocar(musica, controle)
        return
    }
    tocar(musica.proximo, controle)
}

export function voltar(musica, controle) {
    if (musica.anterior == null) {
        while (musica.proximo != null) { musica = musica.proximo }
        tocar(musica, controle)
        return
    }
    tocar(musica.anterior, controle)
}