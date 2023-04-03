import styles from "../styles/RightPanel.module.css";

import { useSelector, useDispatch } from "react-redux";

import { setActiveTab } from "../reducers/leftTabs";
import { addCurrentList } from "../reducers/currentMailList";

import RowMail from "./RowMail";
import InBoxHeader from "./InboxHeader";
import { useEffect } from "react";
import { updateSelectAll } from "../reducers/selectedMails";

export default function ProBox() {
  const dispatch = useDispatch();


  const allMails = useSelector((state) => state.allMails.value);

  let tableMail;
  let proMailList = [];

  for (let mail of allMails) {
    if (mail.pro) {
        proMailList.push(mail);
    }
  }

  useEffect(() => {
    dispatch(setActiveTab("proBox"));
    dispatch(addCurrentList(proMailList));
    dispatch(updateSelectAll([]));
  }, []);

  tableMail = proMailList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });

  return (
    <div className={styles.rightPanel}>
      <InBoxHeader />
      <div className={styles.mailsPanel}>
      {tableMail.length === 0 && <div className={styles.noMessageAlerte}>Aucun message.</div>}
        <div className={styles.mailsContainer}>{tableMail}</div>
      </div>
    </div>
  );
}
