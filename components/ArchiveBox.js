import styles from "../styles/RightPanel.module.css";

import { useSelector, useDispatch } from "react-redux";

import { setActiveTab } from "../reducers/leftTabs";
import { addCurrentList } from "../reducers/currentMailList";
import { updateSelectAll } from "../reducers/selectedMails";

import RowMail from "./RowMail";
import InBoxHeader from "./InboxHeader";
import { useEffect } from "react";

export default function ArchiveBox() {
  const dispatch = useDispatch();

  const allMails = useSelector((state) => state.allMails.value);

  let tableMail;
  let archiveMailList = [];

  for (let mail of allMails) {
    if (mail.archived) {
      archiveMailList.push(mail);
    }
  }

  useEffect(() => {
    dispatch(setActiveTab("ArchiveBox"));
    dispatch(addCurrentList(archiveMailList));
    dispatch(updateSelectAll([]));
  }, []);

  tableMail = archiveMailList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });

  return (
    <div className={styles.rightPanel}>
      <InBoxHeader />
      <div className={styles.mailsPanel}>
        {tableMail.length === 0 && (
          <div className={styles.noMessageAlerte}>Aucun message.</div>
        )}
        <div className={styles.mailsContainer}>{tableMail}</div>
      </div>
    </div>
  );
}
