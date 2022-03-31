import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

function Logout({ setUser }) {
  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    handleToClose();
  }

  return (
    <div>
      <Button variant="outlined" style={{backgroundColor:"white"}} onClick={handleClickToOpen}>Logout</Button>
      <Dialog open={open} onClose={handleToClose} onSubmit={handleLogout}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleToClose} color="primary" autoFocus>No</Button>
          <Button
            onClick={handleLogout}
            color="primary"
            autoFocus
            primary="true"
          >Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Logout