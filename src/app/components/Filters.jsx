"use client"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useState } from 'react';

const Filters = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [show,setShow] = useState(false);
    const [guests, setGuests] = useState();

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    function handleShowDateRange(){
        setShow(!show);
    }

    const amenities = ["airConditioning", "parkingSpace", "pets", "pool", "wifi", "tv"];

    return (
        <div>
            <div>
                <p onClick={handleShowDateRange}>Datum prijave - Datum odjave</p>
                {show && <DateRange
                ranges={[selectionRange]} 
                onChange={handleSelect}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                />}
            </div>

            <div className=''>
                <p>Broj osoba</p>
                <input type="number" value={guests} onChange={e => setGuests(e.target.value)}/>
            </div>

            <div>
                {amenities.map((amen,index) => {
                    return (
                        <p>{amen}</p>
                    )
                })}
            </div>
           
        </div>
    )
}

export default Filters;