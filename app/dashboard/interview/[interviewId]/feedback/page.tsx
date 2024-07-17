'use client'

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface FeedbackItem {
    id: number;
    createdAt: string | null;
    mockIdRef: string;
    question: string;
    correctAns: string | null;
    userAns: string | null;
    feedback: string | null;
    rating: string | null;
    userEmail: string;
}

function Feedback({ params }: { params: any }) {

    const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([])

    useEffect(()=>{
        GetFeedback()
    }, [])

    const GetFeedback = async()=>{
        const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id)

        console.log(result)
        setFeedbackList(result);
    }

    const route = useRouter()

    const totalRating = feedbackList.reduce((acc, item) => {
        return acc + parseInt(item.rating || '0')
    }, 0)
    const ques:any = process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT;

  return (
    <div className='p-10'>


        {feedbackList?.length ==0?
        <h2 className='font-bold text-xl text-gray-500'>NO Interview Feedback record Found</h2>:
        <>
                <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
                <h2 className='font-bold text-2xl'>Here is your Interview Feedback</h2>
        <h2 className='text-purple-600 text-lg my-3'>Your Overall Interview Rating: <strong>{totalRating/ques}/10</strong></h2>
        <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, Your answer and feedback for improvement</h2>

        {feedbackList.length > 0 ? feedbackList.map((item, index) => (
            <Collapsible key={index} className='mt-7'>
                <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>{item.question}
                <ChevronsUpDown className='h-5 w-5'/>
                </CollapsibleTrigger>
                <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong> {item.rating}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-800'><strong>Correct Answer:</strong> {item.correctAns}</h2>
                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-800'><strong>Your Answer:</strong> {item.userAns}</h2>
                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-800'><strong>Feedback:</strong> {item.feedback}</h2>
                </div>

                </CollapsibleContent>
            </Collapsible>
        )) : <p>No feedback available.</p>}

</>}
        <Button onClick={()=>route.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback
