import styles from "../styles/RightPanel.module.css";

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

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setAllMailsList } from "../reducers/allMails";

import Link from "next/link";

import RowMail from "./RowMail";

export default function MainBox() {

  const dispatch = useDispatch();
  const allMails = useSelector((state) => state.allMails.value);

  useEffect(() => {
    // fetch only on first render
    if(allMails.length<1){
      fetch('http://localhost:3000/mails')
      .then(response => response.json())
      .then(data => {
        dispatch(setAllMailsList(data.mailList))
      })
    }else{
      console.log('data already fetched')
    }
   }, []);


  const [tab, setTab] = useState("principal");
  let principalList = [];
  let promotionList = [];
  let reseauxList = [];

  let principalUnReadCounter=0;
  let promotionUnReadCounter=0;
  let reseauxUnReadCounter=0;

  for (let mail of allMails) {
    console.log(mail.categorie === "principal");
    if (mail.categorie === "principal") {
      principalList.push(mail);
      if(mail.unRead){
        principalUnReadCounter ++;
      }
    } else if (mail.categorie === "promotion") {
      promotionList.push(mail);
      if(mail.unRead){
        promotionUnReadCounter ++;
      }
    } else {
      reseauxList.push(mail);
      if(mail.unRead){
        reseauxUnReadCounter ++;
      }
    }
  }

  let tableMail;
  if (tab === "principal") {
    tableMail = principalList.map((mail, i) => {
      return <RowMail key={i} {...mail} />;
    });
  } else if (tab === "promotion") {
    tableMail = promotionList.map((mail, i) => {
      return <RowMail key={i} {...mail} />;
    });
  } else {
    tableMail = reseauxList.map((mail, i) => {
      return <RowMail key={i} {...mail} />;
    });
  }

  return (
    <div className={styles.rightPanel}>
      <div>
        {/* inbox header --------------------- */}
        <div className={styles.inboxHeader}>
          <div className={styles.leftControls}>
            <div className={styles.selectBox}>
              <div className={styles.checkBox}>
                <FontAwesomeIcon
                  icon={faSquare}
                  className={styles.iconsLeftControl}
                />
              </div>
              <div className={styles.iconCaretDown}>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className={styles.iconsLeftControl}
                />
              </div>
            </div>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon
                icon={faRotateRight}
                className={styles.iconsLeftControl}
              />
            </div>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className={styles.iconsLeftControl}
              />
            </div>
          </div>
        </div>

        {/* mails Panel --------------------- */}
        <div className={styles.mailsPanel}>
          {/* categories tabs --------------------- */}
          <div className={styles.tabContainer}>
            <div
              className={styles.tabItem}
              onClick={() => setTab("principal")}
              style={
                tab === "principal"
                  ? { color: "#0b57d0", borderBottom: "solid 2px #0b57d0" }
                  : {}
              }
            >
              <div className={styles.tabIcon}>
                <FontAwesomeIcon icon={faInbox} />
              </div>
              <span>Principale</span>
              <span className={styles.unReadCounter}>{principalUnReadCounter>0 ? principalUnReadCounter : ''}</span>
            </div>
            <div
              className={styles.tabItem}
              onClick={() => setTab("promotion")}
              style={
                tab === "promotion"
                  ? { color: "#0b57d0", borderBottom: "solid 2px #0b57d0" }
                  : {}
              }
            >
              <div className={styles.tabIcon}>
                <FontAwesomeIcon icon={faTag} />
              </div>
              <span>Promotions</span>
              <span className={styles.unReadCounter}>{promotionUnReadCounter>0 ? promotionUnReadCounter : ''}</span>
            </div>
            <div
              className={styles.tabItem}
              onClick={() => setTab("reseaux")}
              style={
                tab === "reseaux"
                  ? { color: "#0b57d0", borderBottom: "solid 2px #0b57d0" }
                  : {}
              }
            >
              <div className={styles.tabIcon}>
                <FontAwesomeIcon icon={faUserGroup} />
              </div>
              <span>Réseaux sociaux</span>
              <span className={styles.unReadCounter}>{reseauxUnReadCounter>0 ? reseauxUnReadCounter : ''}</span>

            </div>
          </div>

          {/* mails container ---------------------- */}
          <div className={styles.mailsContainer}>{tableMail}
          </div>
        </div>
      </div>
    </div>
  );
}
