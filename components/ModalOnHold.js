import styles from "../styles/ModalOnHold.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { updateBooleenValueByKey } from "../reducers/allMails";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/fr";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export default function ModalOnHold(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage] = useState("");
  const selected = useSelector((state) => state.selectedMails.value);
  const [showModalDateTime, setShowModalDateTime] = useState(false);

  useEffect(() => {
    setPage(router.pathname);
  }, [router.pathname]);

  const toggleShowModalDateTime = (value) => {
    setShowModalDateTime(value);
    props.displayModalDateTime(!showModalDateTime);
  };

  const options = [];

  const getOnHoldOptions = () => {
    const now = moment();
    const startOfDay = now.clone().startOf("day");
    const tomorrow = now.clone().add(1, "day");
    const twoDaysLater = now.clone().add(2, "day");
    const nextMonday = now.clone().endOf("week").add(1, "day");
    const saturday = now.clone().endOf("week");

    if (now.isBefore(startOfDay.add(16, "hours"))) {
      options.push({
        label: `Plus tard dans la journée`,
        value: moment().format("YYYY-MM-DDT18:00:00Z"),
      });
    }

    options.push({
      label: "Demain",
      value: tomorrow.format("YYYY-MM-DDT08:00:00Z"),
    });

    if (
      now.isBetween(
        startOfDay,
        now.clone().endOf("week").subtract(5, "days"),
        "day",
        "[]"
      )
    ) {
      options.push({
        label: `Plus tard dans la semaine`,
        value: twoDaysLater.clone().format("YYYY-MM-DDT08:00:00Z"),
      });
    }

    if (
      now.isBetween(
        now.clone().startOf("isoWeek"),
        now.clone().startOf("isoWeek").add(4, "day"),
        "day",
        "[]"
      )
    ) {
      options.push({
        label: "Ce week-end",
        value: saturday.clone().format("YYYY-MM-DDT08:00:00Z"),
      });
    }

    if (
      now.isBetween(
        now.clone().startOf("isoWeek"),
        now.clone().startOf("isoWeek").add(5, "day"),
        "day",
        "[]"
      )
    ) {
      options.push({
        label: `La semaine prochaine`,
        value: nextMonday.clone().format("YYYY-MM-DDT08:00:00Z"),
      });
    }
  };
  getOnHoldOptions();

  const optionsRows = options.map((option) => {
    moment.locale("fr");
    return (
      <div
        className={styles.optionItem}
        onClick={() => handleOnHold(option.value)}
        title=""
      >
        <div className={styles.onHoldOption}>
          <span className={styles.onHoldtext}>{option.label}</span>
          <span className={styles.onHoldDate}>
            {moment(option.value).format("ddd HH:mm")}
          </span>
        </div>
      </div>
    );
  });

  const handleOnHold = (newHoldDate) => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: selected.length === 0 ? [props.emailData] : selected,
        keyToUpdate: "onHold",
        forcedValue: true,
        holdDate: newHoldDate,
      })
    );
    page === "/fullMail" && router.push("/");
  };

  const removeOnHold = () => {
    dispatch(
      updateBooleenValueByKey({
        selectedArr: selected.length === 0 ? [props.emailData] : selected,
        keyToUpdate: "principal",
        forcedValue: true,
        holdDate: null,
      })
    );
    page === "/fullMail" && router.push("/");
  };

  return (
    <div>
      <div
        className={styles.onHoldModal}
        style={showModalDateTime ? { display: "none" } : {}}
      >
        <p>Mettre en attente jusqu'à...</p>
        {optionsRows}
        <div className={styles.optionItem} title="">
          <div
            className={styles.onHoldOption}
            onClick={() => toggleShowModalDateTime()}
          >
            <span>
              <FontAwesomeIcon
                icon={faCalendarDays}
                className={styles.iconCalendar}
              />
              Choisir heure et date
            </span>
          </div>
        </div>
        <div
          className={styles.optionItem}
          title=""
          onClick={() => removeOnHold()}
        >
          <div className={styles.onHoldOption}>
            <span>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={styles.iconCalendar}
              />
              Annuler la mise en attente
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
