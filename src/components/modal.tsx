import { useRef, RefObject } from 'react';
import {
    faClose,
    faBackward,
    faForward,
    faPlay,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useList } from '@/contexts/listaContext';
import Musica from '@/lib/classeMusica';
import modalStyle from '@/styles/modal.module.css';

interface iProps {
    show: boolean;
    funcFechar: () => void;
}

export function Modal({ show, funcFechar }: iProps) {
    const modalRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const { lista } = useList();

    const fecharModal = () => {
        if (modalRef.current) {
            const animation = modalRef.current.animate(
                [{ marginTop: '0%' }, { marginTop: '-300%' }],
                {
                    duration: 250,
                    fill: 'forwards',
                }
            );

            animation.onfinish = () => funcFechar();
        }
    };

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

            fecharModal();
        }
    };

    const html = (
        <section ref={modalRef} className={modalStyle.layout}>
            <article>
                <div style={{ textAlign: 'right' }}>
                    <FontAwesomeIcon
                        icon={faClose}
                        size="2x"
                        onClick={fecharModal}
                    />
                </div>
                <h2>Upload de arquivos</h2>
                <div className={modalStyle.btn}>
                    <label htmlFor="filesInput">Selecione os Arquivos</label>
                </div>
                <input
                    id="filesInput"
                    type="file"
                    multiple
                    onChange={fileSelect}
                />
            </article>
        </section>
    );

    return show ? html : null;
}

export function ModalBottom({ show, funcFechar }: iProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const fecharModal = () => {
        if (modalRef.current) {
            const animation = modalRef.current.animate(
                [{ bottom: '0%' }, { bottom: '-500px' }],
                {
                    duration: 250,
                    fill: 'forwards',
                }
            );

            animation.onfinish = () => funcFechar();
        }
    };

    const html = (
        <section className={modalStyle.layout2}>
            <article ref={modalRef}>
                <FontAwesomeIcon
                    className={modalStyle.icone}
                    icon={faChevronDown}
                    onClick={() => fecharModal()}
                />
                <div className={modalStyle.botoes}>
                    <span>
                        <FontAwesomeIcon icon={faBackward} />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faPlay} />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faForward} />
                    </span>
                </div>
                <div className={modalStyle.tempo}>
                    <input type={'range'} />
                    <div>
                        <p>0:00</p>
                        <p>0:00</p>
                    </div>
                </div>
            </article>
        </section>
    );

    return show ? html : null;
}
