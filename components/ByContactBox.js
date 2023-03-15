import styles from "../styles/RightPanel.module.css";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";

import { setActiveTab } from "../reducers/leftTabs";
import { addCurrentList } from "../reducers/currentMailList";

import RowMail from "./RowMail";
import InBoxHeader from "./InboxHeader";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function ByContactBox() {
  const dispatch = useDispatch();

  const allMails = useSelector((state) => state.allMails.value);
  const searchedContact = useSelector(
    (state) => state.byContactBoxUpdater.value
  );

  let tableMail;
  let byContactMailList = [];

  for (let mail of allMails) {
    if (mail.emailAdress === searchedContact.emailAdress) {
      byContactMailList.push(mail);
    }
  }

  useEffect(() => {
    // dispatch(setActiveTab(""));
    dispatch(addCurrentList(byContactMailList));
  }, []);

  tableMail = byContactMailList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });

  return (
    <div className={styles.rightPanel}>
      <InBoxHeader />
      <div className={styles.byContactSubHeader}>
        <div className={styles.contactAvatar}>
          <Image
            src="/../public/avatar.png"
            alt="logo"
            width={45}
            height={45}
          />
        </div>
        <div className={styles.autorDisplayer}>{searchedContact.autor}</div>
        <div className={styles.emailAdressDisplayer}>
          <span className={styles.iconsLeftControl}>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <span className={styles.emailAdress}>{searchedContact.emailAdress}</span>
        </div>
      </div>
      <div className={styles.mailsPanel}>
        <div className={styles.mailsContainer}>{tableMail}</div>
      </div>
    </div>
  );
}
