import styles from "../styles/MainHeader.module.css";
import Image from 'next/image';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBars,
  faCaretDown,
  faCircle,
  faCircleChevronDown,
  faCircleInfo,
  faEllipsisVertical,
  faGear,
  faInbox,
  faMagnifyingGlass,
  faPaperclip,
  faPen,
  faPlus,
  faRotateRight,
  faSliders,
  faTag,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faClock,
  faFile,
  faSquare,
  faStar,
} from "@fortawesome/free-regular-svg-icons";

export default function MainHeader() {

    return(
        <div>
            <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.divBarsIcon}>
              <FontAwesomeIcon icon={faBars} className={styles.iconBars} />
            </div>

            <Image src= '/../public/logo_gmail.png'
            alt='logo'
            width={109}
            height={40}
            />
          </div>

          <div className={styles.headerMid}>
            <div className={styles.searchBar}>
              <div className={styles.iconsRight}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className={styles.iconsItems}
                />
              </div>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Rechercher dans les messages"
              />
              <div className={styles.iconsRight}>
                <FontAwesomeIcon
                  icon={faSliders}
                  className={styles.iconsItems}
                />
              </div>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon
                icon={faCircleInfo}
                className={styles.iconsItems}
              />
            </div>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon icon={faGear} className={styles.iconsItems} />
            </div>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon
                icon={faCircleChevronDown}
                className={styles.iconsItems}
              />
            </div>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon icon={faUser} className={styles.iconsItems} />
            </div>
          </div>
        </header>
        </div>
    )
}