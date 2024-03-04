import data from '../json/data.json';
import Image from "next/image";
import { TbBeach } from "react-icons/tb";
import { MdOutlinePersonOutline } from "react-icons/md";


function findAcc(data, id) {
    return data.find(obj => obj.id === id);
}
const AccommodationCard = ({id}) => {
    const foundAcc = findAcc(data, id);

    return (
        <div className="border border-gray flex p-2 my-4 mx-1 bg-white relative">
            <div className="w-40 h-52 sm:w-56 sm:h-60 md:w-72 md:h-72 rounded overflow-hidden">
                <div className="relative w-full h-full">
                    <Image 
                    src={foundAcc.image}
                    alt="accommodationPhoto"
                    fill
                    style={{objectFit:"cover"}}
                    sizes="100%"
                    priority
                    />
                </div>
            </div>

            <div className='mx-4 flex flex-col'>
                <p className='max-w-[180px] md:max-w-56 lg:max-w-none font-bold mb-4 lg:text-lg'>{foundAcc.title}</p>
                <p className='mb-1 text-sm flex lg:text-base'><MdOutlinePersonOutline className='mt-1 mr-2'/>
                {foundAcc.capacity} {foundAcc.capacity === 2 || foundAcc.capacity === 3 || foundAcc.capacity === 4 ? 'osobe' : 'osoba'}</p>
                {foundAcc.beachDistanceInMeters &&
                <p className='mb-1 text-sm flex lg:text-base'><TbBeach className='mt-1 mr-2'/>
                    {foundAcc.beachDistanceInMeters} m od plaže
                </p>}
            </div>

            <div className='absolute bottom-0 right-0 m-4'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 lg:py-4 rounded">
                Prikaži više
            </button>
            </div>
          
            
        </div>
    )
}

export default AccommodationCard;