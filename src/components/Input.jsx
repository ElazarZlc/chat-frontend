import React, { useState, useRef } from "react";
import { TextareaAutosize, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Logo from "/Logo.png";
import me from "./me.js";


const Input = ({ selected, socket, setAllMsg }) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // socket.emit("activity", selected)
  };
  function enter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleButtonClick();
    }
  }

  const handleButtonClick = () => {
    function getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");

      return `${hours}:${minutes}`;
    }

    const message = {
      from: me().name,
      to: selected,
      text: inputValue,
      timestamp: getCurrentTime() + "  " + new Date().toLocaleDateString(),
      typeDate: new Date()
    };

    if (inputValue.trim() !== "") {
      setAllMsg(message);
    }

    if (socket && inputValue.trim() !== "") {
      
      socket.emit("message", message);
    }

    setInputValue("");

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  if (!selected) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#21213E",
          minHeight: "100vh",
        }}
      >
        <img src={Logo} alt="Logo.png" />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "fixed",
          bottom: "0",
          right: "0",
          width: "80%",
        }}
      >
        <TextareaAutosize
          ref={textareaRef}
          aria-label="empty textarea"
          placeholder="Type a message"
          value={inputValue}
          maxRows={1}
          onChange={handleInputChange}
          onKeyDown={enter}
          style={{
            width: "100%",
            minHeight: "20px",
            padding: "8px",
            resize: "none",
          }}
        />
        <Button
          variant="contained"
          onClick={handleButtonClick}
          sx={{
            backgroundColor: "#F6C927",
            borderRadius: "0 4px 4px 0",
            color: "black",
          }}
        >
          <SendIcon />
        </Button>
      </Box>
    );
  }
};

export default Input;
