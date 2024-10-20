"use client"
import React, { useState } from 'react';
import Topbar from "@/components/topbar/topbar";
import Description from "@/components/topbar/description";
import Personal_Diagnosis from '@/components/personal_diagnosis/personal_diagnosis';
import Analyze from '@/components/analyze/analyze';
import Synthetic_Medical_Data from '@/components/synthetic_medical_data/synthetic_medical_data';
import Contact_Doctors from '@/components/contact_doctors/contact_doctors';
import Library from '@/components/library/library';
import About from '@/components/about/about';

export default function Home() {

    const [display,setdisplay]=useState('Personal Diagnosis');
    
    const Display_Personal_Diagnosis = () => {
      setdisplay('Personal Diagnosis');
      
    }
    
    const Display_Analyze = () => {
      setdisplay('Analyze');
      
    }

    const Display_Synthetic_Medical_Data = () => {
      setdisplay('Synthetic Medical Data');
      
    }

    const Display_Contact_Doctors = () => {
      setdisplay('Contact Doctors');
      
    }

    const Display_Library = () => {
      setdisplay('Library');
      
    }

    const Display_About = () => {
      setdisplay('About');
      
    }

  return (

    <div className="h-screen w-screen bg-gradient-to-br from-green-500 to-blue-500 overflow-x-hidden">
    <Topbar/>
    <Description/>
    <div className="flex">
      <div className="flex justify-between items-center flex-col w-1/5 h-72 p-1 m-1 rounded-lg border-white border-2 backdrop-opacity-10 backdrop-invert bg-green-500/20">
        <button className={`border-none rounded-lg text-sm lg:text-xl border-2 p-1 m-1 hover:backdrop-blur-md hover:bg-white/30 ${
          display === 'Personal Diagnosis' ? 'bg-blue-500' : 'bg-none'
        }`} onClick={Display_Personal_Diagnosis}><div>Personal Diagnosis</div></button>
        <button className={`border-none rounded-lg text-sm lg:text-xl border-2 p-1 m-1 hover:backdrop-blur-md hover:bg-white/30 ${
          display === 'Analyze' ? 'bg-blue-500' : 'bg-none'
        }`} onClick={Display_Analyze}><div>Analyze</div></button>
        <button className={`border-none rounded-lg text-sm lg:text-xl border-2 sm:p-1 m-1 hover:backdrop-blur-md hover:bg-white/30 ${
          display === 'Synthetic Medical Data' ? 'bg-blue-500' : 'bg-none'
        }`} onClick={Display_Synthetic_Medical_Data}><div>Synthetic Medical Data</div></button>
        <button className={`border-none rounded-lg text-sm lg:text-xl border-2 sm:p-1 m-1 hover:backdrop-blur-md hover:bg-white/30 ${
          display === 'Contact Doctors' ? 'bg-blue-500' : 'bg-none'
        }`} onClick={Display_Contact_Doctors}><div>Contact Doctors</div></button>
        <button className={`border-none rounded-lg text-sm lg:text-xl  border-2 sm:p-1 m-1 hover:backdrop-blur-md hover:bg-white/30 ${
          display === 'Library' ? 'bg-blue-500' : 'bg-none'
        }`} onClick={Display_Library}><div>Library</div></button>
        <button className={`border-none rounded-lg text-sm lg:text-xl border-2 sm:p-1 m-1 hover:backdrop-blur-md hover:bg-white/30 ${
          display === 'About' ? 'bg-blue-500' : 'bg-none'
        }`} onClick={Display_About}><div>About</div></button>
      </div>

      <div className=" h-screen w-4/5 p-1 m-1 rounded-lg border-white border-2 backdrop-opacity-5 backdrop-invert bg-white/20 flex flex-col justify-center items-center overflow-x-hidden overflow-y-scroll">

        {display === 'Personal Diagnosis' && <Personal_Diagnosis/>}
        {display === 'Analyze' && <Analyze/>}
        {display === 'Synthetic Medical Data' && <Synthetic_Medical_Data/>}
        {display === 'Contact Doctors' && <Contact_Doctors/>}
        {display === 'Library' && <Library/>}
        {display === 'About' && <About/>}
      </div>
        
    </div>
    </div>  
  );
}