import React, { useState } from "react";

import { Alert, Keyboard, TextInput, View } from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SendMessageForm() {
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleSendMessage = async () => {
    try {
      if (!message.trim()) {
        Alert.alert("Você não pode enviar mensagens vazias!");

        return;
      }
      setSendingMessage(true);
      await api.post("messages", { message });

      setMessage("");
      Keyboard.dismiss();

      setSendingMessage(false);
      Alert.alert("Mensagem enviada!");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />
      <Button
        title="Enviar Mensagem"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleSendMessage}
      />
    </View>
  );
}
