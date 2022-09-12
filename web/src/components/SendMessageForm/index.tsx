import React, { FormEvent, useContext, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";

import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

/**
 * ### Additional Features
 * TO-DO
 ** [X] Add correct types for react function component
 ** [X] Add transition styles for filter brightness on textarea
 ** [X] Add transition styles for filter brightness on button
 ** [X] Add toast for created message
 ** [X] Create link to user github
 */

export const SendMessageForm: React.FC = () => {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const notify = () =>
    toast.success("Mensagem enviada!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (!message.trim()) {
        return;
      }

      await api.post("messages", { message });

      setMessage("");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          <a
            href={`https://github.com/${user?.login}`}
            target={"_blank"}
            className={styles.userGithubLink}
          >
            {user?.login}
          </a>
        </span>
      </header>

      <form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
        <label htmlFor="message">Mensagem</label>

        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />

        <button type="submit" onClick={notify}>
          Enviar mensagem
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};
