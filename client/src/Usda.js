import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, TextField } from "@mui/material"
import { useState } from "react"
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

function Usda(){
    const [usda, setUsda] = useState(null)
    const usdaKey = "YWMOWmMzoBb8bITGY9warb3z1GH5J0z8zu9rENfs"
    const [open, setOpen] = useState(false)
    const [usdaSearch, setUsdaSearch] = useState("")
    const [disable, setDisable]=useState(true)

    function handleSearchInput(e){
        setUsdaSearch(e.target.value)
        e.target.value === "" ? setDisable(true): setDisable(false)
    }
    
    const handleClickToOpen = () => {
        setOpen(true)
      }
    
    const handleToClose = () => {
        setOpen(false)
    }

    function handleUsdaSearch(e){
        e.preventDefault()
        fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${usdaKey}&pageSize=20&query=${usdaSearch}`)
        .then(r => r.json())
        .then(usda => setUsda(usda))
      }

    const displayUsda = usda?.foods.map(food=>(
        <Grid key={food.fdcId} item xs={3}>
        <Item>
          <h2 style={{textAlign:"center"}}>{food.description}</h2>
          <div>
          <p><strong>Category</strong>: {food.foodCategory}</p>
          <Button key={food.fdcId} size="small" variant="outlined" onClick={handleClickToOpen} color="primary" autoFocus>Nutritional Facts</Button>
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Nutritional Facts"}</DialogTitle>
                <DialogContent>
                    {food.foodNutrients.map(nut=>(
                        <div key={nut.nutrientId}><p><strong>{nut.nutrientName}</strong>: {nut.nutrientNumber} {nut.unitName}</p></div>
                    ))}
                </DialogContent>
                <DialogActions sx={{justifyContent:"center"}}>
                    <Button onClick={handleToClose} variant="outlined" color="primary" autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
          </div>
        </Item>
        </Grid>
    ))


    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <Card variant="outlined" sx={{m:5,fontSize:50, textAlign:"center"}}>USDA SEARCH</Card>
            <TextField id="outlined-search" variant="outlined" sx={{m:2}} label="Search field" type="search" autoSave='false' onChange={handleSearchInput}/>
            <Button variant="outlined" size="large" sx={{p:2, m:2}} onClick={handleUsdaSearch} disabled={disable}>Search</Button>
            <Box sx={{m:2 }}>
                <Grid
                    container 
                    direction="row"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    rowSpacing={1} 
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {displayUsda}
                </Grid>
            </Box>
        </div>
    )
}
export default Usda