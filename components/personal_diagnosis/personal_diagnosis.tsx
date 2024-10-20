import React, { useState } from 'react';
import Image from "next/image";
import { GoogleGenerativeAI,HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];
  
  const apiKey = "AIzaSyALgrBDyepyU7cKVKIkqAWwyeu9qn2OltI";
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: safetySettings
    });
    
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };
    
    async function run(input:string) {
      const chatSession = model.startChat({
        generationConfig,
     // safetySettings: Adjust safety settings
     // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
        ],
      });
    
      const result = await chatSession.sendMessage(`Act as a medical doctor and tell about the potential disease with symptoms. Also recommend remedy. Don't ask questions. You should entertain only questions related to medical and nothing out of context. Give answer in HTML format and make effective use of tags such as b, br, p, ul, li, h1, h2, h3, etc. Make generated response in design using TailwindCSS style. Use white and black color only for text and don't change background color. Question is : ${input}`);
      console.log(result.response.text());
      return result.response.text();
    }
  
const Personal_Diagnosis = () => {

    const [inputValue, setinputValue] = useState('');
    const [responseText, setResponseText] = useState('');

    const InputText = (event: { target: { value: string; }; }) => {
      setinputValue(event.target.value.replace("*",""));
    }

    const handleSend = async() => {
      setinputValue('');
      setResponseText(await run(inputValue)); // Update the state with the response text
      } 

  return (

    <>
      <div className="relative h-5/6 w-11/12 p-1 m-1 rounded-lg border-white border-2 backdrop-opacity-5 backdrop-invert bg-white/30 overflow-x-hidden overflow-y-auto">

<div className='absolute left-1 border-gray-400 border-2 bg-gray-400 rounded-md flex justify-center items-center h-auto w-auto sm:m-2 sm:p-2'><div dangerouslySetInnerHTML={{ __html: responseText }} /></div>

</div>
<div className='relative h-14 w-11/12 p-1 m-1 rounded-full border-white border-2 backdrop-opacity-5 backdrop-invert bg-white/30 text-black placeholder:text-gray-900'>

<input
type="text"
value={inputValue}
className="absolute h-14 w-11/12 rounded-full border-none backdrop-opacity-5 backdrop-invert bg-white/30 text-black placeholder:text-gray-900 sm:placeholder:text-base placeholder:text-xs  top-0 left-0"
placeholder="How Are You Feeling Today?"
id='prompt'
onChange={InputText}
/>
<button 
className='absolute bottom-0 -right-2 sm:right-0 z-10 h-8 w-8'
onClick={handleSend}><Image src="/assets/images/send.svg" height={50} width={50} alt='image'></Image></button>
</div>
<span className='text-red-700 text-xs sm:text-lg'>Always consult a medical professional before making any medical decisions.</span>
    </>

  )
}

export default Personal_Diagnosis
