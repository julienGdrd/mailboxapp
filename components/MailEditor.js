import "react-quill/dist/quill.snow.css";
import styles from "../styles/MailEditor.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import dynamic from "next/dynamic";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addSendedMail } from "../reducers/sendedMails";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function MailEditor(props) {
  const dispatch = useDispatch();


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
      recipients : recipients,
      object : mailObject,
      content : messageContent,
      autor : 'userName',
      sendingDate : new Date,
    }
    dispatch(addSendedMail(newMessage))
    console.log('newMessage :', newMessage)
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
