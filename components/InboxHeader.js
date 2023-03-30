import styles from "../styles/RightPanel.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faCaretDown,
  faEllipsisVertical,
  faRotateRight,
  faTriangleExclamation,
  faArrowUpFromBracket,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import {
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
import { deleteMail, updateBooleenValueByKey } from "../reducers/allMails";
import { addMailToDisplay } from "../reducers/mailDisplayer";

import { useEffect, useState, useRef } from "react";
import ModalOnHold from "./ModalOnHold";
import StaticDateTimePickerLandscape from "./DateTimePicker";

export default function InBoxHeader() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage] = useState("");

  const selected = useSelector((state) => state.selectedMails.value);

  const currentMailList = useSelector((state) => state.currentMailList.value);
  const [showModalPlus, setShowModalPlus] = useState(false);
  const modalPlus = useRef(null);
  const [showModalMoveTo, setShowModalMoveTo] = useState(false);
  const modalMoveTo = useRef(null);
  const [showModalSelectOptions, setShowModalSelectOptions] = useState(false);
  const modalSelect = useRef(null);
  const [showModalOnHold, setShowModalOnHold] = useState(false);
  const modalOnHold = useRef(null);
  const [showModalDateTime, setShowModalDateTime] = useState(false);

  useEffect(() => {
    setPage(router.pathname);
  }, [router.pathname]);

  const handleClickOutside = (event) => {
    if (modalPlus.current && !modalPlus.current.contains(event.target)) {
      setShowModalPlus(false);
    }
    if (modalMoveTo.current && !modalMoveTo.current.contains(event.target)) {
      setShowModalMoveTo(false);
    }
    if (modalSelect.current && !modalSelect.current.contains(event.target)) {
      setShowModalSelectOptions(false);
    }
    if (modalOnHold.current && !modalOnHold.current.contains(event.target)) {
      setShowModalOnHold(false);
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

  // array setters for optionnal selection
  let currentMailListUnRead = [];
  let currentMailListRead = [];
  let currentMailListFollowed = [];
  let currentMailListUnFollowed = [];

  for (let mail of currentMailList) {
    if (mail.unRead) {
      currentMailListUnRead.push(mail);
    }
    if (!mail.unRead) {
      currentMailListRead.push(mail);
    }
    if (mail.followed) {
      currentMailListFollowed.push(mail);
    }
    if (!mail.followed) {
      currentMailListUnFollowed.push(mail);
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
    page === "/fullMail"
      ? dispatch(
          updateBooleenValueByKey({
            selectedArr: selected,
            keyToUpdate: "unRead",
            forcedValue: true,
          })
        )
      : selectedContainUnread.length === 0
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
    page === "/fullMail" && router.back();
  };

  const handleArchived = () => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: selected,
        keyToUpdate: "archived",
      })
    );
    dispatch(updateSelectAll([]));
    page === "/fullMail" && router.back();
  };

  const handlePrincipal = () => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: selected,
        keyToUpdate: "principal",
        forcedValue: true,
      })
    );
    dispatch(updateSelectAll([]));
    page === "/fullMail" && router.back();
  };

  const handlePromo = () => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: selected,
        keyToUpdate: "promotion",
        forcedValue: true,
      })
    );
    dispatch(updateSelectAll([]));
    page === "/fullMail" && router.back();
  };

  const handleReseaux = () => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: selected,
        keyToUpdate: "reseaux",
        forcedValue: true,
      })
    );
    dispatch(updateSelectAll([]));
    page === "/fullMail" && router.back();
  };

  const handleSpam = () => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: selected,
        keyToUpdate: "spam",
        forcedValue: true,
      })
    );
    page === "/fullMail" && router.back();
  };

  const handlePerso = () => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: selected,
        keyToUpdate: "perso",
        forcedValue: true,
      })
    );
    dispatch(updateSelectAll([]));
    page === "/fullMail" && router.back();
  };

  const handlePro = () => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: selected,
        keyToUpdate: "pro",
        forcedValue: true,
      })
    );
    dispatch(updateSelectAll([]));
    page === "/fullMail" && router.back();
  };
  const handleupdateBooleenValueByKey = (selectedMails, key, value) => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: selectedMails,
        keyToUpdate: key,
        forcedValue: value,
      })
    );
    if (key === "important") {
      dispatch(addMailToDisplay({ ...selectedMails[0], important: value }));
    }
    if (key === "unRead") {
      page === "/fullMail" && router.back();
    }
  };

  const deleteEmail = () => {
    dispatch(deleteMail(selected));
    dispatch(updateSelectAll([]));
    page === "/fullMail" && router.back();
  };

  const handleShowModalDateTime = () => {
    setShowModalDateTime(!showModalDateTime);
  };

  useEffect(() => {
    if (currentMailList === 0) {
      dispatch(updateSelectAll([]));
      selectIcon = faSquare;
    }
  }, [currentMailList]);

  return (
    <div className={styles.inboxHeader}>
      <div className={styles.leftControls}>
        <div className={styles.selectBox}>
          {page !== "/fullMail" && (
            <div className={styles.checkBox} onClick={() => handleSelectAll()}>
              <FontAwesomeIcon
                icon={selectIcon}
                className={styles.iconsLeftControl}
                style={selected.length !== 0 ? { color: "black" } : {}}
                title="Sélectionner"
              />
            </div>
          )}

          {page !== "/fullMail" && (
            <div
              ref={modalSelect}
              className={styles.iconCaretDown}
              onClick={() => setShowModalSelectOptions(!showModalSelectOptions)}
            >
              <FontAwesomeIcon
                icon={faCaretDown}
                className={styles.iconsLeftControl}
                title="Sélectionner"
              />
              <div
                className={styles.optionsModal}
                style={showModalSelectOptions ? { display: "block" } : {}}
              >
                <div
                  className={styles.optionItem}
                  onClick={() => dispatch(updateSelectAll(currentMailList))}
                >
                  Tous
                </div>
                <div
                  className={styles.optionItem}
                  onClick={() => dispatch(updateSelectAll([]))}
                >
                  Aucun
                </div>
                <div
                  className={styles.optionItem}
                  onClick={() => dispatch(updateSelectAll(currentMailListRead))}
                >
                  Lus
                </div>
                <div
                  className={styles.optionItem}
                  onClick={() =>
                    dispatch(updateSelectAll(currentMailListUnRead))
                  }
                >
                  Non lus
                </div>
                <div
                  className={styles.optionItem}
                  onClick={() =>
                    dispatch(updateSelectAll(currentMailListFollowed))
                  }
                >
                  Suivis
                </div>
                <div
                  className={styles.optionItem}
                  onClick={() =>
                    dispatch(updateSelectAll(currentMailListUnFollowed))
                  }
                >
                  Non suivis
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={styles.optionalIconsContainer}
          style={selected.length !== 0 ? { display: "flex" } : {}}
        >
          <div className={styles.optionalGroupIcon}>
            <div
              className={styles.optionalIcons}
              title={
                page === "/archiveBox" ? "Annuler l'archivage" : "Archiver"
              }
              onClick={() => handleArchived()}
            >
              <FontAwesomeIcon
                icon={page === "/archiveBox" ? faInbox : faArchive}
                className={styles.iconsLeftControl}
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
                page === "/fullMail"
                  ? "Marquer comme non lu"
                  : selectedContainUnread.length > 0
                  ? "Marquer comme lu"
                  : "Marquer comme non lu"
              }
              onClick={() => handleUnRead()}
            >
              {page === "/fullMail" ? (
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.iconsLeftControl}
                />
              ) : selectedContainUnread.length > 0 ? (
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
              onClick={() => setShowModalOnHold(!showModalOnHold)}
              title="Mettre en attente"
              ref={modalOnHold}
            >
              <FontAwesomeIcon
                icon={faClock}
                className={styles.iconsLeftControl}
              />
              {showModalOnHold && (
                <ModalOnHold displayModalDateTime={handleShowModalDateTime} />
              )}
            </div>
            {showModalDateTime && (
              <StaticDateTimePickerLandscape
                hideModalDateTime={handleShowModalDateTime}
              />
            )}
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
                <div
                  className={styles.optionItem}
                  onClick={() => handlePrincipal()}
                >
                  Principale
                </div>
                <div
                  className={styles.optionItem}
                  onClick={() => handlePromo()}
                >
                  Promotions
                </div>
                <div
                  className={styles.optionItem}
                  onClick={() => handleReseaux()}
                >
                  Réseaux sociaux
                </div>
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
