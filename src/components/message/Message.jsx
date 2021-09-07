import "./message.css";
import { format } from "timeago.js";
import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../context/auth";

export default function Message({ message, own }) {
  const { user,fetchUser } = useContext(AuthContext);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={ user.profilePicture }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
