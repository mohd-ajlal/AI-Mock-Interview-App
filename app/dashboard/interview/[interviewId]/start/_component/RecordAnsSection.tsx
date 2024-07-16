'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'


function RecordAnsSection() {

    const [userAnswer, setUserAnswer] = useState<string>('')

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      

      useEffect(()=>{
        results.map((result)=>{
          if (typeof result !== 'string') {
            setUserAnswer(prevAns=>prevAns+result?.transcript)
          }
        })
      },[results]);
    
  return (
    <div className='flex items-center  justify-center flex-col'>
    <div className='flex flex-col mt-20 justify-center items-center rouded-lg p-5 '>
        <Image src={'/webcam.png'} width={200} height={200}
        className='absolute'
        alt='Webcam'
        />
        <Webcam
        mirrored={true}
        style={{
            height:300,
            width:'100%',
            zIndex:10,
            // borderRadius:
        }}
        />
    </div>
    <Button variant='outline' className='my-10 hover:bg-purple-300' 
    onClick={isRecording?stopSpeechToText:startSpeechToText}
    >{isRecording?
    
    <h2 className='text-red-600 flex gap-2'>
      <Mic/>  Stop Recording
    </h2>:

   'Record Answer'}</Button>
    {/* <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={() => (isRecording ? stopSpeechToText() : startSpeechToText())}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={typeof result === 'string' ? result : result.timestamp}>{typeof result === 'string' ? result : result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul> */}

      <Button onClick={()=>console.log(userAnswer)}>Show User Answer</Button>
    </div>
  )
}

export default RecordAnsSection


// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import React from 'react';
// import Webcam from 'react-webcam';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// function RecordAnsSection() {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   const handleRecordClick = () => {
//     if (listening) {
//       SpeechRecognition.stopListening();
//     } else {
//       SpeechRecognition.startListening();
//     }
//   };

//   return (
//     <div className='flex items-center justify-center flex-col'>
//       <div className='flex flex-col mt-20 justify-center items-center rounded-lg p-5'>
//         <Image
//           src={'/webcam.png'}
//           width={200}
//           height={200}
//           className='absolute'
//           alt='Webcam'
//         />
//         <Webcam
//           audio
//           mirrored={true}
//           style={{
//             height: 300,
//             width: '100%',
//             zIndex: 10,
//           }}
//         />
//       </div>
//       <Button
//         variant='outline'
//         className='my-10 hover:bg-purple-300'
//         onClick={handleRecordClick}
//       >
//         {listening ? 'Stop Recording' : 'Start Recording'}
//       </Button>
//       <h1>Recording: {listening.toString()}</h1>
//       <button onClick={resetTranscript}>Reset</button>
//       {transcript && <p>{transcript}</p>}
//     </div>
//   );
// }

// export default RecordAnsSection;
