import React, {useState} from "react"
import { Button, DialogTitle, Dialog, TextField, DialogContent } from "@mui/material"
import { Form } from "react-bootstrap"
import AccountCircle from "@mui/icons-material/AccountCircle"
import { createTheme } from "@mui/material"

function EditUser({user}){
  const [email, setEmail] = useState([])
  const [username, setUsername] = useState([])
  const [open, setOpen] = React.useState(false)

  const handleClickToOpen = () => {
    setOpen(true)
  }

  const handleToClose = () => {
    setOpen(false)
  }

  function handleSubmit(e){
    e.preventDefault()
  }

  return(
    <>
      {/* <Button sx={{color:"white"}} onClick={handleClickToOpen} ><AccountCircle/></Button> */}
      {/* <Dialog open={open} onClose={handleToClose} onSubmit={handleSubmit} > */}
        {/* <DialogTitle>{"Edit User Details"}</DialogTitle> */}
        {/* <DialogContent> */}
          <Form style={{marginTop: "5%", padding: "5%", width:"600px", display:"flex", margin:"auto"}}>
            <TextField 
              required
              variant="outlined"
              id="outline-required"
              label="UserName"
              name='username'
              defaultValue={user?.username}
              onChange={e=>setUsername(e.target.value)}
            ></TextField>
            <TextField 
              required
              variant="outlined"
              id="outline-required"
              label="Email"
              name='email'
              defaultValue={user?.email}
              onChange={e=>setEmail(e.target.value)}
            ></TextField>
      <Button type="submit" color="primary" >Submit</Button>
      <Button onClick={handleToClose} color="secondary" >Close</Button>
          </Form>
        {/* </DialogContent> */}
      {/* </Dialog> */}
    </>
  )
}
export default EditUser