import React, { useState } from 'react';

const Analyze = () => {
  const [responseText, setResponseText] = useState(''); // State for storing the response text
  const [file, setFile] = useState<File | null>(null); // State for storing the uploaded file

  // Handle file change event
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files ? event.target.files[0] : null; // Get the file from the input
    setFile(uploadedFile); // Store the file in state
  };

  // Function to analyze the image
  const analyzeImage = async () => {
    if (!file) return; // Exit if no file is selected

    try {
      // Create a FormData object to hold the file data
      const formData = new FormData();
      formData.append('file', file); // Append the file to FormData
      formData.append('mimeType', file.type); // Append the mime type
      formData.append('displayName', file.name); // Append the file name

      // Send the FormData object to the Next.js API route
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData, // Use FormData as the body
      });

      // Parse and handle the response
      const data = await response.json();
      if (response.ok) {
        setResponseText(data.responseText); // Set the response text in state
      } else {
        setResponseText("Error analyzing the image: " + data.error); // Display error message
      }
    } catch (error) {
      console.error('Error analyzing the image:', error);
      setResponseText('Error analyzing the image.'); // Display error message
    }
  };

  return (
    <>
      {/* Display the AI response in a box */}
      <div className="relative h-5/6 w-11/12 p-1 m-1 rounded-lg border-white border-2 backdrop-opacity-5 backdrop-invert bg-white/30 overflow-x-hidden overflow-y-auto">
        <div className='absolute left-1 border-gray-400 border-2 bg-gray-400 rounded-md flex justify-center items-center h-auto w-auto sm:m-2 sm:p-2'>
          <div dangerouslySetInnerHTML={{ __html: responseText }} />
        </div>
      </div>

      {/* File input for uploading the image */}
      <div className='flex justify-center items-center p-2 m-2'>
        <input
          type="file"
          accept="image/*" // Restrict input to images only
          className="block w-full text-sm text-slate-500 
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
          onChange={handleFileChange} // Trigger file change event
        />
      </div>

      {/* Button to trigger image analysis */}
      <div className='flex justify-center items-center p-2 m-2'>
        <button
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 border-2"
          onClick={analyzeImage} // Trigger analyzeImage function on click
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] border-2" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl border-2">
            Analyze
          </span>
        </button>
      </div>
      <span className='text-red-700 text-xs sm:text-lg'>Always consult a medical professional before making any medical decisions.</span>
    </>
  );
};

export default Analyze;