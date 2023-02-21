import styles from "../styles/RightPanel.module.css";

import { useSelector, useDispatch } from "react-redux";

import { setActiveTab } from "../reducers/leftTabs";
import { addCurrentList } from "../reducers/currentMailList";

import RowMail from "./RowMail";
import InBoxHeader from "./InboxHeader";

export default function ArchiveBox() {
  const dispatch = useDispatch();
  dispatch(setActiveTab("ArchiveBox"));

  const allMails = useSelector((state) => state.allMails.value);

  let tableMail;
  let archiveMailList = [];

  for (let mail of allMails) {
    if (mail.archived) {
      archiveMailList.push(mail);
    }
  }
  dispatch(addCurrentList(archiveMailList));
  tableMail = archiveMailList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });

  return (
    <div className={styles.rightPanel}>
      <InBoxHeader />
      <div className={styles.mailsPanel}>
        <div className={styles.mailsContainer}>{tableMail}</div>
      </div>
    </div>
  );
}
