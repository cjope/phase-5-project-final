import React from "react";
import { Dialog, DialogTitle, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Logout({ setUser, user }) {
  const navigate = useNavigate()

  const handleToClose = () => {
    navigate("/")
  }

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
    })
    setUser()
    handleToClose()
  }

  return (
    <div className="lo">
          <Dialog open={true} onClose={handleToClose} onSubmit={handleLogout}>
          <DialogTitle>{"Are you sure?"}</DialogTitle>
          <div style={{display:"flex", justifyContent:"space-around", margin:5}}>
            <Button onClick={handleToClose} variant="contained" color="secondary">No</Button>
            <Button onClick={handleLogout} variant="contained" color="primary" primary="true">Yes</Button>
          </div>
        </Dialog>
    </div>
  )
}
export default Logout