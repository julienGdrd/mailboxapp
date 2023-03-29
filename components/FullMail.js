import styles from "../styles/FullMail.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faReply,
  faStar,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import { updateBooleenValueByKey, deleteMail } from "../reducers/allMails";
import { addMailToDisplay } from "../reducers/mailDisplayer";
import { updateSelectAll } from "../reducers/selectedMails";
import { addCurrentList } from "../reducers/currentMailList";
import InBoxHeader from "./InboxHeader";

function FullMail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const fullMailToDisplay = useSelector((state) => state.mailDisplayer.value);
  const [showModalPlus, setShowModalPlus] = useState(false);
  const modalPlus = useRef(null);
  let fullMailRef = useRef();
  let mailToDisplay;

  const handleClickOutside = (event) => {
    if (modalPlus.current && !modalPlus.current.contains(event.target)) {
      setShowModalPlus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    mailToDisplay = fullMailToDisplay;
    console.log("useEffect mailTodisplay:", mailToDisplay);
  }, [fullMailToDisplay]);

  // format date
  let deliveryDate = new Date(fullMailToDisplay.deliveryDate);
  let deliveryDateFormatted = deliveryDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleImportant = (email) => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: [email],
        keyToUpdate: "important",
      })
    );
    dispatch(
      addMailToDisplay({ ...email, important: !fullMailToDisplay.important })
    );
  };

  const handleFollowed = (email) => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: [email],
        keyToUpdate: "followed",
      })
    );
    dispatch(
      addMailToDisplay({ ...email, followed: !fullMailToDisplay.followed })
    );
  };

  const handleUnRead = (email) => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: [email],
        keyToUpdate: "unRead",
        forcedValue: false,
      })
    );
  };

  const handleDeleteMail = () => {
    console.log("deleteFunc:", fullMailToDisplay);
    dispatch(deleteMail([fullMailToDisplay]));
    router.back();
  };

  const handleSpam = () => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: [fullMailToDisplay],
        keyToUpdate: "spam",
        forcedValue: true,
      })
    );
    router.back();
  };

  const markAsUnRead = () => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: [fullMailToDisplay],
        keyToUpdate: "unRead",
        forcedValue: true,
      })
    );
    router.back();
  };

  useEffect(() => {
    handleUnRead(fullMailToDisplay);
    dispatch(updateSelectAll([fullMailToDisplay]));
    dispatch(addCurrentList([fullMailToDisplay]));
  }, []);

  return (
    <div className={styles.mainMessageContainer}>
      <InBoxHeader />
      <div className={styles.objectContainer}>
        {fullMailToDisplay.object}
        <div
          className={styles.objectIconContainer}
          onClick={() => handleImportant(fullMailToDisplay)}
        >
          <FontAwesomeIcon
            className={styles.objectIcon}
            icon={faBookmark}
            style={fullMailToDisplay.important ? { color: "#E8AB02" } : {}}
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
                  <div
                    className={styles.controlIconContainer}
                    onClick={() => handleFollowed(fullMailToDisplay)}
                  >
                    <FontAwesomeIcon
                      className={styles.controlIcon}
                      icon={faStar}
                      style={
                        fullMailToDisplay.followed ? { color: "#E8AB02" } : {}
                      }
                    />
                  </div>
                  <div className={styles.controlIconContainer}>
                    <FontAwesomeIcon
                      className={styles.controlIcon}
                      icon={faReply}
                    />
                  </div>
                  <div
                    ref={modalPlus}
                    className={styles.controlIconContainer}
                    onClick={() => setShowModalPlus(!showModalPlus)}
                  >
                    <FontAwesomeIcon
                      className={styles.controlIcon}
                      icon={faEllipsisVertical}
                    />
                    <div
                      className={styles.optionsModal}
                      style={
                        !showModalPlus
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      <div
                        className={styles.optionItem}
                        // onClick={() =>
                        
                        // }
                      >
                        Répondre
                      </div>
                      <div
                        className={styles.optionItem}
                        // onClick={() =>
                        
                        // }
                      >
                        Transférer
                      </div>
                      <div
                        className={styles.optionItem}
                        onClick={() => setShowModalPlus(false)}
                      >
                        <ReactToPrint
                          trigger={() => <div>Imprimer</div>}
                          content={() => fullMailRef}
                        />
                      </div>
                      <div
                        className={styles.optionItem}
                        onClick={() => handleDeleteMail()}
                      >
                        Supprimer ce message
                      </div>
                      <div
                        className={styles.optionItem}
                        onClick={() => handleSpam()}
                      >
                        Signaler comme spam
                      </div>
                      <div
                        className={styles.optionItem}
                        onClick={() => markAsUnRead()}
                      >
                        Marquer comme non lu
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.autorInfosDownPart}>
              <span>À </span>
              <span>moi</span>
            </div>
          </div>
          <div className={styles.textContent} 
          ref={(el) => (fullMailRef = el)}
          dangerouslySetInnerHTML={{__html: fullMailToDisplay.content}}
          />
        </div>
      </div>
    </div>
  );
}

export default FullMail;
