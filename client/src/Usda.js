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

      console.log(usda)
    const displayUsda = usda?.foods.map(food=>(
        <Grid key={food.id} item xs={3}>
        <Item>
          <p className="us1">{food.description}</p>
          <div>
            <p><strong>Category</strong>: {food.foodCategory}</p>
            <Button size="small" variant="contained" onClick={handleClickToOpen} color="primary" autoFocus>
                Nutritional Facts
            </Button>
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Nutritional Facts"}</DialogTitle>
                <DialogContent>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <p>-{food.foodNutrients[0].derivationDescription}</p>
                        <small><strong>Serving Size (house): </strong>{food.householdServingFullText}</small>
                        <small><strong>Serving Size (indv): </strong>{food.servingSize} {food.servingSizeUnit}</small>
                    </div>
                    {food.foodNutrients.map(nut=>(
                        <div key={nut.nutrientId} style={{display:"flex",flexDirection:"column"}}>
                            <p><strong>{nut.nutrientName}</strong>: {nut.nutrientNumber} {nut.unitName}</p>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions sx={{justifyContent:"center"}}>
                    <Button onClick={handleToClose} variant="contained" color="success" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
          </div>
        </Item>
        </Grid>
    ))


    return(
        <div className="us2">
            <Card id="header" variant="outlined">USDA SEARCH</Card>
            <TextField id="outlined-search" variant="outlined" label="Search field" type="search" autoSave='false' onChange={handleSearchInput}/>
            <Button variant="outlined" size="large" onClick={handleUsdaSearch} disabled={disable}>Search</Button>
            <Box>
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