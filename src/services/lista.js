class Lista {
    primeiro;
    ultimo;
    tamanho;

    constructor() {
        this.primeiro = null
        this.ultimo = null
        this.tamanho = 0
    }

    add(musica) {
        if (this.primeiro == null) {
            this.primeiro = musica
            this.ultimo = musica
            return
        }

        this.ultimo.setProximo(musica)
        musica.setAnterior(this.ultimo)
        this.ultimo = musica

        this.tamanho += 1
    }

    remove(value) {
        if (!this.isEmpty()) {
            if (value == 0) {
                this.primeiro = this.primeiro.proximo
                return
            }

            let x = this.primeiro, pos = 0

            while (pos < value) { x = x.proximo; pos += 1 }

            let ant = x.anterior
            let prox = x.proximo

            ant.setProximo(prox)
            prox.setAnterior(ant)
        }
    }

    selectByPos(value) {
        let x = this.primeiro
        if (!this.isEmpty()) {
            while (x.caminho.localeCompare(value)) {
                x = x.proximo
            }
        }
        return x
    }

    selectAll() {
        const array = [];
        if (!this.isEmpty()) {
            for (let x = this.primeiro; x != null; x = x.proximo) {
                array.push(x)
            }
        }
        return array;
    }

    length() {
        return this.tamanho
    }

    isEmpty() {
        return this.primeiro == null
    }

    mergeSort() {
        // Função auxiliar para dividir a lista ao meio
        const dividirLista = (inicio) => {
            if (!inicio || !inicio.proximo) {
                return inicio;
            }

            let meio = encontrarMeio(inicio);
            let segundaMetade = meio.proximo;
            meio.proximo = null;
            segundaMetade.anterior = null;

            return merge(dividirLista(inicio), dividirLista(segundaMetade));
        };

        // Função auxiliar para encontrar o meio da lista
        const encontrarMeio = (inicio) => {
            let rapido = inicio;
            let lento = inicio;
            while (rapido && rapido.proximo && rapido.proximo.proximo) {
                lento = lento.proximo;
                rapido = rapido.proximo.proximo;
            }
            return lento;
        };

        // Função auxiliar para mesclar duas listas ordenadas
        const merge = (lista1, lista2) => {
            if (!lista1) return lista2;
            if (!lista2) return lista1;

            let resultado;
            if (lista1.artista.localeCompare(lista2.artista) < 0) {
                resultado = lista1;
                resultado.proximo = merge(lista1.proximo, lista2);
            } else {
                resultado = lista2;
                resultado.proximo = merge(lista1, lista2.proximo);
            }

            resultado.proximo.anterior = resultado;
            return resultado;
        };

        // Iniciar o Merge Sort na lista
        this.primeiro = dividirLista(this.primeiro);

        // Encontrar o último nó após a ordenação
        let atual = this.primeiro;
        while (atual && atual.proximo) {
            atual = atual.proximo;
        }
        this.ultimo = atual;
    }
}

export default Lista
