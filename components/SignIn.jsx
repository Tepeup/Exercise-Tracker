import {
  signInWithGoogle,
  signInWithGithub,
  signInWithTwitter,
  signinAnonymously,
} from "../firebase/firebase.utils";
import {
  faGoogle,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SignIn() {
  return (
    <div className="login-card">
      <span className="signin-title">START TRACKING YOUR JOURNEY</span>

      <button onClick={signInWithGoogle}>
        <FontAwesomeIcon icon={faGoogle} />
        <div className="button-title">Login via Google</div>
      </button>
      <button onClick={signInWithGithub}>
        <FontAwesomeIcon size={"small"} icon={faGithub} />
        <div className="button-title"> Login via Github</div>
      </button>
      <button onClick={signinAnonymously} className="preview-button">
        <FontAwesomeIcon icon={faEye} />
        <div className="button-title">preview</div>
      </button>

      {/* <button onClick={signInWithTwitter}>
        <FontAwesomeIcon size={"small"} icon={faTwitter} />
        <div className="button-title">Login via Twtiter</div>
      </button> */}
    </div>
  );
}
