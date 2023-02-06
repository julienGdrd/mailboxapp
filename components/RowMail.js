import styles from "../styles/Rowmail.module.css";
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
  faBookmark,
  faTag,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faFile,
  faSquare,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addMailToDisplay } from "../reducers/mailDisplayer";
import { handleUpdateImportant } from "../reducers/allMails";

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
  return (
    <div>
      <div
        className={styles.mailRow}
        style={props.unRead ? { fontWeight: "bold" } : { fontWeight: 400 }}
        onClick={() => openMail(props)}
      >
        <div className={styles.leftColumns}>
          {/* icons---------------------- */}
          <div className={styles.rowIcons}>
            <div className={styles.mailIcon}>
              <FontAwesomeIcon icon={faSquare} />
            </div>
            <div className={styles.mailIcon}>
              <FontAwesomeIcon icon={faStar} />
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
      </div>
    </div>
  );
}

export default RowMail;
