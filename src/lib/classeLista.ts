import type Musica from './classeMusica';

export default class Lista {
    primeiro: Musica | undefined;
    ultimo: Musica | undefined;
    tamanho: number;

    constructor() {
        this.primeiro = undefined;
        this.ultimo = undefined;
        this.tamanho = 0;
    }

    add(musica: Musica): void {
        if (this.primeiro === undefined) {
            this.primeiro = musica;
            this.ultimo = musica;
        } else if (this.ultimo !== undefined) {
            this.ultimo.setProximo(musica);
            musica.setAnterior(this.ultimo);
            this.ultimo = musica;
        }

        this.tamanho += 1;
    }

    selectAll(): Musica[] {
        const array: Musica[] = [];
        if (!this.isEmpty()) {
            let x: Musica | undefined = this.primeiro;
            while (x !== undefined) {
                array.push(x);
                x = x.proximo;
            }
        }
        return array;
    }

    length(): number {
        return this.tamanho;
    }

    isEmpty(): boolean {
        return this.primeiro === undefined;
    }

    mergeSort(): void {
        const dividirLista = (
            inicio: Musica | undefined
        ): Musica | undefined => {
            if (inicio === undefined || inicio.proximo === undefined) {
                return inicio;
            }

            const meio = encontrarMeio(inicio);
            const segundaMetade = meio.proximo;
            meio.proximo = undefined;
            if (segundaMetade !== undefined) {
                segundaMetade.anterior = undefined;
            }

            return merge(dividirLista(inicio), dividirLista(segundaMetade));
        };

        const encontrarMeio = (inicio: Musica): Musica => {
            let lento: Musica = inicio;
            let rapido: Musica | undefined = inicio;

            while (
                rapido !== undefined &&
                rapido.proximo !== undefined &&
                rapido.proximo.proximo !== undefined
            ) {
                lento = lento.proximo!;
                rapido = rapido.proximo.proximo;
            }

            return lento;
        };

        const merge = (
            lista1: Musica | undefined,
            lista2: Musica | undefined
        ): Musica | undefined => {
            if (lista1 === undefined) return lista2;
            if (lista2 === undefined) return lista1;

            let resultado: Musica;
            if (lista1.artista.localeCompare(lista2.artista) < 0) {
                resultado = lista1;
                resultado.proximo = merge(lista1.proximo, lista2);
            } else {
                resultado = lista2;
                resultado.proximo = merge(lista1, lista2.proximo);
            }

            if (resultado.proximo !== undefined) {
                resultado.proximo.anterior = resultado;
            }
            return resultado;
        };

        if (this.primeiro !== undefined) {
            this.primeiro = dividirLista(this.primeiro);

            let atual: Musica | undefined = this.primeiro;
            while (atual !== undefined && atual.proximo !== undefined) {
                atual = atual.proximo;
            }
            this.ultimo = atual;
        }
    }
}
