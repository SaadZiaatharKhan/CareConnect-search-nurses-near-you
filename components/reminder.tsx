"use client";

import React, { useState, useEffect } from 'react';

const ReminderApp: React.FC = () => {
    const [reminders, setReminders] = useState<{ message: string; date: string }[]>([]);
    const [message, setMessage] = useState('');
    const [date, setDate] = useState('');
    const [alarms, setAlarms] = useState<{ timeoutId: NodeJS.Timeout; message: string }[]>([]);
    const [activeAlarm, setActiveAlarm] = useState<string | null>(null);
    const [alarmSound, setAlarmSound] = useState<HTMLAudioElement | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message || !date) return;

        const newReminder = { message, date };
        setReminders([...reminders, newReminder]);
        setMessage('');
        setDate('');

        // Set an alarm for the reminder
        const alarmTime = new Date(date).getTime();
        const currentTime = Date.now();

        // Only set alarm if the date is in the future
        if (alarmTime > currentTime) {
            const timeoutId = setTimeout(() => {
                alert(`Alarm: ${message}`); // Show alert
                playSound(); // Play sound
                setActiveAlarm(message); // Set active alarm
            }, alarmTime - currentTime);

            setAlarms((prevAlarms) => [...prevAlarms, { timeoutId, message }]); 
        }
    };

    const playSound = () => {
        const audio = new Audio('/assets/audio/alarm.mp3');
        audio.loop = true;
        audio.play();
        setAlarmSound(audio);
    };

    const stopAlarm = () => {
        setActiveAlarm(null); 
        const alarmToStop = alarms.find(alarm => alarm.message === activeAlarm);
        if (alarmToStop) {
            clearTimeout(alarmToStop.timeoutId);
            const newAlarms = alarms.filter(alarm => alarm !== alarmToStop);
            setAlarms(newAlarms);
        }
        if (alarmSound) {
            alarmSound.pause(); 
            alarmSound.currentTime = 0; 
            setAlarmSound(null); 
        }
    };

    const handleDelete = (index: number) => {
        const newReminders = reminders.filter((_, i) => i !== index);
        setReminders(newReminders); 
    };

    useEffect(() => {
        return () => {
            alarms.forEach((alarm) => clearTimeout(alarm.timeoutId));
        };
    }, [alarms]);

    return (
        <div className="reminder-app m-2 p-1 flex flex-col justify-center items-center shadow-xl">
            <h1 className="text-3xl mb-4 text-blue-500">Reminder</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="Enter reminder message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border p-2 mr-2 text-gray-800"
                    required
                />
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 mr-2 text-gray-800"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Add Reminder
                </button>
            </form>
            <ul className="list-disc pl-5">
                {reminders.map((reminder, index) => (
                    <li key={index} className="flex justify-between items-center text-gray-800">
                        <span>
                            {reminder.message} - {new Date(reminder.date).toLocaleString()}
                        </span>
                        <button onClick={() => handleDelete(index)} className="text-red-500 ml-2 m-1">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            {activeAlarm && (
                <div className="mt-4">
                    <p className="text-red-600">Active Alarm: {activeAlarm}</p>
                    <button onClick={stopAlarm} className="bg-red-500 text-white p-2">
                        Stop Alarm
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReminderApp;
