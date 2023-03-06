import styles from "../styles/RightPanel.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faTag,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectAll } from "../reducers/selectedMails";

export default function TabContainer(props) {
  const dispatch = useDispatch();

  const allMails = useSelector((state) => state.allMails.value);

  const [tab, setTab] = useState("principal");

  let principalUnReadCounter = 0;
  let promotionUnReadCounter = 0;
  let reseauxUnReadCounter = 0;

  for (let mail of allMails) {
    if (
      mail.unRead &&
      !mail.archived &&
      !mail.onHold &&
      !mail.spam &&
      !mail.pro &&
      !mail.perso
    ) {
      if (mail.principal) {
        principalUnReadCounter++;
      } else if (mail.promotion) {
        promotionUnReadCounter++;
      } else {
        reseauxUnReadCounter++;
      }
    }
  }

  return (
    <div className={styles.tabContainer}>
      <div
        className={styles.tabItem}
        onClick={() => {
          setTab("principal"),
            props.selectTab("principal"),
            tab !== "principal" && dispatch(updateSelectAll([]));
        }}
        style={
          tab === "principal"
            ? { color: "#0b57d0", borderBottom: "solid 2px #0b57d0" }
            : {}
        }
      >
        <div className={styles.tabIcon}>
          <FontAwesomeIcon icon={faInbox} />
        </div>
        <span>Principale</span>
        <span className={styles.unReadCounter}>
          {principalUnReadCounter > 0 ? principalUnReadCounter : ""}
        </span>
      </div>
      <div
        className={styles.tabItem}
        onClick={() => {
            setTab("promotion"),
            props.selectTab("promotion"),
            tab !== "promotion" && dispatch(updateSelectAll([]));
        }}
        style={
          tab === "promotion"
            ? { color: "#0b57d0", borderBottom: "solid 2px #0b57d0" }
            : {}
        }
      >
        <div className={styles.tabIcon}>
          <FontAwesomeIcon icon={faTag} />
        </div>
        <span>Promotions</span>
        <span className={styles.unReadCounter}>
          {promotionUnReadCounter > 0 ? promotionUnReadCounter : ""}
        </span>
      </div>
      <div
        className={styles.tabItem}
        onClick={() => {
          setTab("reseaux"),
            props.selectTab("reseaux"),
            tab !== "reseaux" && dispatch(updateSelectAll([]));
        }}
        style={
          tab === "reseaux"
            ? { color: "#0b57d0", borderBottom: "solid 2px #0b57d0" }
            : {}
        }
      >
        <div className={styles.tabIcon}>
          <FontAwesomeIcon icon={faUserGroup} />
        </div>
        <span>Réseaux sociaux</span>
        <span className={styles.unReadCounter}>
          {reseauxUnReadCounter > 0 ? reseauxUnReadCounter : ""}
        </span>
      </div>
    </div>
  );
}
