"use client";
import { ShootingStars } from '../ui/shooting-stars';
import { StarsBackground } from '../ui/stars-background';

const About = () => {

  return (
    <>

<div className="relative h-5/6 w-11/12 p-1 m-1 rounded-lg border-white border-2 backdrop-opacity-5 backdrop-invert bg-white/30 overflow-x-hidden overflow-y-auto text-white dark:text-white">

<div className='border-gray-400 border-2 bg-gray-900 rounded-md flex flex-col justify-center items-center h-auto w-auto sm:text-xl text-xs m-1 p-1'>
        <div className='flex justify-center items-center flex-col p-2 m-1'>
        <h1 className='m-1 p-3 sm:text-3xl text-xl'>Introduction</h1>
        <p>HealthVision AI is a revolutionary healthcare platform that integrates AI-driven diagnostics, synthetic medical data generation, and personalized treatment plans. It aims to bridge the gap between patients and healthcare professionals by providing accessible, accurate, and real-time medical insights.</p>
        </div>
        <div className='flex justify-center items-center flex-col p-2 m-1'>
        <h1 className='m-1 p-3 sm:text-3xl text-xl'>Features</h1>
        <ul>
          <li><b>AI-Powered Diagnosis:</b>Analyzes symptoms and medical images to offer quick, AI-driven health assessments.</li><br />
          <li><b>Synthetic Medical Data:</b>Helps researchers generate synthetic datasets for medical research and drug discovery.</li><br />
          <li><b>Personalized Treatment Plans:</b>Offers tailored recommendations based on individual medical profiles.</li><br />
          <li><b>Doctor Consultations:</b>Facilitates connections with healthcare professionals for expert advice.</li>
        </ul>
        </div>
        <div className='flex justify-center items-center flex-col p-2 m-1'>
          <h1 className='m-1 p-3 sm:text-3xl text-xl'>Usage</h1>
          <p>HealthVision AI can be used by both patients and healthcare providers to enhance the diagnostic process, improve data-driven medical research, and tailor healthcare solutions for individuals. Its intuitive interface allows users to input symptoms or medical images, and receive real-time insights powered by AI models.</p>
        </div>
        <div className='flex justify-center items-center flex-col p-2 m-1'>
          <h1 className='m-1 p-3 sm:text-3xl text-xl'>Technologies Used</h1>
          <ul>
            <li><b>AI Models:</b>Leveraging natural language processing (NLP) and computer vision for diagnosis and recommendations.</li><br />
            <li><b>Next.js:</b>Frontend framework for building responsive, server-side rendered web applications.</li><br />
            <li><b>Google Generative AI API:</b>Provides state-of-the-art generative models for text-based medical insights.</li><br />
            <li><b>Cloud Platforms:</b>Utilizes cloud-based services for scalability and efficiency.</li>
          </ul>
        </div>
        <ShootingStars/>
        <StarsBackground/>
</div>

</div>
    </>
  )
}

export default About
