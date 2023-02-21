import styles from "../styles/RightPanel.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCaretDown,
  faEllipsisVertical,
  faInbox,
  faRotateRight,
  faTag,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectAll } from "../reducers/selectedMails";
import { useState } from "react";

export default function InBoxHeader() {
  const dispatch = useDispatch();

  const selected = useSelector((state) => state.selectedMails.value);

  const currentMailList = useSelector((state) => state.currentMailList.value);

  const [allSelected, setAllSelected] = useState(false);

  const handleSelectAll = () => {
    if (allSelected === false) {
      dispatch(updateSelectAll(currentMailList));
      setAllSelected(!allSelected);
    } else {
      dispatch(updateSelectAll([]));
      setAllSelected(!allSelected);
    }
  };

  console.log("selected:", selected);
  return (
    <div className={styles.inboxHeader}>
      <div className={styles.leftControls}>
        <div className={styles.selectBox}>
          <div className={styles.checkBox} onClick={() => handleSelectAll()}>
            <FontAwesomeIcon
              icon={selected.length === 0 ? faSquare : faSquareCheck}
              className={styles.iconsLeftControl}
              style={selected.length !== 0 ? { color: "black" } : {}}
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
  );
}
