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

export default function PrincipalBox() {
  const dispatch = useDispatch();

  const allMails = useSelector((state) => state.allMails.value);

  let principalList = [];

  for (let mail of allMails) {
    if (!mail.archived) {
      if (mail.categorie === "principal") {
        principalList.push(mail);
      }
    }
  }

  useEffect(() => {
    dispatch(addCurrentList(principalList));
  }, [allMails]);

  let tableMail = principalList.map((mail, i) => {
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
