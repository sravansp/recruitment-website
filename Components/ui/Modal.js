"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody as MaterialDialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function Modal1({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  buttonLabel,
  dialogHeader,
  dialogBody,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose && onClose(); // Call onClose if provided
  };

  const handleConfirm = () => {
    onConfirm && onConfirm(); // Call onConfirm if provided
    handleClose();
  };

  const handleCancel = () => {
    onCancel && onCancel(); // Call onCancel if provided
    handleClose();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button onClick={() => setOpen(true)} variant="gradient">
        {buttonLabel || "Open Dialog"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogHeader>{dialogHeader || "Dialog Header"}</DialogHeader>
        <MaterialDialogBody>
          {dialogBody || "Dialog Body"}
        </MaterialDialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancel}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      </div>
  );
}
