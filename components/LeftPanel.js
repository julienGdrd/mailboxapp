import styles from "../styles/LeftPanel.module.css";

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

import { resetMailToDisplay } from "../reducers/mailDisplayer";
import { useDispatch } from "react-redux";
import Link from "next/link";
export default function LeftPanel() {
  const dispatch = useDispatch();
  return (
    <div>
      <div className={styles.leftPanel}>
        <div className={styles.newMessageBtn}>
          <div>
            <FontAwesomeIcon
              icon={faPen}
              className={styles.iconNewMessageBtn}
            />
            <span>Nouveau message</span>
          </div>
        </div>

        {/* left selectors primary --------------------- */}
        <div className={styles.sideNavigator}>
          <div className={styles.primaryLeftSelectorsContainer}>
            <Link href="/">
              <div className={styles.leftTabs}>
                <div className={styles.tabLabelIcon}>
                  <div className={styles.leftTabsIconContainer}>
                    <FontAwesomeIcon
                      icon={faInbox}
                      className={styles.iconLeftTab}
                    />
                  </div>
                  Boîte de réception
                </div>
                <span className={styles.counterLeft}></span>
              </div>
            </Link>

            <div className={styles.leftTabs}>
              <div className={styles.tabLabelIcon}>
                <div className={styles.leftTabsIconContainer}>
                  <FontAwesomeIcon
                    icon={faStar}
                    className={styles.iconLeftTab}
                  />
                </div>
                Messages suivis
              </div>
            </div>

            <div className={styles.leftTabs}>
              <div className={styles.tabLabelIcon}>
                <div className={styles.leftTabsIconContainer}>
                  <FontAwesomeIcon
                    icon={faClock}
                    className={styles.iconLeftTab}
                  />
                </div>
                En attente
              </div>
            </div>

            <Link href="/importantBox">
              <div className={styles.leftTabs}>
                <div className={styles.tabLabelIcon}>
                  <div className={styles.leftTabsIconContainer}>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={styles.iconLeftTab}
                    />
                  </div>
                  Important
                </div>
              </div>
            </Link>
            <div className={styles.leftTabs}>
              <div className={styles.tabLabelIcon}>
                <div className={styles.leftTabsIconContainer}>
                  <FontAwesomeIcon
                    icon={faFile}
                    className={styles.iconLeftTab}
                  />
                </div>
                Brouillons
              </div>
            </div>

            <div className={styles.leftTabs}>
              <div className={styles.tabLabelIcon}>
                <div className={styles.leftTabsIconContainer}>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.iconLeftTab}
                  />
                </div>
                Catégories
              </div>
            </div>

            <div className={styles.leftTabs}>
              <div className={styles.tabLabelIcon}>
                <div className={styles.leftTabsIconContainer}>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.iconLeftTab}
                  />
                </div>
                Plus
              </div>
            </div>
          </div>

          {/* left selectors secondary --------------------- */}
          <div className={styles.secondaryLeftSelectorsContainer}>
            <div className={styles.secondarySelectorTitle}>
              Libellés
              <div className={styles.iconsRight}>
                <FontAwesomeIcon icon={faPlus} className={styles.iconLeftTab} />
              </div>
            </div>

            <div className={styles.leftTabs}>
              <div className={styles.tabLabelIcon}>
                <div className={styles.leftTabsIconContainer}>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className={styles.iconLeftTab}
                  />
                </div>
                Professionnel
              </div>
              <div className={styles.secondTabOptionIcon}>
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className={styles.iconLeftTab}
                />
              </div>
            </div>
            <div className={styles.leftTabs}>
              <div className={styles.tabLabelIcon}>
                <div className={styles.leftTabsIconContainer}>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className={styles.iconLeftTab}
                  />
                </div>
                Personnel
              </div>
              <div className={styles.secondTabOptionIcon}>
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className={styles.iconLeftTab}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
