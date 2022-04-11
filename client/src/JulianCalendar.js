import { useState } from "react"

function JulianCalendar(){
    const [julianDate, setJulianDate] = useState()
    const [julianDay, setJulianDay] =useState(1)
    
    function handleJulianDate(e){
      const day = Array(julianDay[2]+julianDay[3]+julianDay[4])
      const year = new Date(20+julianDay[0]+julianDay[1], 0)
      setJulianDate(new Date(year.setDate(day)).toLocaleDateString())
    }

    return(

        <div>
            <input onChange={e=>setJulianDay(e.target.value)}></input>
            <button onClick={e=>handleJulianDate(e.target.value)}>Submit</button>
            <h1>Calendar Date is: {julianDate}</h1>
        </div>

    )
}
export default JulianCalendar


