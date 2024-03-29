import styles from "../styles/Rowmail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faStar,
  faBoxArchive,
  faSquareUpRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faEnvelope,
  faEnvelopeOpen,
  faSquare,
  faTrashCan,
  faSquareCheck,
  // faStar,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { addMailToDisplay } from "../reducers/mailDisplayer";
import {
  addSelectedMail,
  removeSelectedMail,
  updateSelectAll,
} from "../reducers/selectedMails";
import { deleteMail, updateBooleenValueByKey } from "../reducers/allMails";
import { useRef, useState, useEffect } from "react";
import StaticDateTimePickerLandscape from "./DateTimePicker";
import ModalOnHold from "./ModalOnHold";
import MailEditor from "./MailEditor";

function RowMail(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage] = useState("");

  const selected = useSelector((state) => state.selectedMails.value);
  const [showModalOnHold, setShowModalOnHold] = useState(false);
  const [showModalDateTime, setShowModalDateTime] = useState(false);
  const [showModalMailEditor, setShowModalMailEditor] = useState(false);

  const modalOnHold = useRef(null);
  let boxIconName = faSquare;

  useEffect(() => {
    setPage(router.pathname);
  }, [router.pathname]);

  const handleClickOutside = (event) => {
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

  for (let mail of selected) {
    if (mail._id === props._id) {
      boxIconName = faSquareCheck;
    }
  }

  const handleSelectedMail = (props) => {
    if (boxIconName === faSquare) {
      dispatch(addSelectedMail(props));
    } else {
      dispatch(removeSelectedMail(props));
    }
  };

  const openMail = (props) => {
    dispatch(addMailToDisplay(props));
  };

  const handleImportant = (email) => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: [email],
        keyToUpdate: "important",
      })
    );
  };

  const handleFollowed = (email) => {
    dispatch(
      updateBooleenValueByKey({ selectedArr: [email], keyToUpdate: "followed" })
    );
  };

  const handleUnRead = (email) => {
    dispatch(
      updateBooleenValueByKey({ selectedArr: [email], keyToUpdate: "unRead" })
    );
  };

  const handleArchived = (email) => {
    dispatch(
      updateBooleenValueByKey({ selectedArr: [email], keyToUpdate: "archived" })
    );
  };

  const deleteEmail = (email) => {
    dispatch(deleteMail([email]));
  };

  // format date
  let deliveryDate = props.onHoldDate
    ? new Date(props.onHoldDate)
    : new Date(props.deliveryDate);
  let deliveryDateFormatted = deliveryDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // format mail's content to remove html tags
  const removeTags = () => {
    return props.content.replace(/<[^>]+>/g, " ");
  };

  const handleShowModalDateTime = () => {
    setShowModalDateTime(!showModalDateTime);
  };
  const handleCloseModalMailEditor = () => {
    setShowModalMailEditor(false);
  };

  return (
    <>
      {showModalMailEditor && (
        <>
          <MailEditor
            handleCloseModalMailEditor={handleCloseModalMailEditor}
            draftData={props}
          />
        </>
      )}
      <div
        className={styles.mailRow}
        style={
          props.unRead
            ? { fontWeight: "bold" }
            : { fontWeight: 400, backgroundColor: "#e7efff" }
        }
        onClick={() => openMail(props)}
      >
        <div className={styles.leftColumns}>
          {/* icons---------------------- */}
          <div className={styles.rowIcons}>
            <div
              className={styles.mailIcon}
              onClick={() => handleSelectedMail(props)}
            >
              <FontAwesomeIcon icon={boxIconName} />
            </div>
            <div
              className={styles.mailIcon}
              onClick={() => handleFollowed(props)}
            >
              <FontAwesomeIcon
                icon={faStar}
                style={props.followed ? { color: "#E8AB02" } : {}}
              />
            </div>
            <div
              className={styles.mailIcon}
              onClick={() => handleImportant(props)}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                style={props.important ? { color: "#E8AB02" } : {}}
              />
            </div>
          </div>
          <Link href={page !== "/draftBox" ? "/fullMail" : ""}>
            <div
              className={styles.midColumn}
              onClick={
                page === "/draftBox" ? () => setShowModalMailEditor(true) : null
              }
            >
              <div
                className={styles.mailAutor}
                style={page === "/draftBox?" ? { color: "red" } : {}}
              >
                {page === "/sendedMailsBox"
                  ? `À  : ${props.sendedTo}`
                  : page === "/draftBox"
                  ? `${props.sendedTo} - Brouillon`
                  : props.autor}
              </div>
              {/* mails autor ---------------------- */}
              {/* mail Content ------------------- */}
              <div className={styles.mailAbstract}>
                <span className={styles.mailObject}>
                  {props.object === "" ? "(Aucun objet)" : props.object}
                </span>
                <p className={styles.mailContent}>- {removeTags()}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* enclosed icone */}
        <div className={styles.rightColumns}>
          {/* date--------------------- */}
          <div
            className={styles.mailDate}
            style={
              props.onHold
                ? { color: "#d56e0c" }
                : props.unRead
                ? { color: "black" }
                : {}
            }
          >
            {!showModalOnHold && deliveryDateFormatted}
          </div>
        </div>
        <div
          className={styles.overIconsContainer}
          style={{
            display: showModalOnHold && "flex",
            backgroundColor: props.unRead ? "white" : "#e7efff",
          }}
        >
          <div
            className={styles.overIconItem}
            onClick={() => handleArchived(props)}
          >
            {props.archived ? (
              <FontAwesomeIcon icon={faSquareUpRight} />
            ) : (
              <FontAwesomeIcon icon={faBoxArchive} />
            )}
          </div>
          <div
            className={styles.overIconItem}
            onClick={() => deleteEmail(props)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
          <div
            className={styles.overIconItem}
            onClick={() => handleUnRead(props)}
          >
            {props.unRead ? (
              <FontAwesomeIcon icon={faEnvelopeOpen} title="Marquer comme lu" />
            ) : (
              <FontAwesomeIcon icon={faEnvelope} title="Marquer comme non lu" />
            )}
          </div>
          <div
            className={styles.overIconItem}
            onClick={() => {
              setShowModalOnHold(!showModalOnHold),
                dispatch(updateSelectAll([]));
            }}
            title="Mettre en attente"
            ref={modalOnHold}
          >
            <FontAwesomeIcon icon={faClock} />
            {showModalOnHold && (
              <ModalOnHold
                displayModalDateTime={handleShowModalDateTime}
                emailData={props}
              />
            )}
          </div>
          {showModalDateTime && (
            <StaticDateTimePickerLandscape
              hideModalDateTime={handleShowModalDateTime}
              emailData={props}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default RowMail;
