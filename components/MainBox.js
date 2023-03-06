import styles from "../styles/RightPanel.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setAllMailsList } from "../reducers/allMails";
import { setActiveTab } from "../reducers/leftTabs";

import InBoxHeader from "./InboxHeader";
import TabContainer from "./TabContainer";
import PrincipalBox from "./PrincipalBox";
import PromotionBox from "./PromotionBox";
import ReseauxBox from "./ReseauxBox";

export default function MainBox() {
  const dispatch = useDispatch();

  const allMails = useSelector((state) => state.allMails.value);

  useEffect(() => {
    dispatch(setActiveTab("MainBox"));
    // fetch only on first render or if all messages deleted
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
    console.log("selectTab", name);
    setTab(name);
  };

  let tableMail;
  if (tab === "principal") {
    tableMail = <PrincipalBox />;
  } else if (tab === "promotion") {
    tableMail = <PromotionBox />;
  } else {
    tableMail = <ReseauxBox />;
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
