import Musica from "@/model/musica";
import modalStyle from "@/styles/modal.module.css"

import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Modal(fecharModal, lista, setListaMusicas) {
    const [loading, setLoading] = useState(false);

    function funcCarregaArqs(event) {
        const files = event.target.files;

        setLoading(true);

        for (let i = 0; i < files.length; i++) {
            const fileName = files[i].name;
            const info = fileName.split("-").map(part => part.trim());

            const musica = new Musica(
                info.length > 2 ? info[2].trim() : info[1].trim(), // nome
                info.length > 2 ? info[1] : '', // album
                info[0], // artista
                URL.createObjectURL(files[i]) // caminho do arquivo
            );

            lista.add(musica)
        }
        
        setTimeout(() => {
            setListaMusicas(lista.selectAll());
            setLoading(false);
            fecharModal();
        }, 1000);
    }

    return (
        <div className={modalStyle.layout} id="modal">
            <div className={modalStyle.modal}>
                <div className={modalStyle.modalHead}>
                    <label></label>
                    {
                        fecharModal != null && (
                            <span><FontAwesomeIcon icon={faXmark} onClick={fecharModal}></FontAwesomeIcon></span>
                        )
                    }
                </div>
                <div className={modalStyle.modalBody}>
                    <h2>Suba os arquivos aqui</h2>
                    <label htmlFor='fileInput'>Selecione os Arquivos</label>
                    <input type="file" id="fileInput" multiple onChange={(e) => { funcCarregaArqs(e) }} />
                </div>
            </div>
        </div>
    )
}