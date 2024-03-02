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
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const handleAmenityClick = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

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
        <div className='my-4'>
            <div className='flex'>
                <div className='flex border border-gray bg-white mr-2 relative px-2 lg:py-2 rounded'>
                    <button className="inline" onClick={handleShowDateRange}>Datum prijave - Datum odjave</button>
                    {show && <DateRange
                    className="z-50 top-full mt-2 absolute"
                    ranges={[selectionRange]} 
                    onChange={handleSelect}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    />}
                </div>

                <div className='flex items-center'>
                    <p className="inline">Broj osoba</p>
                    <input className="w-12 rounded border border-gray m-1 px-2 lg:py-2" 
                     min={1} 
                     inputMode='numeric' 
                     size="1" 
                     type="number" 
                     value={guests} 
                     onChange={e => setGuests(e.target.value)}/>
                </div>

                <button className="hidden sm:block bg-blue-500 hover:bg-blue-700 text-white font-bold mx-4 px-4 rounded">
                Pretraži
                </button> 


            </div>

            <div className='flex flex-wrap my-2'>
            {amenities.map((amen, index) => (
                <label key={index} className={`text-sm md:text-base border border-gray ${selectedAmenities.includes(amen) ? 'bg-blue-500 text-white' : 'bg-white'} m-1 py-1 px-2 cursor-pointer`}>
                    <input 
                        type="checkbox" 
                        checked={selectedAmenities.includes(amen)}
                        onChange={() => handleAmenityClick(amen)} 
                        className="hidden" 
                    />
                    {amen}
                </label>
            ))}
            </div>

            <button className="sm:hidden block bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded w-full justify-content items-center">
                Pretraži
            </button> 
                  
        </div>
    )
}

export default Filters;