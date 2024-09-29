import DisplayAudio from '@/components/client/displayAudio';
import Nav from '@/components/nav';
import { EstadosMusicaProvider } from '@/components/contexts/estadoMusicaContext';
import { ListaProvider } from '@/components/contexts/listaContext';

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
