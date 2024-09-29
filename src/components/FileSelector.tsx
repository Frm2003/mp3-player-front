import { CSSProperties } from 'react';
import Musica from '@/lib/classeMusica';

import { useList } from './contexts/listaContext';

const styleBtn: CSSProperties = {
    border: '2px solid',
    borderRadius: '10px',
    padding: '0.5em 1.5em',
};

export default function FileSelector({
    funcFechar,
}: {
    funcFechar: () => void;
}) {
    const { lista } = useList();

    const fileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const fileName = files[i].name;
                const info = fileName.split('-').map((part) => part.trim());

                const musica = new Musica(
                    info.length > 2 ? info[2].trim() : info[1].trim(),
                    info.length > 2 ? info[1] : undefined,
                    info[0],
                    URL.createObjectURL(files[i]),
                    'arquivo'
                );

                lista.add(musica);
            }
            funcFechar();
        }
    };

    return (
        <article>
            <h2>Upload de arquivos</h2>
            <div style={styleBtn}>
                <label htmlFor="filesInput">Selecione os Arquivos</label>
            </div>
            <input id="filesInput" type="file" multiple onChange={fileSelect} />
        </article>
    );
}
