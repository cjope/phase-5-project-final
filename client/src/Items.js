import { ListItem, Grid, Stack, Paper, Card, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Items({items, setSelectedItem, user}) {
  const navigate = useNavigate()

  function handleViewItem(item){
      setSelectedItem(item)
    navigate("/item-detail")
  }

  function handleLikeItem(e){
    let id = e.value
    let liked = e.name
    liked === "♡" ? addItem(id) : deleteItem(id)
    navigate(0)
  }

  function addItem(id){
    fetch(`/add_user_item/${id}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id: id }),
    })
  }

  function deleteItem(id){
    fetch(`/delete_user_item/${id}`, {
      method: "DELETE",
    })
  }

  const listAllItems = items?.map(item => {
    let like = ""
    let liked = user?.items?.filter(i=>i.id === item.id)
    liked?.length>0 ? like = "♥" : like = "♡"
 
    return(
      <div key={item.id}>
        <Grid>
          <Stack spacing={2}>
            <ListItem>
              <Paper 
                elevation={10}
                sx={{p:2, width:300, fontSize:25, cursor: "pointer"}}
                onClick={e=>handleViewItem(item)}
              >{item.name}
              </Paper>
              
              <Button
                name={like}
                value={item.id}
                onClick={e=>handleLikeItem(e.target)}
              >
                {like}
              </Button>
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