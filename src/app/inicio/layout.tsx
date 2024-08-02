import DisplayAudio from '@/components/displayAudio';
import Nav from '@/components/nav';
import { EstadosMusicaProvider } from '@/contexts/estadoMusicaContext';
import { ListaProvider } from '@/contexts/listaContext';

export default function ListaDeReproducaoLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
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
