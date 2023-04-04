import styles from "../styles/RightPanel.module.css";

import { useSelector, useDispatch } from "react-redux";

import { setActiveTab } from "../reducers/leftTabs";
import { addCurrentList } from "../reducers/currentMailList";

import RowMail from "./RowMail";
import InBoxHeader from "./InboxHeader";
import { useEffect } from "react";
import { updateSelectAll } from "../reducers/selectedMails";

export default function FollowedBox() {
  const dispatch = useDispatch();

  const allMails = useSelector((state) => state.allMails.value);

  let tableMail;
  let followedMailList = [];

  for (let mail of allMails) {
    if (mail.followed && !mail.archived) {
      followedMailList.push(mail);
    }
  }

  useEffect(() => {
    dispatch(setActiveTab("FollowedBox"));
    dispatch(addCurrentList(followedMailList));
    dispatch(updateSelectAll([]));
  }, []);

  tableMail = followedMailList.map((mail, i) => {
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
