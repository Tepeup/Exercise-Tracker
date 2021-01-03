import { auth } from "../firebase/firebase.utils";
import styles from "../styles/Home.module.css";

import React from "react";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          {" "}
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
}
