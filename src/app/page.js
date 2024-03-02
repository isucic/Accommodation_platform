import AccommodationCard from "./components/AccomadationCard";
import data from './json/data.json';
import Filters from "./components/Filters";


export default function Home() {
  return (
    <div className="items-center justify-between">

      <Filters />

      <div className="md:mx-28">
        {data.map((d,index) => {
          return (
            <AccommodationCard id={d.id} />
        )})}
      </div>

    </div>

  );
}
