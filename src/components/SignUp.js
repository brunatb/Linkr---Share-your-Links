/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import axios from "axios";
import { useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";

import Forms from "./Forms";
import UserContext from "../contexts/UserContext";

export default function SignUp({ setTask }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const { setUser, setUserToken } = useContext(UserContext);
  const history = useHistory();

  function verifyInputs() {
    if (
      email === "" ||
      password === "" ||
      username === "" ||
      pictureUrl === ""
    ) {
      alert("Preencha todos os campos");
    } else {
      setSigningUp(true);
      const request = axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_up",
        { email, password, username, pictureUrl }
      );
      request
        .then((props) => {
          setUser(props.data);
          setUserToken(props.data.token);
          history.push("/timeline");
        })
        .catch((err) => {
          console.log(err.response);
          alert("Email já cadastrado!");
          setSigningUp(false);
        });
    }
  }

  return (
    <>
      <Forms>
        <input
          type="email"
          name="email"
          placeholder="e-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="text"
          name="user"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="url"
          name="picture"
          placeholder="picture url"
          onChange={(e) => setPictureUrl(e.target.value)}
          value={pictureUrl}
        />
        <button onClick={verifyInputs} type="submit" disabled={signingUp}>
          Sign Up
        </button>
      </Forms>
      <p onClick={() => setTask(true)}>Switch back to log in</p>
    </>
  );
}
