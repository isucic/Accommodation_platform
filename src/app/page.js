"use client"
import AccommodationCard from "./components/AccomadationCard";
import data from './json/data.json';
import Filters from "./components/Filters";
import { useState } from "react";


export default function Home() {

  const [filteredData,setFilteredData] = useState(data);

  return (
    <div className="items-center justify-between">

      <div className="md:mx-28">
      <Filters setFilteredData={setFilteredData}/>
        {filteredData.map((d,index) => {
          return (
            <AccommodationCard id={d.id} />
        )})}
      </div>

    </div>

  );
}
