import styles from "../styles/LeftPanel.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
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
  faStar,
} from "@fortawesome/free-regular-svg-icons";

import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";
import { useState } from "react";
import { updateSelectAll } from "../reducers/selectedMails";
import { setActiveTab } from "../reducers/leftTabs";

export default function LeftPanel() {
  const dispatch = useDispatch();

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

  for (let email of allMails) {
    if (email.important) {
      importantLength++;
    }
    if (email.unRead && !email.archived && !email.spam && !email.onHold) {
      unReadLength++;
    }
    if (email.followed) {
      followedLength++;
    }
    if (email.onHold) {
      onHoldLength++;
    }
    if (email.archived) {
      archivedLength++;
    }
    if (email.spam) {
      spamLength++;
    }
    if (email.pro) {
      proLength++;
    }
    if (email.perso) {
      persoLength++;
    }
    if (email.categorie === "principal" && email.unRead && !email.onHold) {
      principalLength++;
    }
    if (
      email.categorie === "promotion" &&
      email.unRead &&
      !email.onHold &&
      !email.spam
    ) {
      promotionLength++;
    }
    if (
      email.categorie === "reseaux" &&
      email.unRead &&
      !email.onHold &&
      !email.spam
    ) {
      reseauxLength++;
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
                  style={activeTab === "SpamBox" ? activeTabStyle : {}}
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
                style={activeTab === "ProBox" ? activeTabStyle : {}}
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
                style={activeTab === "PersoBox" ? activeTabStyle : {}}
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
