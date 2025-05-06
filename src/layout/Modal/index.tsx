import ModalLayoutRoot from './ModalLayoutRoot';
import ModalLatoutTitle from './ModalLatoutTitle';
import ModalLayoutBody from './ModalLayoutBody';
import { ModalProvider } from './context/ModalContext';

const Modal = {
    Body: ModalLayoutBody,
    Root: ModalLayoutRoot,
    Title: ModalLatoutTitle,
    Provider: ModalProvider,
};

export default Modal;
