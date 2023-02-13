import styles from "../styles/LeftPanel.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faEllipsisVertical,
  faInbox,
  faPen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faClock,
  faFile,
  faStar,
} from "@fortawesome/free-regular-svg-icons";

import { useSelector } from "react-redux";

import Link from "next/link";

export default function LeftPanel() {
  const activeTab = useSelector((state) => state.activeTabs.value);
  const allMails = useSelector((state) => state.allMails.value);

  let importantLength = 0;
  let unReadLength = 0;
  let followedLength = 0;
  let onHoldLength = 0;

  for (let email of allMails) {
    if (email.important) {
      importantLength++;
    }
    if (email.unRead) {
      unReadLength++;
    }
    if (email.followed) {
      followedLength++;
    }
    if (email.onHold) {
      onHoldLength++;
    }
  }

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
              <div
                className={styles.leftTabs}
                style={
                  activeTab === "MainBox" ? { backgroundColor: "#d3e3fd" } : {}
                }
              >
                <div className={styles.tabLabelIcon}>
                  <div className={styles.leftTabsIconContainer}>
                    <FontAwesomeIcon
                      icon={faInbox}
                      className={styles.iconLeftTab}
                    />
                  </div>
                  Boîte de réception
                </div>
                <span className={styles.counterLeft}>
                  {unReadLength > 0 ? unReadLength : ""}
                </span>
              </div>
            </Link>

            <Link href="/followedBox">
              <div
                className={styles.leftTabs}
                style={
                  activeTab === "FollowedBox"
                    ? { backgroundColor: "#d3e3fd" }
                    : {}
                }
              >
                <div className={styles.tabLabelIcon}>
                  <div className={styles.leftTabsIconContainer}>
                    <FontAwesomeIcon
                      icon={faStar}
                      className={styles.iconLeftTab}
                    />
                  </div>
                  Messages suivis
                </div>
                <span className={styles.counterLeft}>
                  {followedLength > 0 ? followedLength : ""}
                </span>
              </div>
            </Link>

            <Link href="/onHoldBox">
              <div
                className={styles.leftTabs}
                style={
                  activeTab === "OnHoldBox"
                    ? { backgroundColor: "#d3e3fd" }
                    : {}
                }
              >
                <div className={styles.tabLabelIcon}>
                  <div className={styles.leftTabsIconContainer}>
                    <FontAwesomeIcon
                      icon={faClock}
                      className={styles.iconLeftTab}
                    />
                  </div>
                  En attente
                </div>
                <span className={styles.counterLeft}>
                  {onHoldLength > 0 ? onHoldLength : ""}
                </span>
              </div>
            </Link>

            <Link href="/importantBox">
              <div
                className={styles.leftTabs}
                style={
                  activeTab === "ImportantBox"
                    ? { backgroundColor: "#d3e3fd" }
                    : {}
                }
              >
                <div className={styles.tabLabelIcon}>
                  <div className={styles.leftTabsIconContainer}>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={styles.iconLeftTab}
                    />
                  </div>
                  Important
                </div>
                <span className={styles.counterLeft}>
                  {importantLength > 0 ? importantLength : ""}
                </span>
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
