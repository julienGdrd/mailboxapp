import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBars, faCaretDown, faCircle, faCircleChevronDown, faCircleInfo, faEllipsisVertical, faGear, faInbox, faMagnifyingGlass, faPaperclip, faPen, faPlus, faRotateRight, faSliders, faTag, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faClock, faFile, faSquare, faStar } from '@fortawesome/free-regular-svg-icons';
import  RowMail  from '../components/Mail';
import FullMail from './FullMail';

import { useSelector, useDispatch } from 'react-redux';
import { resetMailToDisplay } from '../reducers/mailDisplayer';

function Home() {

  const dispatch= useDispatch();
  const mailList = [
    {
      autor: "Aliénor",
      emailAdress: "fake@gmail.com",
      object: "Résultat de ton passage du titre",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae conse Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae conse",
      deliveryDate: "19 janv.",
      unRead: true,
      important: false,
      followed: false,
      spam: false,
      pro: false,
      perso: false,
      categorie: '',
    },
    {
      autor: "Jhon",
      emailAdress: "Jhon@gmail.com",
      object: "Offre exceptionnelle",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae conse Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae conse",
      deliveryDate: "17 janv.",
      unRead: true,
      important: false,
      followed: false,
      spam: false,
      pro: false,
      perso: false,
      categorie: '',
    },
    {
      autor: "Martin",
      emailAdress: "martin@gmail.com",
      object: "Weekend ski",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae conse Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae conse",
      deliveryDate: "12 janv.",
      unRead: true,
      important: false,
      followed: false,
      spam: false,
      pro: false,
      perso: false,
      categorie: '',
    },
    {
      autor: "Julie",
      emailAdress: "julie@gmail.com",
      object: "Réunion du lundi",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae conse Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae conse",
      deliveryDate: "10 janv.",
      unRead: true,
      important: false,
      followed: false,
      spam: false,
      pro: false,
      perso: false,
      categorie: '',
    },
    {
      autor: "Mr smith",
      emailAdress: "smith@gmail.com",
      object: "Votre coli est en chemin",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae conse Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae conse",
      deliveryDate: "05 janv.",
      unRead: true,
      important: false,
      followed: false,
      spam: false,
      pro: false,
      perso: false,
      categorie: '',
    },
  ]

  const fullMailToDisplay = useSelector((state) => state.mailDisplayer.value)
  console.log('useselector',fullMailToDisplay)

  const displayedMail = <FullMail {...fullMailToDisplay} />

  const inbox = mailList.map((mail, i) => {
    return <RowMail key={i} {...mail} 
    />
  });

  
  return (
    <div>
      <div className={styles.main}>
        {/* header------------------------------- */}
        <header className={styles.header}>

          <div className={styles.headerLeft}>
            <div className={styles.divBarsIcon}>
              <FontAwesomeIcon icon={faBars}
                className={styles.iconBars} />

            </div>

            <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" />
          </div>

          <div className={styles.headerMid}>
            <div className={styles.searchBar}>
              <div className={styles.iconsRight}>
                <FontAwesomeIcon icon={faMagnifyingGlass}
                  className={styles.iconsItems} />
              </div>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Rechercher dans les messages"
              />
              <div className={styles.iconsRight}>
                <FontAwesomeIcon icon={faSliders}
                  className={styles.iconsItems} />
              </div>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon icon={faCircleInfo}
                className={styles.iconsItems} />
            </div>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon icon={faGear}
                className={styles.iconsItems} />
            </div>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon icon={faCircleChevronDown}
                className={styles.iconsItems} />
            </div>
            <div className={styles.iconsRight}>
              <FontAwesomeIcon icon={faUser}
                className={styles.iconsItems} />
            </div>
          </div>
        </header>

        {/* main panel --------------------------------------------- */}
        <div className={styles.panel}>
          {/* left side----------------- */}
          <div className={styles.leftPanel}>
            <div className={styles.newMessageBtn}>
              <div>
                <FontAwesomeIcon icon={faPen}
                  className={styles.iconNewMessageBtn}
                />
                <span>Nouveau message</span>
              </div>
            </div>

            {/* left selectors primary --------------------- */}
            <div className={styles.sideNavigator}>
              <div className={styles.primaryLeftSelectorsContainer}>

                <div className={styles.leftTabs}>
                  <div 
                  className={styles.tabLabelIcon}
                  onClick={()=>{dispatch(resetMailToDisplay())}}
                  >
                    <div
                     className={styles.leftTabsIconContainer}
                     >
                      <FontAwesomeIcon icon={faInbox}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Boîte de réception
                  </div>
                </div>

                <div className={styles.leftTabs}>
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon icon={faStar}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Messages suivis
                  </div>
                </div>

                <div className={styles.leftTabs}>
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon icon={faClock}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    En attente
                  </div>
                </div>

                <div className={styles.leftTabs}>
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon icon={faBookmark}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Important
                  </div>
                </div>

                <div className={styles.leftTabs}>
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon icon={faFile}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Brouillons
                  </div>
                </div>

                <div className={styles.leftTabs}>
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon icon={faAngleRight}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Catégories
                  </div>
                </div>

                <div className={styles.leftTabs}>
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon icon={faAngleRight}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Plus
                  </div>
                </div>

              </div>

              {/* left selectors secondary --------------------- */}
              <div className={styles.secondaryLeftSelectorsContainer}>

                <div className={styles.secondarySelectorTitle}>
                  Libellés
                  <div className={styles.iconsRight}>
                    <FontAwesomeIcon icon={faPlus}
                      className={styles.iconLeftTab}
                    />
                  </div>
                </div>

                <div className={styles.leftTabs}>
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon icon={faBookmark}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Professionnel
                  </div>
                  <div className={styles.secondTabOptionIcon}>
                    <FontAwesomeIcon icon={faEllipsisVertical}
                      className={styles.iconLeftTab}
                    />
                  </div>
                </div>
                <div className={styles.leftTabs}>
                  <div className={styles.tabLabelIcon}>
                    <div className={styles.leftTabsIconContainer}>
                      <FontAwesomeIcon icon={faBookmark}
                        className={styles.iconLeftTab}
                      />
                    </div>
                    Personnel
                  </div>
                  <div className={styles.secondTabOptionIcon}>
                    <FontAwesomeIcon icon={faEllipsisVertical}
                      className={styles.iconLeftTab}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right panel --------------------- */}
          <div className={styles.rightPanel}>

            {/* inbox header --------------------- */}
            <div className={styles.inboxHeader}>
              <div className={styles.leftControls}>
                <div className={styles.selectBox}>
                  <div className={styles.checkBox}>
                    <FontAwesomeIcon icon={faSquare}
                      className={styles.iconsLeftControl} />
                  </div>
                  <div className={styles.iconCaretDown}>
                    <FontAwesomeIcon icon={faCaretDown}
                      className={styles.iconsLeftControl} />
                  </div>
                </div>
                <div className={styles.iconsRight}>
                  <FontAwesomeIcon icon={faRotateRight}
                    className={styles.iconsLeftControl} />
                </div>
                <div className={styles.iconsRight}>
                  <FontAwesomeIcon icon={faEllipsisVertical}
                    className={styles.iconsLeftControl} />
                </div>

              </div>
            </div>

            {/* mails Panel --------------------- */}
            <div className={styles.mailsPanel}>

              {/* categories tabs --------------------- */}
              <div className={styles.tabContainer}>
                <div className={styles.tabItem}>
                  <div className={styles.tabIcon}>
                    <FontAwesomeIcon icon={faInbox}
                    />
                  </div>
                  <span>Principale</span>
                </div>
                <div className={styles.tabItem}>
                  <div className={styles.tabIcon}>
                    <FontAwesomeIcon icon={faTag}
                    />
                  </div>
                  <span>Promotions</span>
                </div>
                <div className={styles.tabItem}>
                  <div className={styles.tabIcon}>
                    <FontAwesomeIcon icon={faUserGroup}
                    />
                  </div>
                  <span>Réseaux sociaux</span>
                </div>
              </div>

              {/* mails container ---------------------- */}
              <div className={styles.mailsContainer}>
                {fullMailToDisplay.autor ? <div>{displayedMail}</div> : <div>{inbox}</div> }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
