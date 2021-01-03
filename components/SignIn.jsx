import { signInWithGoogle } from "../firebase/firebase.utils";
import {
  faGoogle,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SignIn() {
  return (
    <div className="login-card">
      <span className="signin-title">START TRACKING YOUR JOURNEY</span>

      <button onClick={signInWithGoogle}>
        <FontAwesomeIcon size={"small"} icon={faGoogle} />
        <div className="button-title">Login via Google</div>
      </button>
      <button onClick={signInWithGoogle}>
        <FontAwesomeIcon size={"small"} icon={faTwitter} />
        <div className="button-title">Login via Twtiter</div>
      </button>
      <button onClick={signInWithGoogle}>
        <FontAwesomeIcon size={"small"} icon={faGithub} />
        <div className="button-title"> Login via Github</div>
      </button>
    </div>
  );
}
