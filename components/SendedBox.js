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
  
    const sendedMails = useSelector((state) => state.sendedMails.value);
  
    let tableMail;
    let sendedMailList = [];
  
    for (let mail of sendedMails) {
    //   if (!mail.archived) {
        sendedMailList.push(mail);
    //   }
    }
  
    useEffect(() => {
      dispatch(setActiveTab("ImportantBox"));
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