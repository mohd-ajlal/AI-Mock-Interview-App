// StartInterview.tsx
'use client'

import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_component/QuestionsSection'
import RecordAnsSection from './_component/RecordAnsSection'

function StartInterview({ params }: { params: any }) {
  const [interviewData, setInterviewData] = useState<{
    id: number;
    jsonMockResp: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdBy: string;
    createdAt: string | null;
    mockId: string;
  } | null>(null);

  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<any[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result && result[0] && result[0].jsonMockResp) {
        try {
          const jsonMockResp = JSON.parse(result[0].jsonMockResp);
          setMockInterviewQuestion(jsonMockResp);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }

      setInterviewData(result[0] || null);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions Section */}
        <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} 
        activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/Audio recording */}
          {/* Video/Audio recording component or content goes here */}
          <div>

          <RecordAnsSection/>
          </div>
      </div>
  )
}

export default StartInterview;
