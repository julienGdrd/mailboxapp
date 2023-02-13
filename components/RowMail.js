import styles from "../styles/Rowmail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faBookmark,
  faStar,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faEnvelope,
  faEnvelopeOpen,
  faSquare,
  faTrashCan,
  // faStar,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addMailToDisplay } from "../reducers/mailDisplayer";
import {
  handleUpdateImportant,
  handleUpdateFollowed,
  handleUpdateUnRead,
  handleUpdateOnHold,
} from "../reducers/allMails";
import { useState } from "react";

function RowMail(props) {
  const dispatch = useDispatch();

  // format date
  let deliveryDate = new Date(props.deliveryDate);
  let deliveryDateFormatted = deliveryDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

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
            <div className={styles.mailIcon}>
              <FontAwesomeIcon icon={faSquare} />
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
          <div className={styles.overIconItem}>
            <FontAwesomeIcon icon={faBoxArchive} />
          </div>
          <div className={styles.overIconItem}>
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
          <div
            className={styles.overIconItem}
            onClick={() => handleUnRead(props._id, !props.unRead)}
          >
            {props.unRead ? (
              <FontAwesomeIcon icon={faEnvelopeOpen} />
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
