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

function RowMail(props) {
  const dispatch = useDispatch();

  const openMail = (props) => {
    console.log("openMail reached", props);
    dispatch(addMailToDisplay(props));
  };

  const handleImportant = () => {
    console.log("important");
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
            <div className={styles.mailIcon}>
              <FontAwesomeIcon
                icon={faBookmark}
                style={props.important ? { color: "#E8AB02" } : {}}
                onClick={() => handleImportant()}
              />
            </div>
          </div>
          <Link href="/fullMail"
          >
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
            {props.deliveryDate}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RowMail;
