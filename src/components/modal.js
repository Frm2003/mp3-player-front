import Musica from '@/lib/classeMusica';
import modalStyle from '@/styles/modal.module.css';

import { useRef } from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useList } from '@/context/listContext';

export default function Modal({ show, funcFechar }) {
	const modalRef = useRef(null);
	const { lista } = useList();

	const fecharModal = () => {
		let animation = modalRef.current.animate(
			[{ marginTop: '0%' }, { marginTop: '-300%' }],
			{
				duration: 250,
				fill: 'forwards',
			}
		);

		animation.onfinish = () => funcFechar();
	};

	const fileSelect = (event) => {
		const files = event.target.files;

		for (let i = 0; i < files.length; i++) {
			const fileName = files[i].name;
			const info = fileName.split('-').map((part) => part.trim());

			const musica = new Musica(
				info.length > 2 ? info[2].trim() : info[1].trim(),
				info.length > 2 ? info[1] : null,
				info[0],
				URL.createObjectURL(files[i])
			);

			lista.add(musica);
		}

		console.log(lista.selectAll())

		fecharModal();
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
