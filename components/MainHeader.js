import styles from "../styles/MainHeader.module.css";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleChevronDown,
  faCircleInfo,
  faGear,
  faMagnifyingGlass,
  faSliders,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function MainHeader() {
  const allMails = useSelector((state) => state.allMails.value);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultContacts, setSearchResultContacts] = useState([]);
  const [searchResultEmail, setSearchResultEmail] = useState([]);
  console.log("resultContact:", searchResultContacts, "query:", searchQuery);
  
 
  useEffect(() => {
    const handleSearchQueryOnChange = () => {
      const query = searchQuery.toLowerCase();
      const resultsContacts = allMails.filter((mail) => {
        return (
          mail.autor.toLowerCase().includes(query) ||
          mail.emailAdress.toLowerCase().includes(query)
        );
      });
      const resultEmail = allMails.filter((mail) => {
        return (
          mail.content.toLowerCase().includes(query) ||
          mail.object.toLowerCase().includes(query)
        );
      });
      setSearchResultContacts(resultsContacts);
      setSearchResultEmail(resultEmail);

      console.log("resultF:", searchResultContacts, "queryF :", query);
      console.log("searchQueryF:", searchQuery);
    };
    handleSearchQueryOnChange();
  }, [searchQuery]);
  
console.log('resultEmail :', searchResultEmail)

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.divBarsIcon}>
            <FontAwesomeIcon icon={faBars} className={styles.iconBars} />
          </div>

          <Image
            src="/../public/logo_gmail.png"
            alt="logo"
            width={109}
            height={40}
          />
        </div>

        <div className={styles.headerMid}>
          <div className={styles.searchBar}>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={styles.iconsItems}
              />
            </div>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Rechercher dans les messages"
              value={searchQuery}
              // onChange={(e) => {setSearchQuery(e.target.value); handleSearchQueryOnChange()}}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className={styles.iconsRight}>
              <FontAwesomeIcon icon={faSliders} className={styles.iconsItems} />
            </div>
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.iconsRight}>
            <FontAwesomeIcon
              icon={faCircleInfo}
              className={styles.iconsItems}
            />
          </div>
          <div className={styles.iconsRight}>
            <FontAwesomeIcon icon={faGear} className={styles.iconsItems} />
          </div>
          <div className={styles.iconsRight}>
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className={styles.iconsItems}
            />
          </div>
          <div className={styles.iconsRight}>
            <FontAwesomeIcon icon={faUser} className={styles.iconsItems} />
          </div>
        </div>
      </header>
    </div>
  );
}
