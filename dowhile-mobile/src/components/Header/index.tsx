import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import LogoSvg from "../../screens/assets/logo.svg";
import { UserPhoto } from "../UserPhoto";
import { useAuth } from "../../hooks/useAuth";

export function Header() {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        <TouchableOpacity>
          {user && (
            <Text style={styles.logoutText} onPress={signOut}>
              Sair
            </Text>
          )}
        </TouchableOpacity>

        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}
