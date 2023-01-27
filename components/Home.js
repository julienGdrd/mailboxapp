import styles from "../styles/Home.module.css";
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

import RowMail from "./RowMail";
import FullMail from "./FullMail";

import { useSelector, useDispatch } from "react-redux";
import { resetMailToDisplay } from "../reducers/mailDisplayer";

import { mailList } from "../data/mailData";

function Home() {
  const dispatch = useDispatch();

  const fullMailToDisplay = useSelector((state) => state.mailDisplayer.value);
  console.log("useselector", fullMailToDisplay);

  const displayedMail = <FullMail {...fullMailToDisplay} />;

  const inbox = mailList.map((mail, i) => {
    return <RowMail key={i} {...mail} />;
  });

  let importantMails = [];
  for (let mail of mailList) {
    if (mail.important) {
      importantMails.push(mail);
    }
  }
  console.log(importantMails);
  return (
    <div>
      <div className={styles.main}>
        {/* main panel --------------------------------------------- */}

        {/* left side----------------- */}
        

        {/* right panel --------------------- */}
        
      </div>
    </div>
  );
}

export default Home;
