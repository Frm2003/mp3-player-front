import MenuMobile from '@/components/menuMobile';
import ModalFiles from '@/components/ModalFiles';
import Caurosel from '@/layout/Caurosel';
import Modal from '@/layout/Modal';
import ListMp3Files from '@/components/ListMp3Files';
import { ListFileProvider } from '@/context/ListFileContext';
import PlayerControl from '@/components/PlayerControl';

export default function Page() {
    const firstPage = (
        <Modal.Provider>
            <ListFileProvider>
                <ListMp3Files />
                <ModalFiles />
            </ListFileProvider>
        </Modal.Provider>
    );

    return (
        <>
            <Caurosel.Body id={'s1'}>
                {firstPage}
                <div>teste b</div>
            </Caurosel.Body>
            <PlayerControl />
            <MenuMobile />
        </>
    );
}
