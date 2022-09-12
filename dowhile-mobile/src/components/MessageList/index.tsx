import React, { useEffect, useState } from "react";

import { ScrollView } from "react-native";
import { Text } from "react-native-svg";
import { api } from "../../services/api";
import { Message, MessageProps } from "../Message";
import io from "socket.io-client";

import { styles } from "./styles";

const socket = io(String(api.defaults.baseURL));
let messageQueue: MessageProps[] = [];

socket.on("new_message", (newMessage: MessageProps) => {
  messageQueue.push(newMessage);
});

export function MessageList() {
  const [lastMessages, setLastMessages] = useState<MessageProps[]>([]);

  const getMessages = async () => {
    try {
      const response = await api.get<MessageProps[]>("messages/last");

      setLastMessages(response.data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messageQueue.length > 0) {
        setLastMessages((prevState) => [
          messageQueue[0],
          prevState[0],
          prevState[2],
        ]);

        messageQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {lastMessages && lastMessages.length !== 0 ? (
        lastMessages.map((message) => (
          <Message key={message.id} data={message} />
        ))
      ) : (
        <Text>Não existe nenhuma mensagem.</Text>
      )}
    </ScrollView>
  );
}
