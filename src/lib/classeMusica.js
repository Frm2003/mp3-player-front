class Musica {
	nome;
	album;
	artista;
	caminho;
	playlist;
	anterior;
	proximo;

	constructor(nome, album, artista, caminho) {
		this.nome = nome;
		this.album = album;
		this.artista = artista;
		this.caminho = caminho;
		this.playlist = [];
		this.anterior = null;
		this.proximo = null;
	}

	setAnterior(anterior) {
		this.anterior = anterior;
	}

	setProximo(proximo) {
		this.proximo = proximo;
	}
}

export default Musica;
