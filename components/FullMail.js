import styles from "../styles/FullMail.module.css";
import Image from "next/image";
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
  faReply,
  faRotateRight,
  faSliders,
  faTag,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faClock,
  faFile,
  faSquare,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleUpdateImportant } from "../reducers/allMails";

function FullMail() {
  const dispatch = useDispatch();

  const fullMailToDisplay = useSelector((state) => state.mailDisplayer.value);
  console.log("useselector", fullMailToDisplay);
  const [isImportant, setIsImportant] = useState(fullMailToDisplay.important);

  // format date
  let deliveryDate = new Date(fullMailToDisplay.deliveryDate);
  let deliveryDateFormatted = deliveryDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleImportant = (emailId, important) => {
    const payload = {
      emailId: emailId,
      importantStatus: important,
    };
    setIsImportant(!isImportant);
    dispatch(handleUpdateImportant(payload));
  };

  return (
    <div className={styles.mainMessageContainer}>
      <div className={styles.objectContainer}>
        {fullMailToDisplay.object}
        <div
          className={styles.objectIconContainer}
          onClick={() =>
            handleImportant(fullMailToDisplay._id, !fullMailToDisplay.important)
          }
        >
          <FontAwesomeIcon
            className={styles.objectIcon}
            icon={faBookmark}
            style={isImportant ? { color: "#E8AB02" } : {}}
          />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.leftColumn}>
          <div className={styles.avatarContainer}>
            <Image
              src="/../public/avatar.png"
              alt="avatar"
              width={45}
              height={45}
              className={styles.avatarImg}
            />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.autorInfos}>
            <div className={styles.autorInfosUpPart}>
              <div className={styles.nameContainer}>
                {fullMailToDisplay.autor}
              </div>
              <div className={styles.rightDateControlsContainer}>
                <div className={styles.deliveryDate}>
                  {deliveryDateFormatted}
                </div>
                <div className={styles.controlIconsRow}>
                  <div className={styles.controlIconContainer}>
                    <FontAwesomeIcon
                      className={styles.controlIcon}
                      icon={faStar}
                    />
                  </div>
                  <div className={styles.controlIconContainer}>
                    <FontAwesomeIcon
                      className={styles.controlIcon}
                      icon={faReply}
                    />
                  </div>
                  <div className={styles.controlIconContainer}>
                    <FontAwesomeIcon
                      className={styles.controlIcon}
                      icon={faEllipsisVertical}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.autorInfosDownPart}>
              <span>À </span>
              <span>moi</span>
            </div>
          </div>
          <div className={styles.textContent}>{fullMailToDisplay.content}</div>
        </div>
      </div>
    </div>
  );
}

export default FullMail;
