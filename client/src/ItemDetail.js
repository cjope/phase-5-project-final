import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, Card, IconButton, Paper, Stack } from '@mui/material';
import { CalendarPicker } from '@mui/lab';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';

const pastDate = new Date().getFullYear()-3
const futureDate = new Date().getFullYear()+5
const minDate = new Date(pastDate, 1, 1)
const maxDate = new Date(futureDate, 1, 1)

function ItemDetail({item, user}) {
    const [date, setDate] = useState(new Date())
    const _MS_PER_DAY = 1000 * 60 * 60 * 24
    const navigate = useNavigate()

    useEffect(() => {
        if(!item.id){
        navigate("/items")
        }
    },[item, navigate])

    function dateCalc(){
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let d = item.extension
    let t = item.ext_type
        if (t === 1){
            day = day + d
        }
        else if (t === 2) {
            day = day + (d * 7)
        }
        else if (t === 3) {
            month = month + d
        } else {
            year = year + d
        }
        return new Date(year, month, day).toDateString()
    }

    dateCalc()

    function dateDiffInDays(a, b) {
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
        return Math.floor((utc2 - utc1) / _MS_PER_DAY)
    }

    const a = new Date(),
          b = new Date(dateCalc()),
          difference = dateDiffInDays(a, b)

    function handleDatePick(e){
        setDate(e)
    }

    function handleDeleteItems(){
        fetch(`/delete_item/${item.id}`,{
          method: "DELETE"
        })
      }

      function handleAddItem(e){
        fetch(`/add_user_item/${item.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ item_id: item.id }),
        })
      }

    return (
        <div className='id1' >
            <div style={{display:"flex", justifyContent:"center"}} >
                <IconButton onClick={e=>navigate("/items")} ><ArrowBackIcon color="primary"/>Items</IconButton>
                <div className='id-sum'>
                    <Paper elevation={20}>Will expire {difference} days from today</Paper>
                </div>
                {user?.is_admin ?
                    <div className='id5'>
                        <Button disabled>
                            <EditIcon/>
                        </Button>
                        <Button onClick={handleDeleteItems}>
                            <DeleteIcon/>
                        </Button>
                    </div>
                    :
                    <IconButton onClick={handleAddItem}>
                        Add <FavoriteIcon color='primary'/>
                    </IconButton>
                }
            </div>

            <div className='id2'>
                <div className="id-info">
                    <Paper elevation={10}>{item.name}</Paper>
                    <Card elevation={10}>
                        <Paper elevation={10} >Item is {item.perishable ? "Perishable":"Shelf Stable"}</Paper>
                        <Paper elevation={10} >Storage Type: {item.storage_type}</Paper>
                    </Card>
                    <Card elevation={10}>
                        <h3>Expiration Date</h3>
                        <Paper elevation={10}>{date.toDateString()}</Paper>
                    </Card>
                </div>
                
                <div className='id-info'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Paper xs={12} md={6} elevation={10}>
                                <CalendarPicker 
                                date={date}
                                minDate={minDate}
                                maxDate={maxDate}
                                onChange={e => handleDatePick(e)}
                                />
                            </Paper>
                            <Paper elevation={10}>
                                <h3>Can be Extended {item.timeframe} to:</h3>
                                <Paper elevation={10}>{dateCalc()}</Paper>
                            </Paper>
                    </LocalizationProvider>
                </div>
            </div>
        </div>
    )
}
export default ItemDetail