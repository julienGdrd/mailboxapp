import styles from "../styles/RightPanel.module.css";

import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../reducers/leftTabs";
import { addCurrentList } from "../reducers/currentMailList";

import RowMail from "./RowMail";
import InBoxHeader from "./InboxHeader";
import { useEffect } from "react";
import { updateSelectAll } from "../reducers/selectedMails";

export default function SendedBox() {
    const dispatch = useDispatch();
  
    const allMails = useSelector((state) => state.allMails.value);

  
    let tableMail;
    let sendedMailList = [];
  
    for (let mail of allMails) {
      if (mail.sendedBy === 'user@user.com' && !mail.archived && !mail.spam) {
        sendedMailList.push(mail);
      }
    }
  
    useEffect(() => {
      dispatch(setActiveTab("SendedBox"));
      dispatch(addCurrentList(sendedMailList));
      dispatch(updateSelectAll([]));
    }, []);
  
    tableMail = sendedMailList.map((mail, i) => {
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