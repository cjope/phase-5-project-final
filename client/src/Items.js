import { ListItem, Grid, Stack, Paper, Typography, Button, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from 'react';

function Items({items, setSelectedItem, user, categories, updateLike}) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  function handleViewItem(item) {
    setSelectedItem(item);
    navigate("/item-detail");
  }

  function handleLikeItem(e) {
    let id = e.id;
    let like = JSON.parse(e.value);
    like ? deleteItem(id) : addItem(id);
  }

  function addItem(id) {
    fetch(`/add_user_item/${id}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({item_id: id})
    })
    updateLike();
  }

  function deleteItem(id) {
    fetch(`/delete_user_item/${id}`, {method: "DELETE"})
    updateLike();
  }

  const listCategories = categories.map(category => (
    <Accordion
      key={category.id}
      expanded={expanded === `panel${category.id}`}
      onChange={handleChange(`panel${category.id}`)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
        <Typography>{category.name}</Typography>
      </AccordionSummary>
        {category.items.map(item => (
          <AccordionDetails key={item.id}>
            <Grid>
              <Stack spacing={2}>
                <ListItem>
                  <Button onClick={e=>handleViewItem(item)}>
                    <Paper elevation={10}>{item.name}</Paper>
                  </Button>
                  {user?<>
                  {user?.is_admin?<></>:
                    <IconButton id={item.id} value={item.liked} onClick={e=>handleLikeItem(e.currentTarget)}>
                      <FavoriteIcon color={item.liked? "warning" : "none"} ></FavoriteIcon>
                    </IconButton>
                  }</>:<></>
                }
                </ListItem>
              </Stack>
            </Grid>
          </AccordionDetails>
        ))}
      </Accordion>
    ));

  return (
      <div className='i1'>
          <div>
            {listCategories}
          </div>
    </div>
  )
}
export default Items