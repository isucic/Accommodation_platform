import Image from "next/image";
import AccommodationCard from "./components/AccomadationCard";
import data from './json/data.json';


export default function Home() {
  return (
    <div className="items-center justify-between">

      <div className="md:mx-28">
        {data.map((d,index) => {
          return (
            <AccommodationCard id={d.id} />
        )})}
      </div>

    </div>

  );
}
