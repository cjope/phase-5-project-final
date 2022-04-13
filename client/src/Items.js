import { ListItem, Grid, Stack, Paper, Typography, Button, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from 'react';

function Items({items, setSelectedItem, user, categories}) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }  

  function handleViewItem(item){
      setSelectedItem(item)
    navigate("/item-detail")
  }

  function handleLikeItem(e){
    let id = e.value
    let like = e.name
    console.log(like==="none")
    like === "none" ? addItem(id) : deleteItem(id)
  }

  function addItem(id){
    fetch(`/add_user_item/${id}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id: id }),
    })
    navigate(0)
  }

  function deleteItem(id){
    fetch(`/delete_user_item/${id}`, {
      method: "DELETE",
    })
    navigate(0)
  }

  const listCategories = categories.map(category => (
    
    <Accordion
      key={category.id}
      expanded={expanded === `panel${category.id}`}
      onChange={handleChange(`panel${category.id}`)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
        <Typography>
          {category.name}
        </Typography>
      </AccordionSummary>
      {category.items.map(item=>{
        let like = null
        let liked = user?.items?.filter(i=>i.id === item.id)
        liked?.length>0 ? like = "warning" : like = "none"

        return(

        <AccordionDetails key={item.id}>
          <Grid>
          <Stack spacing={2}>
            <ListItem>
              <Button onClick={e=>handleViewItem(item)}
              >
              <Paper 
                elevation={10}
              >{item.name}
              </Paper>
              </Button>
              {user?.is_admin? <></>:
              <IconButton
                name={like}
                value={item.id}
                onClick={e=>handleLikeItem(e.currentTarget)}
              >
              <FavoriteIcon color={like} ></FavoriteIcon>
              </IconButton>
              }

            </ListItem>

          </Stack>
        </Grid>
        </AccordionDetails>
      )})}
    </Accordion>
  ))

  return (
      <div className='i1'>
        {listCategories}
    </div>
  )
}
export default Items