import React from "react";

import { View } from "react-native";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { useAuth } from "../../hooks/useAuth";

export function SignInBox() {
  const { signIn, isSigningIn } = useAuth();

  return (
    <View>
      <Button
        icon="github"
        title="Entrar com Github"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        onPress={signIn}
        isLoading={isSigningIn}
      />
    </View>
  );
}
