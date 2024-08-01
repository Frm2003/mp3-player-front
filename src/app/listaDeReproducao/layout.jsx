import DisplayAudio from '@/components/displayAudio';
import Nav from '@/components/nav';
import { EstadosMusicaProvider } from '@/context/estadoMusicaContext';
import { ListaProvider } from '@/context/listaContext';

export default function ListaDeReproducaoLayout({ children }) {
    return (
        <ListaProvider>
            <EstadosMusicaProvider>
                {children}
                <DisplayAudio />
            </EstadosMusicaProvider>
            <Nav />
        </ListaProvider>
    );
}
