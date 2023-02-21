import styles from "../styles/RightPanel.module.css";

import { useSelector, useDispatch } from "react-redux";

import { setActiveTab } from "../reducers/leftTabs";
import { addCurrentList } from "../reducers/currentMailList";

import RowMail from "./RowMail";
import InBoxHeader from "./InboxHeader";

export default function AllMessagesBox() {
  const dispatch = useDispatch();
  dispatch(setActiveTab("AllMessagesBox"));

  const allMails = useSelector((state) => state.allMails.value);
  dispatch(addCurrentList(allMails));
  
  let tableMail;

  tableMail = allMails.map((mail, i) => {
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
