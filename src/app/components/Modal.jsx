import { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";
import data from '../json/data.json';
import {MdOutlinePersonOutline } from "react-icons/md"
import { TbBeach } from "react-icons/tb";



const Modal = ({ isOpen, onClose, id }) => {

    const accom =  data.find(obj => obj.id === id);

    return (
    <>
    {isOpen && (
    <div className="fixed z-20 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
                <div className="bg-white rounded p-6 w-96 mx-auto z-30">
                    <div className="hidden md:flex flex justify-end">
                        <IoMdClose onClick={onClose} className="text-gray-500 hover:text-gray-700 w-7 h-6"/>
                    </div>

                    <div className="mt-1 md:mt-4">
                        <div className="w-full h-52 border border-gray-300 overflow-hidden shadow-md">
                            <div className="relative w-full h-full">
                                <Image 
                                src={accom.image}
                                alt="accommodationPhoto"
                                fill
                                style={{objectFit:"cover"}}
                                sizes="100%"
                                priority
                                />
                            </div>
                        </div>
                        <h1 className="text-lg font-semibold my-2">{accom.title}</h1>
                        <div className='flex flex-col'>
                            <p className='mb-1 text-sm flex lg:text-base'><MdOutlinePersonOutline className='mt-1 mr-2'/>
                            {accom.capacity} {accom.capacity === 2 || accom.capacity === 3 || accom.capacity === 4 ? 'osobe' : 'osoba'}</p>
                            {accom.beachDistanceInMeters &&
                            <p className='mb-1 text-sm flex lg:text-base'><TbBeach className='mt-1 mr-2'/>
                                {accom.beachDistanceInMeters} m od plaže
                            </p>}
                        </div>

                        <div className='flex flex-wrap my-2'>
                        {Object.keys(accom.amenities).map((amenity,index, array) => {
                            if (accom.amenities[amenity]) {
                                return <div className='flex'>
                                    <p className="" key={amenity}>{amenity}</p>
                                    {index != array.length - 1 && <p className='mx-1'>◦</p>}
                                    </div>;
                            }
                            })} 
                        </div>

                    </div>
            </div>
        </div>
    </div>
    )}
</>
)}

export default Modal;
