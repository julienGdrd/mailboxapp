import styles from "../styles/RightPanel.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBars,
  faCaretDown,
  faCircle,
  faCircleChevronDown,
  faCircleInfo,
  faEllipsisVertical,
  faGear,
  faInbox,
  faMagnifyingGlass,
  faPaperclip,
  faPen,
  faPlus,
  faRotateRight,
  faSliders,
  faTag,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faClock,
  faFile,
  faSquare,
  faStar,
} from "@fortawesome/free-regular-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import RowMail from "./RowMail";

export default function ImportantBox() {
  const allMails = useSelector((state) => state.allMails.value);
  console.log("allMails", allMails);

  let tableMail;
  let importantMailList = [];

  for (let mail of allMails) {
    if (mail.important) {
      importantMailList.push(mail);
    }
  }
  tableMail = importantMailList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });

  return (
    <div>
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
    </div>
  );
}
