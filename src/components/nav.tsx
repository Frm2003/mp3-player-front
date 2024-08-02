'use server';

import {
    faGear,
    faList,
    faMagnifyingGlass,
    faMusic,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import menuStyle from '@/styles/menu.module.css';

import { ItemCarousel } from './carousel';

export default async function Nav() {
    return (
        <nav className={menuStyle.menu}>
            <div>
                <ItemCarousel icon={faList} pos={3} />
                <ItemCarousel icon={faMusic} pos={0} />
                <button id="openModal">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <ItemCarousel icon={faMagnifyingGlass} pos={1} />
                <ItemCarousel icon={faGear} pos={4} />
            </div>
        </nav>
    );
}
