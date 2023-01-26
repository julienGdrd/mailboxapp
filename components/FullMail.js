import styles from '../styles/FullMail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBars, faCaretDown, faCircle, faCircleChevronDown, faCircleInfo, faEllipsisVertical, faGear, faInbox, faMagnifyingGlass, faPaperclip, faPen, faPlus, faReply, faRotateRight, faSliders, faTag, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faClock, faFile, faSquare, faStar } from '@fortawesome/free-regular-svg-icons';

function FullMail(props) {
    return (
        <div className={styles.mainMessageContainer}>
            <div className={styles.objectContainer}>
                {props.object}
                <div className={styles.objectIconContainer}>
                    <FontAwesomeIcon
                        className={styles.objectIcon}
                        icon={faBookmark}
                    />
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.leftColumn}>

                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.autorInfos}>
                        <div className={styles.autorInfosUpPart}>
                            <div className={styles.nameContainer}>
                                {props.autor}
                            </div>
                            <div className={styles.rightDateControlsContainer}>
                                <div className={styles.deliveryDate}>{props.deliveryDate} 2023 12:00</div>
                                <div className={styles.controlIconsRow}>
                                    <div className={styles.controlIconContainer}><FontAwesomeIcon
                                        className={styles.controlIcon}
                                        icon={faStar}
                                    />
                                    </div>
                                    <div className={styles.controlIconContainer}><FontAwesomeIcon
                                        className={styles.controlIcon}
                                        icon={faReply}
                                    />
                                    </div>
                                    <div className={styles.controlIconContainer}><FontAwesomeIcon
                                        className={styles.controlIcon}
                                        icon={faEllipsisVertical}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.autorInfosDownPart}>
                            <span>À </span><span>moi</span>
                        </div>
                    </div>
                    <div className={styles.textContent}>{props.content}</div>
                </div>
            </div>
        </div>
    )
}

export default FullMail;