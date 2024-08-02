"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from "@mui/material";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export function ChatAiKeyDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [aiKey, setAiKey] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="font-medium">
        {"请填写 key 值"}
      </DialogTitle>
      <DialogContent className="w-[40vw] min-w-[300px]">
        <Input
          autoFocus
          value={aiKey}
          className="w-full"
          onChange={(e) => {
            const value = e.target.value;
            setAiKey(value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{"取消"}</Button>
        <Button
          onClick={() => {
            localStorage.setItem("aiKey", aiKey);
            handleClose();
          }}
        >
          {"确认"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
