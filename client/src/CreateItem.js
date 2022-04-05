import { Form } from "react-bootstrap"
import { useState } from "react"
import EmojiPicker from "emoji-picker-react"
import { AccordionDetails, InputLabel, MenuItem, FormControl, Accordion, AccordionSummary, Typography, TextField, Button, Select, Switch, FormGroup, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { toast, Flip } from "react-toastify"
import { useNavigate } from "react-router-dom"

function CreateItem({categories}){
  const [name, setName] = useState("")
  const [extension, setExtension] = useState(1)
  const [emoji, setEmoji] = useState("")
  const [expanded, setExpanded] = useState(false)
  const [perishable, setPerishable] = useState(false)
  const [storage, setStorage] = useState()
  const [extType, setExtType] = useState()
  const [category, setCategory] = useState("")
  const navigate = useNavigate()

  const handlePerishableChange = (event) => {
    setPerishable(event.target.checked)
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  function handleEmoji(e){
    setEmoji(e.target.src)
    setExpanded(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch("/create-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        extension: extension,
        perishable: perishable,
        storage: storage,
        ext_type: extType,
        category_id: category
       }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((item) => console.log(item))
        navigate(0)
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

  return(
    <div className="create-item">
      <Form onSubmit={handleSubmit} style={{width:600}}>

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

        <FormControl sx={{m: 2 }}>
          <InputLabel id="categories">Categories</InputLabel>
            <Select
              id="category"
              required
              variant="outlined"
              label= "Category"
              name= "category"
              value={category}
              onChange={e=>setCategory(e.target.value)}>
              {categories.map(category => {
                return (
                  <MenuItem key={category.id} id={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                )
              })}
            </Select>
        </FormControl>

        <FormGroup sx={{display:"flex", flexDirection:"row", justifyContent:"space-between", m:2}}>
          <FormControl>
            <FormLabel id="ext_type"/>
            <RadioGroup row name="ext_type" onChange={e=>setExtType(e.target.value)} >
              <FormControlLabel value={1} control={<Radio />} label="Day"/>
              <FormControlLabel value={2} control={<Radio />} label="Week"/>
              <FormControlLabel value={3} control={<Radio />} label="Month"/>
              <FormControlLabel value={4} control={<Radio />} label="Year"/>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="storage"/>
              <RadioGroup row name="storage" onChange={e=>setStorage(e.target.value)} >
                <FormControlLabel value={1} control={<Radio />} label="Dry"/>
                <FormControlLabel value={2} control={<Radio />} label="Cooler"/>
                <FormControlLabel value={3} control={<Radio />} label="Freezer"/>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormControlLabel
                label="Perishable"
                control={
                <Switch
                  checked={perishable}
                  onChange={handlePerishableChange}
                  position="left"
                />}
              />
            </FormControl>
          </FormGroup>
        
        <FormControl sx={{m:2}}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {emoji? <img style={{margin:"auto"}} src={emoji} alt="emoji"/> :
              <Typography sx={{ margin: "auto"}}>
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
    </div>
  )
}
export default CreateItem