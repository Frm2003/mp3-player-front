import { ReactNode, RefObject, useRef } from 'react';
import modalStyle from '@/styles/modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export function Modal({
    show,
    content,
    funcFechar,
}: {
    show: boolean;
    content: ReactNode;
    funcFechar: () => void;
}) {
    const modalRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

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

    const html = (
        <section ref={modalRef} className={modalStyle.layout}>
            <div className={modalStyle.body}>
                <article style={{ textAlign: 'right' }}>
                    <FontAwesomeIcon
                        icon={faClose}
                        size="2x"
                        onClick={fecharModal}
                    />
                </article>
                {content}
            </div>
        </section>
    );

    return show ? html : null;
}
