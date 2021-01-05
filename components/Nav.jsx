import { auth } from "../firebase/firebase.utils";
import styles from "../styles/Home.module.css";
import {
  faSignOutAlt,
  faTh,
  faThList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

export default function Nav(props) {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <button
            title="Toggle View"
            className="mini-button"
            onClick={props.miniClick}
          >
            {props.mini ? (
              <FontAwesomeIcon icon={faThList} />
            ) : (
              <FontAwesomeIcon icon={faTh} />
            )}
          </button>
        </li>
        <li>{props.user.displayName ? props.user.displayName : "Welcome"}</li>

        <li>
          <button title="Sign Out" onClick={() => auth.signOut()}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
