import styles from "../styles/RightPanel.module.css";

import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../reducers/leftTabs";
import { addCurrentList } from "../reducers/currentMailList";

import RowMail from "./RowMail";
import InBoxHeader from "./InboxHeader";

export default function OnHoldBox() {
  const dispatch = useDispatch();
  dispatch(setActiveTab("OnHoldBox"));
  const allMails = useSelector((state) => state.allMails.value);
  console.log("allMails", allMails);

  let tableMail;
  let onHoldMailList = [];

  for (let mail of allMails) {
    if (mail.onHold) {
      onHoldMailList.push(mail);
    }
  }
  dispatch(addCurrentList(onHoldMailList));

  tableMail = onHoldMailList.map((mail, i) => {
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
