import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Paper, Stack } from '@mui/material';
import { CalendarPicker } from '@mui/lab';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { differenceInMonths, differenceInWeeks, differenceInYears } from 'date-fns';

const pastDate = new Date().getFullYear()-3
const futureDate = new Date().getFullYear()+5
const minDate = new Date(pastDate, 1, 1)
const maxDate = new Date(futureDate, 1, 1)

function ItemDetail({item}) {
    const [date, setDate] = useState(new Date())
    const [clicked, setClicked] = useState(false)
    const _MS_PER_DAY = 1000 * 60 * 60 * 24

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

    let date1 = new Date()
    // let date2 = dateCalc()
    const a = new Date(),
          b = new Date(dateCalc()),
          difference = dateDiffInDays(a, b),
          diffYears = differenceInYears(a, b),
          diffWeeks = differenceInWeeks(a,b),
          diffMonths = differenceInMonths(a,b)

    function handleDatePick(e){
        setDate(e)
        setClicked(true)
    }

    console.log(diffYears)
    console.log(diffMonths)
    console.log(diffWeeks)

  
    return (
        <div>
            <Paper elevation={10} sx={{p:2, width:750, m:"auto", mt:5, textAlign:"center", fontSize:25}}>
                { clicked & item.id ? `Will expire ${difference} days from today`: "Pick a date"}
            </Paper>
            <div style={{textAlign: "center", display:"flex", flexDirection:"row", justifyContent:"center",  alignItems:"center"}}>
                <div style={{display:"flex", justifyContent:"space-around", flexDirection:"row", marginTop:20, marginRight: 25}}>
                    <Stack spacing={6}>
                        <Paper elevation={10} sx={{p:2, width:340, paddingBottom:6, paddingTop:6  }} style={{fontSize:25}}>
                            {item.id ? item.name : <Link to="/items"> Choose an Item</Link>}
                        </Paper>
                        <Paper elevation={10}>
                            <Paper elevation={10} sx={{p:2, width:300, m:2, fontSize:25}}>Item is {item.perishable ? "Perishable":"Shelf Stable"}</Paper>    
                            <Paper elevation={10} sx={{p:2, width:300, m:2, fontSize:25}}>Storage Type: {item.storage_type}</Paper>
                        </Paper>
                        <Paper elevation={10}>
                            <h3>Expiration Date</h3>
                            <Paper elevation={10} sx={{p:2, width:300, m:2, fontSize:25}}>{date.toDateString()}</Paper>
                        </Paper>
                    </Stack>
                </div>
                <div style={{display:"flex", justifyContent:"space-around", flexDirection:"row", marginTop:20, marginLeft:20}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={6}>
                            <Paper xs={12} md={6} elevation={10} sx={{borderRadius:5 }}>
                                <CalendarPicker 
                                date={date}
                                minDate={minDate}
                                maxDate={maxDate}
                                onChange={e=> handleDatePick(e)}
                                />
                            </Paper>
                            <Paper elevation={10} >
                                <h3>Can be Extended {item.timeframe} to:</h3>
                                <Paper elevation={10} sx={{p:2, width:300, m:2, fontSize:25}}>{dateCalc()}</Paper>
                            </Paper> 
                        </Stack>
                    </LocalizationProvider>
                </div>
            </div>
        </div>
    );
}
export default ItemDetail