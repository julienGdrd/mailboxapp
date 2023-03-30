import "react-quill/dist/quill.snow.css";
import styles from "../styles/MailEditor.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import "moment/locale/fr";
import dynamic from "next/dynamic";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { addSendedMail, updateDraft, deleteMail } from "../reducers/allMails";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function MailEditor(props) {
  const dispatch = useDispatch();
  const uid2 = require("uid2");
  const [showModalAlerte, setShowModalAlerte] = useState(false);
  const [alerteMessage, setAlerteMessage] = useState("");
  const [recipients, setRecipients] = useState(
    props.draftData === undefined ? "" : props.draftData.sendedTo
  );
  const [mailObject, setMailObject] = useState(
    props.draftData === undefined ? "" : props.draftData.object
  );
  const [messageContent, setMessageContent] = useState("");

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const newMessage = {
    _id: uid2(15),
    sendedTo: recipients,
    sendedBy: "user@user.com",
    object: mailObject,
    content: messageContent,
    autor: "User Name",
    deliveryDate: moment().format("YYYY-MM-DDT18:00:00Z"),
    archived: false,
    followed: false,
    important: false,
    onHold: false,
    onHoldDate: null,
    perso: false,
    principal: false,
    pro: false,
    promotion: false,
    reseaux: false,
    spam: false,
    unRead: false,
    draft: false,
  };

  const handleEditorChange = (content, delta, source, editor) => {
    setMessageContent(editor.getHTML());
  };

  const closeModalMailEditor = () => {
    props.handleCloseModalMailEditor();
  };

  const handleSendMessage = () => {
    if (newMessage.sendedTo.length === 0) {
      setShowModalAlerte(true);
      setAlerteMessage("Vous devez choisir un destinataire.");
    } else if (!regexEmail.test(newMessage.sendedTo)) {
      setShowModalAlerte(true);
      setAlerteMessage("Veuillez saisir une adresse email valide");
    } else if (newMessage.content.length === 0) {
      setShowModalAlerte(true);
      setAlerteMessage("Veuillez saisir un message.");
    } else {
      dispatch(addSendedMail(newMessage));
      console.log("newMessage :", newMessage);
      closeModalMailEditor();
    }
  };

  const handleSaveDraft = () => {
    const draftMessage = { ...newMessage, draft: true };
    props.draftData === undefined
      ? dispatch(addSendedMail(draftMessage))
      : dispatch(
          updateDraft({
            ...props.draftData,
            sendedTo: recipients,
            object: mailObject,
            content: messageContent,
          })
        );
    closeModalMailEditor();
    console.log("draft", draftMessage);
  };

  const handleDeleteDraft = () => {
    props.draftData === undefined
      ? closeModalMailEditor()
      : dispatch(deleteMail([props.draftData]));
  };

  return (
    <div className={styles.modalMailEditor}>
      <div className={styles.editorContainer}>
        {showModalAlerte && (
          <div className={styles.alerteModalContainer}>
            <div className={styles.alerteModal}>
              <div className={styles.headModalAlerte}>
                <h2>Erreur</h2>
                <div
                  className={styles.containerCloseIcon}
                  onClick={() => setShowModalAlerte(false)}
                >
                  <FontAwesomeIcon icon={faXmark} title="Fermer" />
                </div>
              </div>
              <p>{alerteMessage}</p>
              <div className={styles.modalBottom}>
                <div
                  className={styles.buttonSendding}
                  title="Fermer"
                  onClick={() => setShowModalAlerte(false)}
                >
                  Ok
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.modalHeader}>
          <span>Nouveau message</span>
          <div className={styles.topHeaderIcons}>
            <FontAwesomeIcon
              icon={faXmark}
              title="Fermer"
              onClick={() => handleSaveDraft()}
            />
          </div>
        </div>
        <div className={styles.editorInputs}>
          <input
            type="text"
            placeholder="Destinataires"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          />
          <input
            type="text"
            placeholder="Objet"
            value={mailObject}
            onChange={(e) => setMailObject(e.target.value)}
          />
        </div>
        <div>
          <QuillNoSSRWrapper
            theme="snow"
            onChange={handleEditorChange}
            defaultValue={
              props.draftData === undefined ? "" : props.draftData.content
            }
          />
        </div>

        <div className={styles.modalBottom}>
          <div
            className={styles.buttonSendding}
            title="Envoyer le message"
            onClick={() => handleSendMessage()}
          >
            Envoyer
          </div>
          <div
            className={styles.deleteIconContainer}
            title="Supprimer le brouillon"
            onClick={() => handleDeleteDraft()}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </div>
      </div>
    </div>
  );
}
