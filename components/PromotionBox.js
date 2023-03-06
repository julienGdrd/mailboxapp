import styles from "../styles/RightPanel.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addCurrentList } from "../reducers/currentMailList";

import RowMail from "./RowMail";
import InBoxHeader from "./InboxHeader";

export default function PromotionBox() {
  const dispatch = useDispatch();

  const allMails = useSelector((state) => state.allMails.value);
  const activeTab = useSelector((state) => state.activeTabs.value);

  let promotionList = [];

  for (let mail of allMails) {
    if (!mail.archived && mail.promotion) {
      promotionList.push(mail);
    }
  }

  useEffect(() => {
    dispatch(addCurrentList(promotionList));
  }, []);

  let tableMail = promotionList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });

  return (
    <div className={styles.rightPanel}>
      {activeTab === "PromotionBoxCat" && <InBoxHeader />}
      <div className={styles.mailsPanel}>
        <div className={styles.mailsContainer}>{tableMail}</div>
      </div>
    </div>
  );
}
