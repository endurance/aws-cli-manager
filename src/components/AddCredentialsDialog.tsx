import { Button, Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { AddCredentialsForm } from "./AddCredentialsForm";
import React, { useState } from "react";
import { useAsync } from "react-use";

export const AddCredentialsDialog = (props) => {
  const [formStateChange, setState] = useState();
  const [existingProfile, setProfile] = useState();
  
  const handleSubmission = () => {
    if (props.initialProfileByName) {
      window.electron.editProfile(props.initialProfileByName, formStateChange);
    } else {
      window.electron.addNewProfile(formStateChange);
    }
    props.onClose();
    // TODO: implement event emitters or Redux to handle out of band updates
    window.location.reload()
  }
  
  const grabProfileByName = async () => {
    const profile = await window.electron.getProfileByName(props.initialProfileByName);
    setProfile(profile);
  }
  
  useAsync(grabProfileByName);
  return (
    <Dialog {...props}>
      <DialogContent>
        <AddCredentialsForm key={existingProfile} initialState={existingProfile} onChange={(data) => {
          setState(data)
        }} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmission} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
