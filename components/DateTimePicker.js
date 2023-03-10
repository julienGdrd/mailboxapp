import styles from "../styles/DateTimeModal.module.css";
import * as React from "react";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { updateBooleenValueByKey } from "../reducers/allMails";

export default function StaticDateTimePickerLandscape(props) {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.selectedMails.value);

  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log("selectedDate:", selectedDate);

  const handleClose = () => {
    props.hideModalDateTime();
  };

  const handleOk = (newDate) => {
    setSelectedDate(newDate.$d);
    const date = newDate.$d;

    function toIsoString(date) {
      var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? "+" : "-",
        pad = function (num) {
          return (num < 10 ? "0" : "") + num;
        };

      return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate()) +
        "T" +
        pad(date.getHours()) +
        ":" +
        pad(date.getMinutes()) +
        ":" +
        pad(date.getSeconds()) +
        dif +
        pad(Math.floor(Math.abs(tzo) / 60)) +
        ":" +
        pad(Math.abs(tzo) % 60)
      );
    }

    const formatDateOk = toIsoString(date);

    dispatch(
      updateBooleenValueByKey({
        selectedArr: selected.length === 0 ? [props.emailData] : selected,
        keyToUpdate: "onHold",
        forcedValue: true,
        holdDate: formatDateOk,
      })
    );
  };
  return (
    <div>
      <div className={styles.blurContainerDateTime}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <StaticDateTimePicker
            orientation="landscape"
            onClose={() => handleClose()}
            onAccept={(newDate) => handleOk(newDate)}
            ampm={false}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}
