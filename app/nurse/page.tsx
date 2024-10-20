// Nurse.tsx
"use client";

import React, { useEffect, useState } from 'react';

// Define a type for the notification
type Notification = {
    title: string;
    message: string;
    nurseName: string; // Added nurseName to the notification
    nurseLocation: [number, number]; // Added nurseLocation to the notification
};

// Predefined nurse locations with names
const nursesData = [
    { name: 'Sarah Elizabeth', location: [18.5304109,73.829973] as [number, number] },
    { name: 'Emily Anne', location: [18.5304109,73.829973] as [number, number] },
    { name: 'Emma Grace', location: [18.5304109,73.829973] as [number, number] },
    { name: 'Olivia Marie', location: [18.5304109,73.82997] as [number, number] },
    { name: 'Ava Sophia', location: [18.5304109,73.829973] as [number, number] },
    { name: 'Charlotte Jane', location: [18.5296341,73.8130026] as [number, number] },
];

const NursePage = ({ onNurseAccept }: { onNurseAccept: (nurse: { name: string; location: [number, number] }) => void; }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [acceptedNurse, setAcceptedNurse] = useState<Notification | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            console.log('Raw message received:', event.data);
            const randomNurse = nursesData[Math.floor(Math.random() * nursesData.length)];
            const notification: Notification = {
                title: 'Nurse Assignment',
                message: 'You have been assigned a nurse.',
                nurseName: randomNurse.name,
                nurseLocation: randomNurse.location,
            };
            setNotifications((prev) => [...prev, notification]);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        return () => {
            ws.close();
        };
    }, []);

    const handleAccept = (nurse: Notification) => {
        setAcceptedNurse(nurse);
        onNurseAccept({ name: nurse.nurseName, location: nurse.nurseLocation });
        console.log('Accepted nurse:', nurse);
        setNotifications((prev) => prev.filter(notification => notification !== nurse));
    };

    const handleReject = (nurse: Notification) => {
        console.log('Rejected nurse:', nurse);
        setNotifications((prev) => prev.filter(notification => notification !== nurse));
    };

    return (
        <div>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>
                        <strong className='font-bold text-black'>{notification.title}</strong>: <span className='text-black'>{notification.message}</span>
                        <div className='flex justify-center items-center backdrop-blur-md bg-sky-400/30'>
                            <span className='m-2 font-medium text-black'>Nurse : {notification.nurseName}</span>
                            <button onClick={() => handleAccept(notification)} className='p-2 m-2 text-white font-medium bg-green-500 h-auto w-auto'>Accept</button>
                            <button onClick={() => handleReject(notification)} className='p-2 m-2 text-white font-medium bg-red-500 h-auto w-auto'>Reject</button>
                        </div>
                    </li>
                ))}
            </ul>
            {acceptedNurse && (
                <div>
                </div>
            )}
        </div>
    );
};

export default NursePage;
