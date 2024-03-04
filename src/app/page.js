"use client"
import AccommodationCard from "./components/AccomadationCard";
import data from './json/data.json';
import Filters from "./components/Filters";
import { useState } from "react";


export default function Home() {

  const [filteredData,setFilteredData] = useState(data);
  const [parentPriceWithId, setParentPriceWithId] = useState([]);

  function handleChildPriceWithId(priceWithIdFromChild) {
    setParentPriceWithId(priceWithIdFromChild);
}

  return (
    <div className="items-center justify-between">

      <div className="md:mx-28">
      <Filters setFilteredData={setFilteredData} onPriceWithIdChange={handleChildPriceWithId}/>
      {filteredData.map((d,index) => {
        {/* const priceWithId = parentPriceWithId.find(pricewithid => pricewithid.id === d.id); */}
        return (
          <AccommodationCard key={index} id={d.id} priceFunction={parentPriceWithId}
          // price={priceWithId ? priceWithId.price : null} 
          />
      );
})}
      </div>

    </div>

  );
}
