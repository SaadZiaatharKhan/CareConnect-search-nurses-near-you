import { NextResponse } from 'next/server';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GoogleGenerativeAI} from '@google/generative-ai';
import { Buffer } from 'buffer';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function POST(req: Request) {
  try {
    const formData = await req.formData(); // Get the FormData from the request
    const file = formData.get('file') as File; // Retrieve the file
    const mimeType = formData.get('mimeType') as string; // Retrieve the mime type
    const displayName = formData.get('displayName') as string; // Retrieve the file name

    // Convert the file to a Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Create a temporary file to hold the uploaded image
    const tempFilePath = path.join(os.tmpdir(), displayName);
    fs.writeFileSync(tempFilePath, fileBuffer);

    // Initialize GoogleAIFileManager with your API key
    const fileManager = new GoogleAIFileManager("AIzaSyALgrBDyepyU7cKVKIkqAWwyeu9qn2OltI");
    const uploadResult = await fileManager.uploadFile(tempFilePath, {
      mimeType,
      displayName,
    });

    console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

    const genAI = new GoogleGenerativeAI("AIzaSyALgrBDyepyU7cKVKIkqAWwyeu9qn2OltI");
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Log the raw result for debugging
    const rawResult = await model.generateContent([
      `Analyze this image as a medical doctor and tell about the potential disease with symptoms. Also recommend remedy. Don't ask questions. You should entertain only questions related to medical and nothing out of context. If there is any MRI scan or X-ray scan, give analysis and advice. Give answer in HTML format and make effective use of tags such as b, br, p, ul, li, h1, h2, h3, etc. Make generated response in design using TailwindCSS style. Use white and black color only for text and don't change background color.`,
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);
    console.log("Raw response from AI model:", rawResult);

    if (rawResult && rawResult.response) {
      console.log(typeof rawResult.response.text());
      return NextResponse.json({ responseText: rawResult.response.text() });
    } else {
      console.error('Unexpected response structure:', rawResult);
      return NextResponse.json({ error: 'Unexpected response structure from the model.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error analyzing the image:', error);

    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Error analyzing the image.', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
    }
  }
}
