import styles from "../styles/RightPanel.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addCurrentList } from "../reducers/currentMailList";

import RowMail from "./RowMail";
import InBoxHeader from "./InboxHeader";
import { updateSelectAll } from "../reducers/selectedMails";

export default function ReseauxBox() {
  const dispatch = useDispatch();

  const allMails = useSelector((state) => state.allMails.value);
  const activeTab = useSelector((state) => state.activeTabs.value);

  let reseauxList = [];

  for (let mail of allMails) {
    if (!mail.archived && mail.reseaux) {
      reseauxList.push(mail);
    }
  }

  useEffect(() => {
    dispatch(addCurrentList(reseauxList));
    dispatch(updateSelectAll([]));
  }, []);

  let tableMail = reseauxList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });

  return (
    <div className={styles.rightPanel}>
      {activeTab === "ReseauxBoxCat" && <InBoxHeader />}
      <div className={styles.mailsPanel}>
        {tableMail.length === 0 && (
          <div className={styles.noMessageAlerte}>Aucun message.</div>
        )}
        <div className={styles.mailsContainer}>{tableMail}</div>
      </div>
    </div>
  );
}
