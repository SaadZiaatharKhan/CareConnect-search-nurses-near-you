import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

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
    
    async function run(input: number) {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
    
      const result = await chatSession.sendMessage(`Generate only and only (and not any advice) ${Math.round(Math.abs(input))} random synthetic medical by filling the data Patient id, Age, Gender, Condition, Treatment Plan and Outcome. make each patient's data in a div with tailwindcss bg-blue-400 border-gray-400 border-2 m-2 p-2 rounded-md flex flex-col justify-center h-auto w-auto text-xs sm:text-lg. Also html and \`\`\` should not appear `);
      console.log(result.response.text());
      return result.response.text();
    }
  
const Synthetic_Medical_Data = () => {

    const [inputValue, setinputValue] = useState(1);
    const [responseText, setResponseText] = useState('');

    const InputText = (event: React.ChangeEvent<HTMLInputElement>) => {
      setinputValue(Number(event.target.value));
    }

    const handleSend = async() => {
      setinputValue(1);
      setResponseText(await run(inputValue)); // Update the state with the response text
      } 

  return (

    <>
      <div className="relative h-5/6 w-11/12 p-1 m-1 rounded-lg border-white border-2 backdrop-opacity-5 backdrop-invert bg-white/30 overflow-x-hidden overflow-y-auto">

      <div className='absolute left-1 bg-none rounded-md flex flex-col justify-center h-auto w-auto sm:m-2 sm:p-2'>
      <div dangerouslySetInnerHTML={{ __html: responseText }} />
      </div>

</div>

<div className='relative h-14 w-11/12 p-1 m-1 rounded-full'>

<input
type="number"
min="1"
value={inputValue}
className="absolute h-auto w-auto rounded-full border-none backdrop-opacity-5 backdrop-invert bg-white/30 text-black placeholder:text-gray-900 sm:placeholder:text-base placeholder:text-xs"
placeholder="Enter The Number Of Synthetic Data You Want To Generate"
id='prompt'
onChange={InputText}
/>
</div>
<button 
className='z-10 h-auto w-auto'
onClick={handleSend}>
  <div className='flex justify-center items-center p-2 m-2'>
        <button
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 border-2"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] border-2" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl border-2">
            Generate
          </span>
        </button>
      </div>
</button>
<span className='text-red-700 text-xs sm:text-lg'>These synthetic examples are ideal for research and AI training, preserving privacy.</span>
    </>

  )
}

export default Synthetic_Medical_Data;