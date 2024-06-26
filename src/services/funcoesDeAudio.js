export function tocar(musica, controle) {
    if (controle.mudanca.var) return;

    controle.mudanca.set(true);

    if (controle.audioAtual.var) { controle.audioAtual.var.pause() }

    const audio = new Audio(musica.caminho)
    audio.play()
    
    controle.audioAtual.set(audio)
    controle.src.set(musica.caminho)
    controle.estado.set('tocando')
    controle.mudanca.set(false);

    audio.addEventListener('ended', () => avancar(musica, controle))
}

export function pausar(audioAtual, estado) {
    if (audioAtual) {
        audioAtual.pause()
        estado('pausado')
    }
}

export function continuar(audioAtual, estado) {
    if (audioAtual) {
        audioAtual.play()
        estado('tocando')
    }
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

/* 
export function pausar(audioAtual, setEstado) {
    if (audioAtual) {
        audioAtual.pause();
        setEstado('paused')
    }
}

export function continuar(audioAtual, setEstado) {
    if (audioAtual) {
        audioAtual.play();
        setEstado('playing')
    }
}

export function tocar(caminho, index, varDeControle) {
    if (varDeControle.mudanca.var) return;

    varDeControle.mudanca.set(true);

    if (varDeControle.audioAtual.var) { varDeControle.audioAtual.var.pause() }

    const audioMp3 = new Audio(caminho);

    audioMp3.addEventListener('loadedmetadata', () => {
        const duracaoSegundos = audioMp3.duration;
        const duracaoMinutos = Math.floor(duracaoSegundos / 60);
        const duracaoSegundosRestantes = Math.floor(duracaoSegundos % 60);
        varDeControle.duracaoTotal.set(`${duracaoMinutos}:${duracaoSegundosRestantes < 10 ? ("0" + duracaoSegundosRestantes) : duracaoSegundosRestantes}`)
        varDeControle.duracao.set(audioMp3.duration)
    });

    audioMp3.play();

    varDeControle.posicao.set(index);
    varDeControle.audioAtual.set(audioMp3);
    varDeControle.estado.set('playing');
    varDeControle.mudanca.set(false);
}

export function avancar(listaMusicas, varDeControle) {
    if (varDeControle.posicao.var >= listaMusicas.length - 1) {
        tocar(listaMusicas[0].caminho, 0, varDeControle)
        return
    }
    tocar(listaMusicas[varDeControle.posicao.var + 1].caminho, varDeControle.posicao.var + 1, varDeControle);
}

export function voltar(listaMusicas, varDeControle) {
    if (varDeControle.posicao.var <= 0) {
        tocar(listaMusicas[listaMusicas.length - 1].caminho, listaMusicas.length - 1, varDeControle);
        return
    }
    tocar(listaMusicas[varDeControle.posicao.var - 1].caminho, varDeControle.posicao.var - 1, varDeControle);
}
*/