import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

function Logout({ setUser, user }) {
  const [open, setOpen] = React.useState(true)
  const navigate = useNavigate()

  const handleToClose = () => {
    setUser()
    setOpen(false)
    navigate("/")
  }

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
      }
    })
    handleToClose()
  }

  return (
    <div>
          <Dialog open={open} onClose={handleToClose} onSubmit={handleLogout}>
          <DialogTitle>{"Are you sure?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleToClose} color="primary">No</Button>
            <Button
              onClick={handleLogout}
              color="primary"
              primary="true"
            >Yes
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}
export default Logout