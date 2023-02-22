import styles from "../styles/RightPanel.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArchive,
  faCaretDown,
  faEllipsisVertical,
  faInbox,
  faRotateRight,
  faTag,
  faUserGroup,
  faTriangleExclamation,
  faListCheck,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faClock,
  faEnvelope,
  faSquare,
  faSquareCheck,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectAll } from "../reducers/selectedMails";
import { useEffect, useState } from "react";

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
        <div className={styles.optionalIconsContainer}
        style={selected.length !==0 ? {display: 'flex'} : {}}
        >
          <div className={styles.optionalGroupIcon}>
            <div className={styles.optionalIcons}>
              <FontAwesomeIcon
                icon={faArchive}
                className={styles.iconsLeftControl}
              />
            </div>
            <div className={styles.optionalIcons}>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className={styles.iconsLeftControl}
              />
            </div>
            <div className={styles.optionalIcons}>
              <FontAwesomeIcon
                icon={faTrashCan}
                className={styles.iconsLeftControl}
              />
            </div>
          </div>
          <div className={styles.optionalGroupIcon}>
            <div className={styles.optionalIcons}>
              <FontAwesomeIcon
                icon={faEnvelope}
                className={styles.iconsLeftControl}
              />
            </div>
            <div className={styles.optionalIcons}>
              <FontAwesomeIcon
                icon={faClock}
                className={styles.iconsLeftControl}
              />
            </div>
            <div className={styles.optionalIcons}>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={styles.iconsLeftControl}
              />
            </div>
          </div>
          <div className={styles.optionalGroupIcon}>
            <div className={styles.optionalIcons}>
              <FontAwesomeIcon
                icon={faArrowUpFromBracket}
                className={styles.iconsLeftControl}
                style={{transform: "rotate(90deg)"}}
              />
            </div>
            <div className={styles.optionalIcons}>
              <FontAwesomeIcon
                icon={faClock}
                className={styles.iconsLeftControl}
              />
            </div>
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
