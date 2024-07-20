import Nav from '@/components/nav';
import DisplayAudio from '@/components/displayAudio';

import { ListaProvider } from '@/context/listaContext';
import { EstadosMusicaProvider } from '@/context/estadoMusicaContext';

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
