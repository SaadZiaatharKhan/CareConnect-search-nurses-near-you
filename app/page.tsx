"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ReminderApp from '@/components/reminder';

const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });
const NursePage = dynamic(() => import('./nurse/page'), { ssr: false });

const Home: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        city: 'pune',
    });

    const [acceptedNurse, setAcceptedNurse] = useState<{ name: string; location: [number, number] } | null>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const message = JSON.stringify({
            title: 'Nurse Assignment',
            message: `Name: ${formData.name}, Number: ${formData.number}, City: ${formData.city}`,
        });

        const ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () => {
            ws.send(message);
            ws.close();
        };
        alert("Your Form Has Been Submitted");
        console.log('Form Data Submitted:', formData);
    };

    const handleNurseAccept = (nurse: { name: string; location: [number, number] }) => {
        setAcceptedNurse(nurse);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
            },
            (error) => {
                console.error('Error fetching location', error);
            }
        );
    };

    const calculateDistance = (location1: [number, number], location2: [number, number]) => {
        const [lat1, lon1] = location1;
        const [lat2, lon2] = location2;

        const R = 6371e3; // Earth radius in meters
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // Distance in meters
        return distance / 1000; // Convert to kilometers
    };

    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('Recognized: ', transcript);
            if (transcript.includes("request")) {
                // Directly trigger the form submission
                handleSubmit({ preventDefault: () => {} });
            }
        };

        recognition.onerror = (event: SpeechRecognitionError) => {
            console.error('Speech recognition error:', event.error);
        };
    };

    useEffect(() => {
        // Start listening for voice commands when the component mounts
        startListening();
    }, []);

    return (
        <div className="h-auto w-fit bg-white flex flex-col">
            <div className="text-3xl w-auto h-auto text-green-500 flex justify-center items-center border-2 border-black rounded-lg shadow-xl">
                <Image src={"/assets/images/care_connect_logo.png"} height={50} width={100} alt={"image"} />
                CareConnect
            </div>
            <div className="flex justify-center items-center p-3 m-3">
                <div className="text-2xl w-full h-auto text-black flex flex-col p-3 m-4">
                    Nursing Service
                    <Image src={'/assets/images/1.jpg'} alt="image" width={500} height={500} />
                </div>
                <div className="flex flex-col h-auto w-full drop-shadow-xl">
                    <ReminderApp/>
                    <div className="border-2 border-black rounded-lg flex flex-col justify-center items-center">
                        <Link href={'/chatbot'} className='m-1'>
                            <button className='bg-sky-500 hover:bg-sky-800 hover:text-white text-gray-700 font-bold py-2 px-4 rounded'>
                                Chatbot
                            </button>
                        </Link>
                        <form className="flex flex-col space-y-6 w-full p-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <span className="text-2xl text-black">
                                    Get Quality Home HealthCare Services At Your Best Comfort At Home.
                                </span>
                                <label className="mb-2 text-black">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your Name"
                                    className="p-2 border border-gray-300 rounded-lg text-black"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-2 text-black">Mobile Number</label>
                                <input
                                    type="number"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleChange}
                                    placeholder="Enter your Number"
                                    className="p-2 border border-gray-300 rounded-lg text-black"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-black">City</label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="p-2 border border-gray-300 rounded-lg text-black"
                                    required
                                >
                                    <option value="pune">Pune</option>
                                    <option value="mumbai">Mumbai</option>
                                    <option value="delhi">Delhi</option>
                                    <option value="kolkata">Kolkata</option>
                                    <option value="hyderabad">Hyderabad</option>
                                    <option value="chennai">Chennai</option>
                                    <option value="nagpur">Nagpur</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full p-2 text-white bg-green-500 rounded-lg"
                            >
                                Request
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center p-1 m-1 flex-col">
                <MapComponent userLocation={userLocation} nurseLocation={acceptedNurse?.location || null} />
                <NursePage onNurseAccept={handleNurseAccept} />
            </div>

            {acceptedNurse && userLocation && (
                <div className='flex flex-col justify-center items-center font-semibold bg-cyan-300 h-auto w-auto'>
                    <p className='text-black text-xl'>Accepted Nurse : {acceptedNurse.name}</p>
                    <p className='text-black text-xl'>
                        Distance from your location to nurse :{" "}
                        {calculateDistance(userLocation, acceptedNurse.location).toFixed(2)} km
                    </p>
                </div>
            )}

<div className="flex justify-center items-center p-3 m-3">
                <div className="w-full h-auto text-black flex flex-col p-3 m-4">
                    <h1 className='text-6xl text-blue-700 font-bold'>What is In-Home Nursing Service?</h1>
                    <p className='text-xl text-black font-sans font-medium'>
                    <br /><br /><br />
                        In-home nursing services provide essential healthcare support to patients in the comfort of their own homes. This is especially critical for individuals like senior citizens or patients recovering from trauma, who require specialized care for either short or long-term periods. Instead of occupying hospital beds, which can be costly and inconvenient, home nursing services offer a more effective and affordable alternative.
                        <br /><br /><br />
                        <strong>CareConnect</strong> focuses on enhancing this model by leveraging geo-location technology to connect patients with the nearest available nurse during emergency situations or routine care needs. This system helps healthcare management locate the geographically closest nurse and assign them to the patient's home, ensuring timely, personalized care at a minimal cost.
                        <br /><br /><br />
                        By utilizing live location tracking of both patients and nurses, CareConnect optimizes response times and ensures that patients receive quality healthcare without having to visit a hospital, making the recovery process more comfortable, efficient, and affordable.
                        <br /><br />
                    </p>
                </div>
                <div>
                    <Image src={"/assets/images/2.jpg"} height={750} width={750} alt='image'></Image>
                </div>
            </div>


            <div className="flex justify-center items-center p-3 m-3">
            <div>
                    <Image src={"/assets/images/3.jpg"} height={800} width={800} alt='image'></Image>
                </div>
                <div className="w-full h-auto text-black flex flex-col p-3 m-4">
                    <h1 className='text-6xl text-blue-700 font-bold'>Nurse performs below responsibilities</h1>
                        <ul className='text-xl text-black font-sans font-medium p-3 m-3 list-disc'>
                            <li className='p-2 m-2'>Giving medicines on time</li>
                            <li className='p-2 m-2'>Fixing a diet plan</li>
                            <li className='p-2 m-2'>Caring and dressing wounds</li>
                            <li className='p-2 m-2'>Monitoring of Vital Signs</li>
                            <li className='p-2 m-2'>Intravenous medication and IV fluid management</li>
                            <li className='p-2 m-2'>Nebulization</li>
                            <li className='p-2 m-2'>Ryles Tube Insertion and Feeding</li>
                            <li className='p-2 m-2'>Tracheostomy care</li>
                            <li className='p-2 m-2'>Oral Hygiene and Bed Bath/Sponge Bath</li>
                            <li className='p-2 m-2'>Companionship and polite conversations</li>
                        </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
