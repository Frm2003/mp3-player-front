class Musica {
    anterior;
    proximo;

    constructor(nome, album, artista, arquivo, caminho) {
        this.nome = nome;
        this.album = album;
        this.artista = artista;
        this.arquivo = arquivo;
        this.caminho = caminho;
        this.anterior = null;
        this.proximo = null;
    }

    setAnterior(anterior) {
        this.anterior = anterior
    }

    setProximo(proximo) {
        this.proximo = proximo
    }

    serialize() {
        return {
            nome: this.nome,
            album: this.album,
            artista: this.artista,
            caminho: this.caminho
        };
    }
}

export default Musica