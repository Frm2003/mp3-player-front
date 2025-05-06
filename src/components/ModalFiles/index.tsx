'use client';

import { ChangeEvent } from 'react';
import { useModalContext } from '@/layout/Modal/context/ModalContext';
import { useListFileContext } from '@/context/ListFileContext';
import Musica from '@/utils/Musica';
import Modal from '@/layout/Modal';

import style from './styles/style.module.css';

export default function ModalFiles() {
    const { setList } = useListFileContext();
    const { setShow } = useModalContext();

    const obterDuracao = (arquivo: string): Promise<number> => {
        return new Promise((resolve, reject) => {
            const audio = new Audio(arquivo);
            audio.onloadedmetadata = () => resolve(audio.duration);
            audio.onerror = () => reject('Erro ao carregar o arquivo');
        });
    };

    const loadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.target.files;

        if (files) {
            for (const file of files) {
                const [artista, nome] = file.name
                    .replace('.mp3', '')
                    .split('-');

                const arquivo = URL.createObjectURL(file);

                const duracao: number = await obterDuracao(arquivo);

                const musicaNova = new Musica(
                    nome,
                    '',
                    duracao,
                    artista,
                    arquivo,
                    'mp3'
                );

                setList((prevList: Musica[]) => [...prevList, musicaNova]);
            }

            setShow(false);
        }
    };

    return (
        <>
            <Modal.Root>
                <Modal.Title title={'Selecione os arquivos'} />
                <Modal.Body>
                    <div className={style.layout}>
                        <h4>Selecione os arquivos mp3 para reprodução</h4>
                        <label htmlFor={'files'}>
                            <p>Selecione os arquivos</p>
                        </label>
                        <input
                            id={'files'}
                            onChange={loadFile}
                            type={'file'}
                            multiple
                        />
                    </div>
                </Modal.Body>
            </Modal.Root>
        </>
    );
}
