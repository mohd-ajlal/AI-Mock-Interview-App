"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Button } from '@/components/ui/button'

import { Textarea } from "@/components/ui/textarea"
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

  

function AddNewInterview() {
    const [openDailog, setOpenDailog] = useState(false);

    const [jobPosition, setJobPosition] = useState<String>();
    
    const [jobDesc, setJobDesc] = useState<String>();
    
    const [jobExperience, setJobExperience] = useState<number>();
    const [loading, setLoading] = useState(false)
    const {user}=useUser();
    const router=useRouter();


    const [jsonResponse,setJsonResponse]=useState<string>("");
    const onSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

       const InputPrompt="Job position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience : "+jobExperience+" , Depends on Job Position, Job Description & Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview question along with Answer in JSON format, Give us question and answer field on JSON"
    
       const result = await chatSession.sendMessage(InputPrompt)

    const MockJsonResp = (result.response.text()).replace('```json','').replace('```','');

        try {
            const parsedResponse = JSON.parse(MockJsonResp);
            console.log(parsedResponse);
            setJsonResponse(parsedResponse);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }

        // to store in database 

        if(MockJsonResp)
            {
            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
                } as any).returning({ mockId: MockInterview.mockId, jsonMockResp: MockInterview.jsonMockResp });
            
            console.log("Inserted ID:", resp)
            if(resp)
            {
                setOpenDailog(false);
                router.push('/dashboard/interview/'+resp[0]?.mockId)
        }
        else{
            console.log("ERROR");
        }
            setLoading(false);
        }
        // console.log("Inserted ID:",resp)
       setLoading(false)
    }

  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary
        hover:scale-105  hover:cursor-pointer
        transition duration-300 ease-in-out transform hover:-translate-y-1
        hover:bg-gray-200 hover:border-gray-300 hover:shadow-md
        hover:border-transparent hover'
        onClick={()=>{
            setOpenDailog(true);
        }}
        >
            <h2 className='text-lg text-center'>
                + Add New</h2>
            </div>
            <Dialog open={openDailog} onOpenChange={()=>setOpenDailog(false)}>
                <DialogContent className="max-w-2xl">
                <DialogHeader >
                <DialogTitle className="text-2xl" >Tell Us More About Your Job Interview</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={onSubmit}>
                        <div>
                        <h2>Add Details about yout job position/role, Job description and years of experience</h2>
                        <div className='mt-7 my-3'>
                            <label>Job Role/Job Position</label>
                            <Input placeholder='Ex. Full Stack Developer'
                            required
                            onChange={(e)=>setJobPosition(e.target.value)}
                            />
                        </div>

                        <div className='my-3'>
                            <label>Job Description or Tech Stack(Please Explain in Short)</label>
                            <Textarea placeholder='Ex. React, NextJS, Ruby on Rails etc' required
                                onChange={(e)=>setJobDesc(e.target.value)}
                            />
                        </div>

                        <div className='my-3'>
                            <label>Years Of Experience</label>
                        <Input
                            placeholder='Ex. 10'
                            type='number'
                            max="100"
                            onChange={(e)=>setJobExperience(Number(e.target.value))}
                            required
                            
                        />


                        </div>
                        </div>

                        <div className='flex gap-5 justify-end'>
                        <Button type="button" variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
                            <Button type='submit'
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <LoaderCircle className='animate-spin'/>
                                        'Generating Please Wait'
                                    </>
                                ) : (
                                    'Start Interview'
                                )}
                            </Button>
                        </div>
                        </form>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
  )
}

export default AddNewInterview