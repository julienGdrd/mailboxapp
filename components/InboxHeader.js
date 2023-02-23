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
  faEnvelopeOpen,
  faSquare,
  faSquareCheck,
  faSquareMinus,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedMail, updateSelectAll } from "../reducers/selectedMails";
import {
  handleUpdateArchived,
  handleUpdateOnHold,
  handleUpdateUnRead,
  deleteMail,
} from "../reducers/allMails";
import { useEffect, useState } from "react";

export default function InBoxHeader() {
  const dispatch = useDispatch();

  const selected = useSelector((state) => state.selectedMails.value);

  const currentMailList = useSelector((state) => state.currentMailList.value);

  let selectIcon = faSquare;

  if (selected.length > 0 && selected.length != currentMailList.length) {
    selectIcon = faSquareMinus;
  } else if ((selected.length === currentMailList.length) != 0) {
    console.log("longeure égale");
    selectIcon = faSquareCheck;
  } else if (selected.length === 0 || currentMailList.length === 0) {
    selectIcon = faSquare;
  }
  useEffect(() => {
    if (currentMailList === 0) {
      console.log("useEffect reset selected");
      dispatch(updateSelectAll([]));
    }
  }, [currentMailList]);

  const handleSelectAll = () => {
    if (selected.length === 0) {
      dispatch(updateSelectAll(currentMailList));
      selectIcon = faSquareCheck;
    } else {
      dispatch(updateSelectAll([]));
    }
  };

  const deleteEmail = () => {
    dispatch(deleteMail(selected));
  };

  const handleArchived = () => {
    dispatch(handleUpdateArchived(selected));
    dispatch(updateSelectAll([]));
  };

  const handleOnHold = () => {
    dispatch(handleUpdateOnHold(selected));
    dispatch(updateSelectAll([]));
  };

  let selectedContainUnread = [];
  for (let mail of selected) {
    if (mail.unRead) {
      selectedContainUnread.push(mail);
    }
  }
  const handleUnRead = () => {
    selectedContainUnread.length === 0
      ? dispatch(handleUpdateUnRead(selected))
      : dispatch(handleUpdateUnRead(selectedContainUnread));

    dispatch(updateSelectAll([]));
  };

  console.log(
    "selected:",
    selected.length,
    "currentlength:",
    currentMailList.length
  );
  return (
    <div className={styles.inboxHeader}>
      <div className={styles.leftControls}>
        <div className={styles.selectBox}>
          <div className={styles.checkBox} onClick={() => handleSelectAll()}>
            <FontAwesomeIcon
              icon={selectIcon}
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
        <div
          className={styles.optionalIconsContainer}
          style={selected.length !== 0 ? { display: "flex" } : {}}
        >
          <div className={styles.optionalGroupIcon}>
            <div className={styles.optionalIcons} title="Archiver">
              <FontAwesomeIcon
                icon={faArchive}
                className={styles.iconsLeftControl}
                onClick={() => handleArchived()}
              />
            </div>
            <div className={styles.optionalIcons} title="Signaler comme spam">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className={styles.iconsLeftControl}
              />
            </div>
            <div
              className={styles.optionalIcons}
              title="Supprimer"
              onClick={() => deleteEmail()}
            >
              <FontAwesomeIcon
                icon={faTrashCan}
                className={styles.iconsLeftControl}
              />
            </div>
          </div>
          <div className={styles.optionalGroupIcon}>
            <div
              className={styles.optionalIcons}
              title={
                selectedContainUnread.length > 0
                  ? "Marquer comme lu"
                  : "Marquer comme non lu"
              }
              onClick={() => handleUnRead()}
            >
              {selectedContainUnread.length > 0 ? (
                <FontAwesomeIcon
                  icon={faEnvelopeOpen}
                  className={styles.iconsLeftControl}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.iconsLeftControl}
                />
              )}
            </div>
            <div
              className={styles.optionalIcons}
              onClick={() => handleOnHold()}
              title="Mettre en attente"
            >
              <FontAwesomeIcon
                icon={faClock}
                className={styles.iconsLeftControl}
              />
            </div>
            {/* <div className={styles.optionalIcons}>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={styles.iconsLeftControl}
              />
            </div> */}
          </div>
          <div className={styles.optionalGroupIcon}>
            <div className={styles.optionalIcons} title="Déplacer vers">
              <FontAwesomeIcon
                icon={faArrowUpFromBracket}
                className={styles.iconsLeftControl}
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
            {/* <div className={styles.optionalIcons}>
              <FontAwesomeIcon
                icon={faClock}
                className={styles.iconsLeftControl}
              />
            </div> */}
          </div>
        </div>
        <div
          className={styles.iconsRight}
          style={selected.length !== 0 ? { display: "none" } : {}}
        >
          <FontAwesomeIcon
            icon={faRotateRight}
            className={styles.iconsLeftControl}
          />
        </div>
        <div className={styles.iconsRight} title="Plus">
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className={styles.iconsLeftControl}
          />
        </div>
      </div>
    </div>
  );
}
