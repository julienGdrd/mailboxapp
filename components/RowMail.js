import styles from "../styles/Rowmail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
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
import { useDispatch, useSelector } from "react-redux";
import { addMailToDisplay } from "../reducers/mailDisplayer";
import { addSelectedMail, removeSelectedMail } from "../reducers/selectedMails";
import {
  handleUpdateImportant,
  handleUpdateFollowed,
  handleUpdateUnRead,
  handleUpdateOnHold,
  handleUpdateArchived,
  deleteMail,
} from "../reducers/allMails";

function RowMail(props) {

  const dispatch = useDispatch();

  const selected = useSelector((state) => state.selectedMails.value);

  let boxIconName = faSquare;

    for (let mail of selected) {
      if (mail._id === props._id) {
        boxIconName = faSquareCheck;
      }
    }

  const handleSelectedMail = (props) => {
    if (boxIconName === faSquare) {
      console.log("addselected", props);
      dispatch(addSelectedMail(props));
    } else {
      dispatch(removeSelectedMail(props));
      console.log("removeSelected", props);
    }
  };

  const openMail = (props) => {
    console.log("openMail reached", props);
    dispatch(addMailToDisplay(props));
  };

  const handleImportant = (emailId, important) => {
    const payload = {
      emailId: emailId,
      importantStatus: important,
    };
    dispatch(handleUpdateImportant(payload));
  };

  const handleFollowed = (emailId, followed) => {
    const payload = {
      emailId: emailId,
      followedStatus: followed,
    };
    dispatch(handleUpdateFollowed(payload));
  };

  const handleUnRead = (emailId, unReadStatus) => {
    const payload = {
      emailId: emailId,
      unReadStatus: unReadStatus,
    };
    dispatch(handleUpdateUnRead(payload));
  };

  const handleOnHold = (emailId, onHoldStatus) => {
    const payload = {
      emailId: emailId,
      onHoldStatus: onHoldStatus,
    };
    dispatch(handleUpdateOnHold(payload));
  };
  const handleArchived = (emailId, archivedStatus) => {
    const payload = {
      emailId: emailId,
      archivedStatus: archivedStatus,
    };
    dispatch(handleUpdateArchived(payload));
  };

  const deleteEmail = (emailId) => {
    dispatch(deleteMail(emailId));
  };

  // format date
  let deliveryDate = new Date(props.deliveryDate);
  let deliveryDateFormatted = deliveryDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div>
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
              <FontAwesomeIcon
                icon={boxIconName}
              />
            </div>
            <div
              className={styles.mailIcon}
              onClick={() => handleFollowed(props._id, !props.followed)}
            >
              <FontAwesomeIcon
                icon={faStar}
                style={props.followed ? { color: "#E8AB02" } : {}}
              />
            </div>
            <div
              className={styles.mailIcon}
              onClick={() => handleImportant(props._id, !props.important)}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                style={props.important ? { color: "#E8AB02" } : {}}
              />
            </div>
          </div>
          <Link href="/fullMail">
            <div className={styles.midColumn}>
              {/* mails autor ---------------------- */}
              <div className={styles.mailAutor}>{props.autor}</div>
              {/* mail Content ------------------- */}
              <div className={styles.mailAbstract}>
                <span className={styles.mailObject}>{props.object}</span>
                <p className={styles.mailContent}>- {props.content}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* enclosed icone */}
        <div className={styles.rightColumns}>
          <div className={styles.enclosedIcon}>
            <FontAwesomeIcon icon={faPaperclip} />
          </div>

          {/* date--------------------- */}
          <div
            className={styles.mailDate}
            style={props.unRead ? { color: "black" } : {}}
          >
            {deliveryDateFormatted}
          </div>
        </div>
        <div className={styles.overIconsContainer}>
          <div
            className={styles.overIconItem}
            onClick={() => handleArchived(props._id, !props.archived)}
          >
            {props.archived ? (
              <FontAwesomeIcon icon={faSquareUpRight} />
            ) : (
              <FontAwesomeIcon icon={faBoxArchive} />
            )}
          </div>
          <div className={styles.overIconItem}>
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => deleteEmail(props._id)}
            />
          </div>
          <div
            className={styles.overIconItem}
            onClick={() => handleUnRead(props._id, !props.unRead)}
          >
            {props.unRead ? (
              <FontAwesomeIcon icon={faEnvelopeOpen} title="Marquer comme lu" />
            ) : (
              <FontAwesomeIcon icon={faEnvelope} />
            )}
          </div>
          <div
            className={styles.overIconItem}
            onClick={() => handleOnHold(props._id, !props.onHold)}
          >
            <FontAwesomeIcon icon={faClock} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RowMail;
