import styles from "../styles/RightPanel.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faEllipsisVertical,
  faInbox,
  faRotateRight,
  faTag,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setAllMailsList } from "../reducers/allMails";
import { setActiveTab } from "../reducers/leftTabs";
import { addCurrentList } from "../reducers/currentMailList";


import RowMail from "./RowMail";

export default function PromotionBox() {
  const dispatch = useDispatch();

  const allMails = useSelector((state) => state.allMails.value);

  

  let promotionList = [];
  let promotionUnReadCounter = 0;

  for (let mail of allMails) {
    if (!mail.archived) {
      if (mail.categorie === "promotion") {
        promotionList.push(mail);
        if (mail.unRead) {
          promotionUnReadCounter++;
        }
      }
    }
  }
  
  dispatch(addCurrentList(promotionList));

  let tableMail = promotionList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });

  return (
    <div className={styles.rightPanel}>
      <div className={styles.mailsPanel}>
        <div className={styles.mailsContainer}>{tableMail}</div>
      </div>
    </div>
  );
}
