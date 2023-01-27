import styles from "../styles/RightPanel.module.css";

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

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import { mailList } from "../data/mailData";

import FullMail from "./FullMail";
import RowMail from "./RowMail";

export default function MainBox() {
  const dispatch = useDispatch();

  // const displayedMail = <FullMail {...fullMailToDisplay} />;

  const inbox = mailList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });
  return (
    <div>
      <div className={styles.rightPanel}>
        {/* inbox header --------------------- */}
        <div className={styles.inboxHeader}>
          <div className={styles.leftControls}>
            <div className={styles.selectBox}>
              <div className={styles.checkBox}>
                <FontAwesomeIcon
                  icon={faSquare}
                  className={styles.iconsLeftControl}
                />
              </div>
              <div className={styles.iconCaretDown}>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className={styles.iconsLeftControl}
                />
              </div>
            </div>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon
                icon={faRotateRight}
                className={styles.iconsLeftControl}
              />
            </div>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className={styles.iconsLeftControl}
              />
            </div>
          </div>
        </div>

        {/* mails Panel --------------------- */}
        <div className={styles.mailsPanel}>
          {/* categories tabs --------------------- */}
          <div className={styles.tabContainer}>
            <div className={styles.tabItem}>
              <div className={styles.tabIcon}>
                <FontAwesomeIcon icon={faInbox} />
              </div>
              <span>Principale</span>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.tabIcon}>
                <FontAwesomeIcon icon={faTag} />
              </div>
              <span>Promotions</span>
            </div>
            <div className={styles.tabItem}>
              <div className={styles.tabIcon}>
                <FontAwesomeIcon icon={faUserGroup} />
              </div>
              <span>Réseaux sociaux</span>
            </div>
          </div>

          {/* mails container ---------------------- */}
          <div className={styles.mailsContainer}>{inbox}</div>
        </div>
      </div>
    </div>
  );
}
