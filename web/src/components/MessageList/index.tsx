import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";
import { io } from "socket.io-client";
import { Message } from "../../types/MessageType";

let messageQueue: Message[] = [];

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: Message) => {
  messageQueue.push(newMessage);
});

/**
 * ### Additional Features
 * TO-DO
 ** [X] Add transition styles for filter brightness on button
 ** [X] Split types into another file
 ** [X] Create getMessages with trycatch
 */

export const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const getMessages = async () => {
    try {
      const response = await api.get<Message[]>("messages/last");

      setMessages(response.data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (messageQueue.length > 0) {
        setMessages((prevState) =>
          [messageQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );

        messageQueue.shift();
      }
    }, 3000);
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages && messages.length !== 0 ? (
          messages.map((message) => {
            return (
              <li className={styles.message} key={message.id}>
                <p className={styles.messageContent}>{message.text}</p>
                <div className={styles.messageUser}>
                  <div className={styles.userImg}>
                    <img
                      src={message.user.avatar_url}
                      alt={message.user.name}
                    />
                  </div>
                  <span key={message.user.id}>{message.user.name}</span>
                </div>
              </li>
            );
          })
        ) : (
          <p>Não existe nenhuma mensagem</p>
        )}
      </ul>
    </div>
  );
};
