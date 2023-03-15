import styles from "../styles/MainHeader.module.css";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleChevronDown,
  faCircleInfo,
  faEnvelope,
  faGear,
  faMagnifyingGlass,
  faSliders,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { addMailToDisplay } from "../reducers/mailDisplayer";
import { setContact } from "../reducers/byContactBoxUpdater";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MainHeader() {
  const dispatch = useDispatch();
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

  const openMail = (mail) => {
    dispatch(addMailToDisplay(mail));
    console.log("openMail reached", mail);
  };
  console.log("resultEmail :", searchResultEmail);

  const handleOpenByContactBox = (contact) => {
    dispatch(
      setContact({ emailAdress: contact.emailAdress, autor: contact.autor })
    );
    console.log("contact :", contact.emailAdress);
  };
  const contactResultList = searchResultContacts
    .slice(0, 3)
    .map((contact, i) => {
      const query = searchQuery.toLowerCase();
      const autor = contact.autor.toLowerCase();
      const emailAdress = contact.emailAdress.toLowerCase();
      const boldQuery = `<strong>${query}</strong>`;
      const boldedAutor = autor.replace(query, boldQuery);
      const boldedEmailAdress = emailAdress.replace(query, boldQuery);

      return (
        <Link href="/byContactBox">
          <div
            className={styles.resultRow}
            onClick={() => {
              handleOpenByContactBox(contact);
            }}
          >
            <div className={styles.rowPicto}>
              <Image
                src="/../public/avatar.png"
                alt="logo"
                width={30}
                height={30}
              />
            </div>
            <div className={styles.contactInfos}>
              <div
                className={styles.rowInfoMain}
                dangerouslySetInnerHTML={{ __html: boldedAutor }}
              />
              <div
                className={styles.rowInfoSecond}
                dangerouslySetInnerHTML={{ __html: boldedEmailAdress }}
              />
            </div>
          </div>
        </Link>
      );
    });

  const mailResultList = searchResultEmail.slice(0, 5).map((mail, i) => {
    const query = searchQuery.toLowerCase();
    const object = mail.object.toLowerCase();
    const emailAdress = mail.emailAdress.toLowerCase();
    // const content = mail.content.toLowerCase();
    const boldQuery = `<strong>${query}</strong>`;
    const boldedObject = object.replace(query, boldQuery);
    const boldedEmailAdress = emailAdress.replace(query, boldQuery);

    // const boldedContent = content.replace(query, boldQuery);
    return (
      <Link href="/fullMail">
        <div>
          <div className={styles.resultRow} onClick={() => openMail(mail)}>
            <div className={styles.rowPicto}>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className={styles.contactInfos}>
              <div
                className={styles.rowInfoMain}
                dangerouslySetInnerHTML={{ __html: boldedObject }}
              />
              <div
                className={styles.rowInfoSecond}
                dangerouslySetInnerHTML={{ __html: boldedEmailAdress }}
              />
            </div>
          </div>
        </div>
      </Link>
    );
  });

  const handleBlur = () => {
    setTimeout(() => {
      setSearchQuery("");
    }, 400);
    // let time to dispatch "mailToDisplay" before linking
  };

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
              onBlur={() => handleBlur()}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery.length > 0 && (
              <div className={styles.iconsRight}>
                <FontAwesomeIcon icon={faXmark} className={styles.iconsItems} />
              </div>
            )}

            {searchQuery.length > 0 && (
              <div className={styles.resultModal}>
                <div className={styles.resultContainer}>
                  {contactResultList}
                </div>
                <div className={styles.resultContainer}>{mailResultList}</div>
              </div>
            )}
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
