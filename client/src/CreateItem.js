import { Form } from "react-bootstrap"
import { useState } from "react"
import EmojiPicker from "emoji-picker-react"
import { AccordionDetails, InputLabel, MenuItem, FormControl, Accordion, AccordionSummary, Typography, TextField, Button, Select } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { toast, Flip } from "react-toastify"

function CreateItem(){
  const [timeframe, setTimeframe] = useState("")
  const [name, setName] = useState(null)
  const [extension, setExtension] = useState(null)
  const [open, setOpen] = useState(false)
  const [emoji, setEmoji] = useState("")
  const [expanded, setExpanded] = useState(false)

  function handleClose(){
    setOpen(false)
  }

  function handleOpen(){
    setOpen(true)
  }

  function handleEmoji(e){
    setEmoji(e.target.src)
    setExpanded(false)
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/new-item", {
      method: "POST",
      body: JSON.stringify({name, timeframe, extension, emoji}),
    }).then((r) => {
      if (r.ok) {
        r.json().then((item) => console.log(item))
      } else {
        toast.error(`Item ${r.statusText}`, {
          autoClose: 1000,
          hideProgressBar: true,
          transition: Flip,
          position: "top-center"
        })
      }
    })
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return(
    <div className="create-item">
      <Form onSubmit={handleSubmit}>
        <FormControl sx={{m: 2 }}>
          <TextField 
            required
            variant="outlined"
            label= "Name"
            name= "name"
            onChange={e=>setName(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{m: 2 }}>
          <TextField 
            required
            variant="outlined"
            label= "Extension"
            name= "extension"
            type="number"
            onChange={e=>setExtension(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{m:2}}>
          <InputLabel>Timeframe</InputLabel>
          <Select
            label="Timeframe"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={timeframe}
            variant="outlined"
            onChange={e=>  setTimeframe(e.target.value)}
          >
            <MenuItem value="">
              <em>Select One</em>
            </MenuItem>
            <MenuItem value="Day">Day</MenuItem>
            <MenuItem value="Week">Week</MenuItem>
            <MenuItem value="Month">Month</MenuItem>
            <MenuItem value="Year">Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{m:2}}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {emoji? <img style={{margin:"auto"}} src={emoji} alt="emoji"/> :
              <Typography sx={{ margin: "auto"}} >
                Choose an Emoji
              </Typography>}
            </AccordionSummary>
          <AccordionDetails>
            {emoji? <img style={{margin:"auto"}} src={emoji} alt="emoji"/> : <></>}
            <EmojiPicker
              disableSkinTonePicker={true}
              onEmojiClick={handleEmoji}
            />
          </AccordionDetails>
        </Accordion>
      </FormControl>
      <Button type="submit">Confirm</Button>
    </Form>


    {/* make this a function */}
    <h1> Results: </h1>
      {timeframe ?
        <div>
          <h1>Set {name.toLowerCase()} to be consumed within <em>{extension.toLocaleString()} {extension > 1 ? timeframe.toLowerCase() + "s" 
          : timeframe.toLowerCase()}</em> past its expiration date?</h1></div>:<></>
      }
    </div>  
  )
}
export default CreateItem