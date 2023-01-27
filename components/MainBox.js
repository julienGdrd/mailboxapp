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

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Link from "next/link";

import { mailData } from "../data/mailData";

import RowMail from "./RowMail";

export default function MainBox() {
  const dispatch = useDispatch();

const [tab, setTab] = useState('promotion')  
  let principalList = [];
  let promotionList = [];
  let reseauxList= [];

  for (let mail of mailData){
    console.log(mail.categorie === 'principal')
    if(mail.categorie === 'principal'){
       principalList.push(mail)
    }else if(mail.categorie === 'promotion'){
      promotionList.push(mail)
    }else{
      reseauxList.push(mail)
    }
  }
console.log('princiapalList', principalList)
console.log('promoList', promotionList)
console.log('reseaux', reseauxList)

let tableMail;
if(tab === 'principal'){
   tableMail = principalList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });
}else if(tab === 'promotion'){
  tableMail = promotionList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });
}else{
  tableMail = reseauxList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });
}
  

  return (
    <div>
      <div className={styles.rightPanel}>
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
            <div className={styles.tabItem}
            onClick={() => setTab('principal')}
            style={tab==='principal'? {color: "#0b57d0", borderBottom: "solid 2px #0b57d0"} :{}}
            >
              <div className={styles.tabIcon}>
                <FontAwesomeIcon icon={faInbox} />
              </div>
              <span>Principale</span>
            </div>
            <div className={styles.tabItem}
             onClick={() => setTab('promotion')}
             style={tab==='promotion'? {color: "#0b57d0", borderBottom: "solid 2px #0b57d0"} :{}}
            >
              <div className={styles.tabIcon}>
                <FontAwesomeIcon icon={faTag} />
              </div>
              <span>Promotions</span>
            </div>
            <div className={styles.tabItem}
             onClick={() => setTab('reseaux')}
             style={tab==='reseaux'? {color: "#0b57d0", borderBottom: "solid 2px #0b57d0"} :{}}
            >
              <div className={styles.tabIcon}>
                <FontAwesomeIcon icon={faUserGroup} />
              </div>
              <span>Réseaux sociaux</span>
            </div>
          </div>

          {/* mails container ---------------------- */}
          <div className={styles.mailsContainer}>{tableMail}</div>
        </div>
      </div>
    </div>
  );
}
