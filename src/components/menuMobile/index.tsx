import {
    faFileAudio,
    faGear,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Caurosel from '@/layout/Caurosel';

import style from './styles/style.module.css';

export default function MenuMobile() {
    return (
        <nav className={style.layout}>
            <ul>
                <li>
                    <Caurosel.CustomControl id={'s1'} page={0}>
                        <FontAwesomeIcon icon={faFileAudio} size={'xl'} />
                    </Caurosel.CustomControl>
                </li>
                <li>
                    <Caurosel.CustomControl id={'s1'} page={1}>
                        <FontAwesomeIcon icon={faSearch} size={'xl'} />
                    </Caurosel.CustomControl>
                </li>
                <li>
                    <FontAwesomeIcon icon={faGear} size={'xl'} />
                </li>
            </ul>
        </nav>
    );
}
