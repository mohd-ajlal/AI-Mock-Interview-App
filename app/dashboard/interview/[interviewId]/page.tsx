'use client'

import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";
 
 function Interview({params}:{params:any}) {


    const [interviewData,setInterviewData]=useState<{ id: number; jsonMockResp: string; jobPosition: string; jobDesc: string; jobExperience: string; createdBy: string; createdAt: string | null; mockId: string; } | null>(null);
    const [webCamEnabled, setWebCamEnabled] = useState<boolean>()
    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails()
    }, [])

// use to get interview details by mockid/interview id

    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))

        // console.log(result)

        setInterviewData(result[0]);
    }

   return (
     <div className='my-10'>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>

        <div className='grid  grid-cols-1 md:grid-cols-2 gap-10'>

        <div className='flex flex-col my-5 gap-10'>
            <div className='flex flex-col gap-5  p-5 rounded-lg border'>
                <h2 className='text-lg'>
                    <strong>      
                        Job Role/Job Position: &nbsp;
                    </strong>
                    {interviewData?.jobPosition}
                </h2>

                <h2 className='text-lg'>
                    <strong>      
                        Job Description: &nbsp;
                    </strong>
                    {interviewData?.jobDesc}
                </h2>

                <h2 className='text-lg'>
                    <strong>      
                        Job Experience: &nbsp;
                    </strong>
                    {interviewData?.jobExperience}
                </h2>
                </div>

                <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                    <h2 className='flex gap-2 items-center text-red-500'><Lightbulb/> <strong>Information</strong></h2>
                    <h2 className='mt-3 text-red-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                </div>

            </div>

        <div>
           {webCamEnabled? <Webcam
           onUserMedia={()=>setWebCamEnabled(true)}
           onUserMediaError={()=>setWebCamEnabled(false)}
           mirrored={true}
            style={{
                height:300,
                width:300
            }}
           />
           :
           <>
            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
            <Button variant="ghost" className="w-full bg-blue-700 hover:bg-blue-500"  onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
            </>
           }
            </div>
        </div>
        <div className='flex justify-center md:justify-end items-end lg:mt-0 mt-3'>
            <Link
            href={'/dashboard/interview/'+params.interviewId+'/start'}
            >
            <Button className='bg-red-700 hover:bg-red-500'>
                Start Interview
            </Button>
            </Link>
            
</div>



            

     </div>
   )
 }
 
 export default Interview