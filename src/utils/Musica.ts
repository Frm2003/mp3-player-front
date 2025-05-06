export default class Musica {
    nome: string;
    album: string | undefined;
    duracao: number;
    artista: string;
    arquivo: string;
    tipo: 'mp3' | 'youtube';

    constructor(
        nome: string,
        album: string | undefined,
        duracao: number,
        artista: string,
        arquivo: string,
        tipo: 'mp3' | 'youtube'
    ) {
        this.nome = nome;
        this.album = album;
        this.artista = artista;
        this.arquivo = arquivo;
        this.duracao = duracao;
        this.tipo = tipo;
    }
}
