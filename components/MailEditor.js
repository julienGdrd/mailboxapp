import "react-quill/dist/quill.snow.css";
import styles from "../styles/MailEditor.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import "moment/locale/fr";
import dynamic from "next/dynamic";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addSendedMail } from "../reducers/allMails";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function MailEditor(props) {
  const dispatch = useDispatch();
  const uid2 = require('uid2');

  const [recipients, setRecipients] = useState([]);
  const [mailObject, setMailObject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const closeModalMailEditor = () => {
    props.handleCloseModalMailEditor();
  };

  const handleEditorChange = (content, delta, source, editor) => {
    setMessageContent(editor.getHTML());
  };
  console.log("recipients", recipients);
  console.log("object", mailObject);
  console.log("content", messageContent);

  const handleSendMessage = () => {
    const newMessage = {
      _id : uid2(32),
      sendedTo : recipients,
      sendedBy : 'user@user.com',
      object : mailObject,
      content : messageContent,
      autor : 'User Name',
      deliveryDate : moment().format("YYYY-MM-DDT18:00:00Z"),
      archived: false,
      followed : false,
      important : false,
      onHold : false,
      onHoldDate : null,
      perso : false,
      principal : false,
      pro : false,
      promotion : false,
      reseaux : false,
      spam : false,
      unRead : false,
    }
    dispatch(addSendedMail(newMessage))
    console.log('newMessage :', newMessage)
    closeModalMailEditor();
  }

  return (
    <div className={styles.editorContainer}>
      <div className={styles.modalHeader}>
        <span>Nouveau message</span>
        <div className={styles.topHeaderIcons}>
          <FontAwesomeIcon
            icon={faXmark}
            title="Fermer"
            onClick={() => closeModalMailEditor()}
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
        />
      </div>

      <div className={styles.modalBottom}>
        <div className={styles.buttonSendding} 
        title="Envoyer le message"
        onClick={() => handleSendMessage()}
        >
          Envoyer
        </div>
        <div
          className={styles.deleteIconContainer}
          title="Supprimer le brouillon"
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
      </div>
    </div>
  );
}
