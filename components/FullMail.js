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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBooleenValueByKey } from "../reducers/allMails";
import { addMailToDisplay } from "../reducers/mailDisplayer";
import { updateSelectAll } from "../reducers/selectedMails";
import { addCurrentList } from "../reducers/currentMailList";
import InBoxHeader from "./InboxHeader";

function FullMail() {
  const dispatch = useDispatch();
  const fullMailToDisplay = useSelector((state) => state.mailDisplayer.value);
  
  let mailToDisplay;

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

  useEffect(() => {
    handleUnRead(fullMailToDisplay);
    dispatch(updateSelectAll([fullMailToDisplay]));
    dispatch(addCurrentList([fullMailToDisplay]));
  }, []);

  return (
    <div className={styles.mainMessageContainer}>
      <InBoxHeader/>
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
