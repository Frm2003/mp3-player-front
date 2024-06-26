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
}

export default Lista

/*
    let ant = this.primeiro, pos = 0

            while (pos < value - 1) {
                ant = ant.proximo
                pos += 1;
            } 
           
            let remove = ant.proximo
            ant.proximo = remove.proximo
            remove.proximo = null
*/