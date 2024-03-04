"use client"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import data from '../json/data.json';
import { MdOutlineCancel } from "react-icons/md";


const Filters = ({setFilteredData}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [show,setShow] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [numOfPeople, setNumOfPeople] = useState();

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

    function handleCheckAvailability(startDate,endDate) {
        const filteredData = data.filter((d,index) => {

            const sstartDate = new Date(startDate);
            const eendDate = new Date(endDate);

            const availableInterval = d.availableDates.find(interval => {
                const intervalStartDate = new Date(interval.intervalStart);
                const intervalEndDate = new Date(interval.intervalEnd);

                // Postavljanje vremena na 0 za usporedbu samo datuma
                intervalStartDate.setHours(0, 0, 0, 0);
                sstartDate.setHours(0, 0, 0, 0);

                return (intervalStartDate <= sstartDate) && (eendDate <= intervalEndDate);
            });

            if(availableInterval && (d.capacity >= numOfPeople || numOfPeople == null)){
                //provjera amenties
                for (let i =0; i < selectedAmenities.length; i++){
                    const amenity = selectedAmenities[i];
                    if(!d.amenities[amenity]) {
                        return false;
                    }
                }
                return true;
            }

            return false;

            // if(availableInterval && d.capacity === numOfPeople){
            //     console.log(`smjestaj je dostupan za ${d.title}`);

            //     const totalPrice = searchPrice(d,sstartDate,eendDate);
            // }
        })
        setFilteredData(filteredData);
    }

    function searchPrice(accommodation,startDate,endDate) {
        const dateArray = [];
        for(let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            dateArray.push(new Date(date))
        }

        let totalPrice = 0;

        dateArray.forEach(date => {
            accommodation.pricelistInEuros.map((interval,index) => {
                const intervalStartDate = new Date(interval.intervalStart);
                const intervalEndDate = new Date(interval.intervalEnd);
                intervalEndDate.setHours(0, 0, 0, 0);
                endDate.setHours(0, 0, 0, 0);
    
                if (intervalStartDate <= date && intervalEndDate > date) {
                    totalPrice += interval.pricePerNight;
                }
            })
            console.log(`Cijena za ${accommodation.title} je ${totalPrice}`)
        })
        return totalPrice;
    }

    function handleCancelAll() {
        setSelectedAmenities([]);
        setFilteredData(data);
        setStartDate(new Date());
        setEndDate(new Date());
    }


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
                     value={numOfPeople} 
                     onChange={(e) => setNumOfPeople(e.target.value)}/>
                </div>

                <button 
                 onClick={() => handleCheckAvailability(startDate,endDate)}
                 className="hidden sm:block bg-blue-500 hover:bg-blue-700 text-white font-bold ml-8 px-4 rounded">
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
            <button 
                 onClick={() => handleCancelAll()}
                 className="bg-blue-800 hover:bg-blue-700 text-sm text-white m-1 py-1 px-2 rounded">
                Poništi sve
                </button>
            </div>

            <button
             onClick={() => handleCheckAvailability(startDate,endDate)}
             className="sm:hidden block bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded w-full justify-content items-center">
                Pretraži
            </button>
                  
        </div>
    )
}

export default Filters;