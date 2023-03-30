import styles from "../styles/LeftPanel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBoxArchive,
  faEllipsisVertical,
  faEnvelope,
  faInbox,
  faPen,
  faPlus,
  faTriangleExclamation,
  faAngleUp,
  faUserGroup,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faClock,
  faFile,
  faPaperPlane,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import { updateSelectAll } from "../reducers/selectedMails";
import { setActiveTab } from "../reducers/leftTabs";
import MailEditor from "./MailEditor";

export default function LeftPanel() {
  const dispatch = useDispatch();
  const [showModalMailEditor, setShowModalMailEditor] = useState(false);
  const activeTab = useSelector((state) => state.activeTabs.value);
  const allMails = useSelector((state) => state.allMails.value);
  const [moreTabs, setMoreTabs] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const activeTabStyle = {
    backgroundColor: "#d3e3fd",
    color: "black",
    fontWeight: "bold",
  };

  let importantLength = 0;
  let unReadLength = 0;
  let followedLength = 0;
  let onHoldLength = 0;
  let archivedLength = 0;
  let spamLength = 0;
  let proLength = 0;
  let persoLength = 0;
  let principalLength = 0;
  let promotionLength = 0;
  let reseauxLength = 0;
  let draftLength = 0;
  for (let email of allMails) {
    if (email.draft) {
      draftLength++;
    }
    if (email.important && email.unRead) {
      importantLength++;
    }
    if (email.unRead && !email.archived && !email.spam && !email.onHold) {
      unReadLength++;
    }
    if (email.followed && email.unRead && !email.archived) {
      followedLength++;
    }
    if (email.onHold && email.unRead) {
      onHoldLength++;
    }
    if (email.archived) {
      archivedLength++;
    }
    if (email.spam) {
      spamLength++;
    }
    if (email.unRead && email.pro && !email.archived) {
      proLength++;
    }
    if (email.unRead && email.perso && !email.archived) {
      persoLength++;
    }
    if (email.principal && email.unRead && !email.onHold && !email.archived) {
      principalLength++;
    }
    if (
      email.promotion &&
      email.unRead &&
      !email.onHold &&
      !email.spam &&
      !email.archived
    ) {
      promotionLength++;
    }
    if (
      email.reseaux &&
      email.unRead &&
      !email.onHold &&
      !email.spam &&
      !email.archived
    ) {
      reseauxLength++;
    }
  }

  const handleCloseModalMailEditor = () => {
    setShowModalMailEditor(false);
  };
  return (
    <div>
      {showModalMailEditor && (
        <>
          <MailEditor handleCloseModalMailEditor={handleCloseModalMailEditor} />
        </>
      )}

      <div className={styles.leftPanel}>
        <div
          className={styles.newMessageBtn}
          onClick={() => setShowModalMailEditor(true)}
        >
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
                style={activeTab === "MainBox" ? activeTabStyle : {}}
                onClick={() => dispatch(updateSelectAll([]))}
              >
                <div className={styles.tabLabelIcon}>
                  <div className={styles.leftTabsIconContainer}>
                    <FontAwesomeIcon
                      icon={faInbox}
                      className={styles.iconLeftTab}
                    />
                  </div>
                  <span
                    style={
                      unReadLength > 0
                        ? { color: "black", fontWeight: "bold" }
                        : {}
                    }
                  >
                    Boîte de réception
                  </span>
                </div>
                <span className={styles.counterLeft}>
                  {unReadLength > 0 ? unReadLength : ""}
                </span>
              </div>
            </Link>

            <Link href="/followedBox">
              <div
                className={styles.leftTabs}
                style={activeTab === "FollowedBox" ? activeTabStyle : {}}
                onClick={() => dispatch(updateSelectAll([]))}
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
                style={activeTab === "OnHoldBox" ? activeTabStyle : {}}
                onClick={() => dispatch(updateSelectAll([]))}
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
                style={activeTab === "ImportantBox" ? activeTabStyle : {}}
                onClick={() => dispatch(updateSelectAll([]))}
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
            <Link href="/sendedMailsBox">
              <div
                className={styles.leftTabs}
                style={activeTab === "SendedBox" ? activeTabStyle : {}}
                onClick={() => dispatch(updateSelectAll([]))}
              >
                <div className={styles.tabLabelIcon}>
                  <div className={styles.leftTabsIconContainer}>
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className={styles.iconLeftTab}
                    />
                  </div>
                  Messages envoyés
                </div>
              </div>
            </Link>
            <Link href="/draftBox">
              <div
                className={styles.leftTabs}
                style={activeTab === "draftBox" ? activeTabStyle : {}}
              >
                <div className={styles.tabLabelIcon}>
                  <div className={styles.leftTabsIconContainer}>
                    <FontAwesomeIcon
                      icon={faFile}
                      className={styles.iconLeftTab}
                    />
                  </div>
                  Brouillons
                </div>
                <span className={styles.counterLeft}>
                  {draftLength > 0 ? draftLength : ""}
                </span>
              </div>
            </Link>
            <div
              className={styles.leftTabs}
              onClick={() => setShowCategories(!showCategories)}
            >
              <div className={styles.tabLabelIcon}>
                <div className={styles.leftTabsIconContainer}>
                  <FontAwesomeIcon
                    icon={showCategories ? faAngleUp : faAngleDown}
                    className={styles.iconLeftTab}
                  />
                </div>
                Catégories
              </div>
            </div>
            <div
              style={
                showCategories ? { display: "block" } : { display: "none" }
              }
            >
              <Link href="/principalBox">
                <div
                  className={styles.leftTabs}
                  style={activeTab === "PrincipalBoxCat" ? activeTabStyle : {}}
                  onClick={() => {
                    dispatch(updateSelectAll([])),
                      dispatch(setActiveTab("PrincipalBoxCat"));
                  }}
                >
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon
                        icon={faInbox}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Principale
                  </div>
                  <span className={styles.counterLeft}>
                    {principalLength > 0 ? principalLength : ""}
                  </span>
                </div>
              </Link>
              <Link href="/promotionBox">
                <div
                  className={styles.leftTabs}
                  style={activeTab === "PromotionBoxCat" ? activeTabStyle : {}}
                  onClick={() => {
                    dispatch(updateSelectAll([])),
                      dispatch(setActiveTab("PromotionBoxCat"));
                  }}
                >
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon
                        icon={faTag}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Promotions
                  </div>
                  <span className={styles.counterLeft}>
                    {promotionLength > 0 ? promotionLength : ""}
                  </span>
                </div>
              </Link>
              <Link href="/reseauxBox">
                <div
                  className={styles.leftTabs}
                  style={activeTab === "ReseauxBoxCat" ? activeTabStyle : {}}
                  onClick={() => {
                    dispatch(updateSelectAll([])),
                      dispatch(setActiveTab("ReseauxBoxCat"));
                  }}
                >
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon
                        icon={faUserGroup}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Réseaux sociaux
                  </div>
                  <span className={styles.counterLeft}>
                    {reseauxLength > 0 ? reseauxLength : ""}
                  </span>
                </div>
              </Link>
            </div>

            <div
              className={styles.leftTabs}
              onClick={() => setMoreTabs(!moreTabs)}
            >
              <div className={styles.tabLabelIcon}>
                <div className={styles.leftTabsIconContainer}>
                  <FontAwesomeIcon
                    icon={moreTabs ? faAngleUp : faAngleDown}
                    className={styles.iconLeftTab}
                  />
                </div>
                {moreTabs ? "Moins" : "Plus"}
              </div>
            </div>

            <div style={moreTabs ? { display: "block" } : { display: "none" }}>
              <Link href="/archiveBox">
                <div
                  className={styles.leftTabs}
                  style={activeTab === "ArchiveBox" ? activeTabStyle : {}}
                  onClick={() => dispatch(updateSelectAll([]))}
                >
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon
                        icon={faBoxArchive}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Messages archivés
                  </div>
                  <span className={styles.counterLeft}>
                    {archivedLength > 0 ? archivedLength : ""}
                  </span>
                </div>
              </Link>
              <Link href="/spamBox">
                <div
                  className={styles.leftTabs}
                  style={activeTab === "spamBox" ? activeTabStyle : {}}
                  onClick={() => dispatch(updateSelectAll([]))}
                >
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon
                        icon={faTriangleExclamation}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Spam
                  </div>
                  <span className={styles.counterLeft}>
                    {spamLength > 0 ? spamLength : ""}
                  </span>
                </div>
              </Link>
              <Link href="/allMessagesBox">
                <div
                  className={styles.leftTabs}
                  style={activeTab === "AllMessagesBox" ? activeTabStyle : {}}
                  onClick={() => dispatch(updateSelectAll([]))}
                >
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Tous les messages
                  </div>
                </div>
              </Link>
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

            <Link href="/proBox">
              <div
                className={styles.leftTabs}
                style={activeTab === "proBox" ? activeTabStyle : {}}
                onClick={() => dispatch(updateSelectAll([]))}
              >
                <div className={styles.tabLabelIcon}>
                  <div className={styles.leftTabsIconContainer}>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={styles.iconLeftTab}
                    />
                  </div>
                  Professionnel
                </div>
                <span className={styles.labelCounter}>
                  {proLength > 0 ? proLength : ""}
                </span>
                <div className={styles.secondTabOptionIcon}>
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className={styles.iconLeftTab}
                  />
                </div>
              </div>
            </Link>

            <Link href="/persoBox">
              <div
                className={styles.leftTabs}
                style={activeTab === "persoBox" ? activeTabStyle : {}}
                onClick={() => dispatch(updateSelectAll([]))}
              >
                <div className={styles.tabLabelIcon}>
                  <div className={styles.leftTabsIconContainer}>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={styles.iconLeftTab}
                    />
                  </div>
                  Personnel
                </div>
                <span className={styles.labelCounter}>
                  {persoLength > 0 ? persoLength : ""}
                </span>
                <div className={styles.secondTabOptionIcon}>
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className={styles.iconLeftTab}
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
