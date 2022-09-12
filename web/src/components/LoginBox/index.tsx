import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { VscGithub } from "react-icons/vsc";

import { AuthContext } from "../../contexts/AuthContext";

/**
 * ### Additional Features
 * TO-DO
 ** [X] Add transition styles for filter brightness on link
 */

export const LoginBox: React.FC = () => {
  const { signInUrl } = useContext(AuthContext);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithub size="24" /> Entrar com Github
      </a>
    </div>
  );
};
