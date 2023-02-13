import styles from "../styles/RightPanel.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faEllipsisVertical,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../reducers/leftTabs";

import RowMail from "./RowMail";

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
  tableMail = onHoldMailList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });

  return (
    <div className={styles.rightPanel}>
      {/* inbox header --------------------- */}
      <div className={styles.inboxHeader}>
        <div className={styles.leftControls}>
          <div className={styles.selectBox}>
            <div className={styles.checkBox}>
              <FontAwesomeIcon
                icon={faSquare}
                className={styles.iconsLeftControl}
              />
            </div>
            <div className={styles.iconCaretDown}>
              <FontAwesomeIcon
                icon={faCaretDown}
                className={styles.iconsLeftControl}
              />
            </div>
          </div>
          <div className={styles.iconsRight}>
            <FontAwesomeIcon
              icon={faRotateRight}
              className={styles.iconsLeftControl}
            />
          </div>
          <div className={styles.iconsRight}>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className={styles.iconsLeftControl}
            />
          </div>
        </div>
      </div>

      {/* mails Panel --------------------- */}
      <div className={styles.mailsPanel}>
        {/* categories tabs --------------------- */}

        {/* mails container ---------------------- */}
        <div className={styles.mailsContainer}>{tableMail}</div>
      </div>
    </div>
  );
}
