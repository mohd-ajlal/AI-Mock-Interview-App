import { serial, text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";


export const MockInterview = pgTable('MockInterview', {

    id:serial('id').primaryKey(),

    jsonMockResp:text('jsonMockResp').notNull(),

    jobPosition:text('jobPosition').notNull(),
    jobDesc:text('jobDesc').notNull(),
    jobExperience:text('jobExperience').notNull(),

    createdBy:text('createdBy').notNull(),
    createdAt:text('createdAt'),
    
    mockId:text('mockId').notNull(),
})