import React, { type Dispatch, type SetStateAction, ChangeEvent } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Telegram } from "@mui/icons-material";

interface ChatInputProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  handleInputClick: () => void;
}

export const ChatInput = (props: ChatInputProps) => {
  const { inputValue, setInputValue, handleInputClick } = props;

  return (
    <div className="w-full">
      <TextField
        fullWidth
        hiddenLabel
        value={inputValue}
        id="fullWidth"
        autoFocus
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="fingerprint"
                color="success"
                onClick={() => {
                  handleInputClick();
                }}
              >
                <Telegram />
              </IconButton>
            </InputAdornment>
          ),
          style: {
            borderRadius: 10,
            marginBottom: 15,
          },
        }}
        onChange={(
          event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setInputValue(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleInputClick();
          }
        }}
      />
    </div>
  );
};
