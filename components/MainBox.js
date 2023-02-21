import styles from "../styles/RightPanel.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faEllipsisVertical,
  faInbox,
  faRotateRight,
  faTag,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setAllMailsList } from "../reducers/allMails";
import { setActiveTab } from "../reducers/leftTabs";

import InBoxHeader from "./InboxHeader";
import TabContainer from "./TabContainer";
import PrincipalBox from "./PrincipalBox";
import PromotionBox from "./PromotionBox";
import ReseauxBox from "./ReseauxBox";
import RowMail from "./RowMail";

export default function MainBox() {
  const dispatch = useDispatch();
  dispatch(setActiveTab("MainBox"));

  const allMails = useSelector((state) => state.allMails.value);

  useEffect(() => {
    // fetch only on first render
    if (allMails.length < 1) {
      fetch("http://localhost:3000/mails")
        .then((response) => response.json())
        .then((data) => {
          dispatch(setAllMailsList(data.mailList));
        });
    } else {
      console.log("data already fetched");
    }
  }, []);

  const [tab, setTab] = useState("principal");

  const selectTab = (name) => {
    console.log('selectTab', name)
    setTab(name)
  }

  let tableMail;
  if (tab === "principal") {
    tableMail = <PrincipalBox />;
  }else if(tab === "promotion"){
    tableMail = <PromotionBox/>;
  }else{
    tableMail = <ReseauxBox/>;
  }

  return (
    <div className={styles.rightPanel}>
      <div>
        <InBoxHeader />
        {/* mails Panel --------------------- */}
        <div className={styles.mailsPanel}>
          {/* categories tabs --------------------- */}
          <TabContainer selectTab={selectTab} />
          {/* mails container ---------------------- */}
          <div className={styles.mailsContainer}>{tableMail}</div>
        </div>
      </div>
    </div>
  );
}
