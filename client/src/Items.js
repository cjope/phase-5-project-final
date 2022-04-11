import { ListItem, Grid, Stack, Paper, Card, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Items({items, setSelectedItem, user}) {
  const navigate = useNavigate()

  function handleViewItem(item){
      setSelectedItem(item)
    navigate("/item-detail")
  }

  function handleLikeItem(e){
    let id = e.value
    let like = e.name
    console.log(like==="none")
    like === "none" ? addItem(id) : deleteItem(id)
    // navigate(0)
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

  const listAllItems = items?.map(item => {
    let like = null
    let liked = user?.items?.filter(i=>i.id === item.id)
    liked?.length>0 ? like = "warning" : like = "none"
 
    return(
      <div key={item.id}>
        <Grid>
          <Stack spacing={2}>
            <ListItem>
              <Button onClick={e=>handleViewItem(item)}
              >
              <Paper 
                elevation={10}
                sx={{p:2, width:300, fontSize:25}}
              >{item.name}
              </Paper>
              </Button>
              
              <IconButton
                name={like}
                value={item.id}
                onClick={e=>handleLikeItem(e.currentTarget)}
              >
              <FavoriteIcon color={like} ></FavoriteIcon>
              </IconButton>

            </ListItem>

          </Stack>
        </Grid>
      </div>
    )
  })

  return (
      <div className='i1'>
        {listAllItems}
    </div>
  )
}
export default Items