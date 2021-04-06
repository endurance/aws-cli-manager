import React from "react";
import { AddNewButton } from "./AddNewButton";
import { renderModal } from "@enduranceidehen/modal-manager";
import { AddCredentialsDialog } from "./AddCredentialsDialog";


export const AddNewCredentialsButton = () => {
  const handleClick = () => {
    renderModal(props => <AddCredentialsDialog {...props} />);
  }
  return (
    <AddNewButton tooltip={"New Credential"} onClick={handleClick}/>
  )
}
