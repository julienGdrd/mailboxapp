import styles from "../styles/RightPanel.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArchive,
  faCaretDown,
  faEllipsisVertical,
  faRotateRight,
  faTriangleExclamation,
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
import { updateSelectAll } from "../reducers/selectedMails";
import allMails, {
  deleteMail,
  updateBooleenValueByKey,
} from "../reducers/allMails";
import { useEffect, useState, useRef } from "react";

export default function InBoxHeader() {
  const dispatch = useDispatch();

  const selected = useSelector((state) => state.selectedMails.value);

  const currentMailList = useSelector((state) => state.currentMailList.value);
  const [showModalPlus, setShowModalPlus] = useState(false);
  const modalPlus = useRef(null);
  const modalMoveTo = useRef(null);
  const [showModalMoveTo, setShowModalMoveTo] = useState(false);

  const handleClickOutside = (event) => {
    if (modalPlus.current && !modalPlus.current.contains(event.target)) {
      setShowModalPlus(false);
    }
    if (modalMoveTo.current && !modalMoveTo.current.contains(event.target)) {
      setShowModalMoveTo(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  let selectIcon = faSquare;

  if (selected.length > 0 && selected.length != currentMailList.length) {
    selectIcon = faSquareMinus;
  } else if (
    selected.length === currentMailList.length &&
    currentMailList.length !== 0
  ) {
    console.log("longeure égale");
    selectIcon = faSquareCheck;
  } else if (selected.length === 0 || currentMailList.length === 0) {
    selectIcon = faSquare;
  }

  let selectedContainUnread = [];
  for (let mail of selected) {
    if (mail.unRead) {
      selectedContainUnread.push(mail);
    }
  }

  const handleSelectAll = () => {
    if (selected.length === 0) {
      dispatch(updateSelectAll(currentMailList));
      selectIcon = faSquareCheck;
    } else {
      dispatch(updateSelectAll([]));
    }
  };

  const handleUnRead = () => {
    selectedContainUnread.length === 0
      ? dispatch(
          updateBooleenValueByKey({
            selectedArr: selected,
            keyToUpdate: "unRead",
          })
        )
      : dispatch(
          updateBooleenValueByKey({
            selectedArr: selectedContainUnread,
            keyToUpdate: "unRead",
          })
        );

    dispatch(updateSelectAll([]));
  };

  const handleArchived = () => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: selected,
        keyToUpdate: "archived",
      })
    );
    dispatch(updateSelectAll([]));
  };

  const handleOnHold = () => {
    dispatch(
      updateBooleenValueByKey({ selectedArr: selected, keyToUpdate: "onHold" })
    );
    dispatch(updateSelectAll([]));
  };

  const handleSpam = () => {
    dispatch(
      updateBooleenValueByKey({ selectedArr: selected, keyToUpdate: "spam" })
    );
  };

  const handlePerso = () => {
    dispatch(
      updateBooleenValueByKey({ selectedArr: selected, keyToUpdate: "perso" })
    );
  };

  const handlePro = () => {
    dispatch(
      updateBooleenValueByKey({ selectedArr: selected, keyToUpdate: "pro" })
    );
  };
  const handleupdateBooleenValueByKey = (selectedMails, key, value) => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: selectedMails,
        keyToUpdate: key,
        forcedValue: value,
      })
    );
  };

  const deleteEmail = () => {
    dispatch(deleteMail(selected));
    dispatch(updateSelectAll([]));
  };

  useEffect(() => {
    if (currentMailList === 0) {
      console.log("useEffect reset selected");
      dispatch(updateSelectAll([]));
      selectIcon = faSquare;
    }
  }, [currentMailList]);

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
            <div
              className={styles.optionalIcons}
              title="Signaler comme spam"
              onClick={() => handleSpam()}
            >
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
          <div
            className={styles.optionalGroupIcon}
            ref={modalMoveTo}
            onClick={() => setShowModalMoveTo(!showModalMoveTo)}
          >
            <div className={styles.optionalIcons}>
              <FontAwesomeIcon
                title="Déplacer vers"
                icon={faArrowUpFromBracket}
                className={styles.iconsLeftControl}
                style={{ transform: "rotate(90deg)" }}
              />
              <div
                className={styles.optionsModal}
                style={showModalMoveTo ? { display: "block" } : {}}
              >
                <div className={styles.optionItem}>Principale</div>
                <div className={styles.optionItem}>Promotions</div>
                <div className={styles.optionItem}>Réseaux sociaux</div>
                <div
                  className={styles.optionItem}
                  onClick={() => handlePerso()}
                >
                  Personnel
                </div>
                <div className={styles.optionItem} onClick={() => handlePro()}>
                  Professionnel
                </div>
                <div className={styles.optionItem} onClick={() => handleSpam()}>
                  Spam
                </div>
              </div>
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
        <div
          ref={modalPlus}
          className={styles.iconsRight}
          onClick={() => setShowModalPlus(!showModalPlus)}
        >
          <FontAwesomeIcon
            title="Plus"
            icon={faEllipsisVertical}
            className={styles.iconsLeftControl}
          />
          {selected.length > 0 ? (
            <div
              className={styles.optionsModal}
              style={showModalPlus ? { display: "block" } : {}}
            >
              <div
                className={styles.optionItem}
                onClick={() =>
                  handleupdateBooleenValueByKey(selected, "unRead", false)
                }
              >
                Marquer comme lu
              </div>
              <div
                className={styles.optionItem}
                onClick={() =>
                  handleupdateBooleenValueByKey(selected, "unRead", true)
                }
              >
                Marquer comme non lu
              </div>
              <div
                className={styles.optionItem}
                onClick={() =>
                  handleupdateBooleenValueByKey(selected, "important", true)
                }
              >
                Marquer comme important
              </div>
              <div
                className={styles.optionItem}
                onClick={() =>
                  handleupdateBooleenValueByKey(selected, "important", false)
                }
              >
                Marquer comme non important
              </div>
              <div
                className={styles.optionItem}
                onClick={() =>
                  handleupdateBooleenValueByKey(selected, "followed", true)
                }
              >
                Activer le suivi
              </div>
              <div
                className={styles.optionItem}
                onClick={() =>
                  handleupdateBooleenValueByKey(selected, "followed", false)
                }
              >
                Désactiver le suivi
              </div>
            </div>
          ) : (
            <div
              className={styles.optionsModal}
              style={showModalPlus ? { display: "block" } : {}}
            >
              <div
                className={styles.optionItem}
                onClick={() =>
                  handleupdateBooleenValueByKey(
                    currentMailList,
                    "unRead",
                    false
                  )
                }
              >
                Tout marquer comme lu
              </div>
              <div className={styles.optionItemAlerte}>
                Selectionnez des messages pour afficher plus d'actions
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
