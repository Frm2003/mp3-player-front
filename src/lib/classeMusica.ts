class Musica {
    //BASICOS
    nome: string;
    album: string | undefined;
    artista: string;
    caminho: string;
    tipo: string;
    //EXPERIMENTAL;
    playlist: Array<number>;
    anterior: Musica | undefined;
    proximo: Musica | undefined;

    constructor(
        nome: string,
        album: string | undefined,
        artista: string,
        caminho: string,
        tipo: string
    ) {
        this.nome = nome;
        this.album = album;
        this.artista = artista;
        this.caminho = caminho;
        this.tipo = tipo;
        this.playlist = [];
        this.anterior = undefined;
        this.proximo = undefined;
    }

    setAnterior(anterior: Musica): void {
        this.anterior = anterior;
    }

    setProximo(proximo: Musica): void {
        this.proximo = proximo;
    }
}

export default Musica;
