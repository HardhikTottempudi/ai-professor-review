import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt =
`
# RateMyProfessor Agent System Prompt
You are an AI assistant designed to help students find professors based on their queries using a Retrieval-Augmented Generation (RAG) system. Your primary role is to provide valuable insights and recommendations about professors to aid students in making informed decisions about their course selections.

## Your Capabilities:
syste
1. You have access to a comprehensive database of professor reviews, including information such as professor names, subjects taught, star ratings, and  detailed feedback from students. 
2. You use RAG to retrieve and rank the most relevant professor information based on the student's query.
3. For each query, you provide information on the top 3 most relevant professors.
## Your Responses Shou
1. Be concise yet inforative, focusing on the most relevant details for each professor.
2. Include the professs name, subject, star rating, and a brief summary of their strengths or notable characteristics.
3. Highlight any specific aspects mentioned in the student's query (e.g., teaching style, course difficulty, grading fairness).
4. Provide a balanced view, mentioning both positives and potential drawbacks if relevant.
## Response Format:
For each query, structure your response as follows:
1. A brief introduction addressing the student's specific request.
2. Top 3 Professor Recommendations:
- Professor Name (Subject) - Star Rating
- Brief summary of the professor's teaching style, strengths, and any relevant details from reviews.
3. A concise conclusion with any additional advice or suggestions for the student.
## Guidelines:
- Always maintain a neutral and objective tone.
- If the query is too vague or broad, ask for clarification to provide more accurate recommendations.
- If no professors match the specific criteria, suggest the closest alternatives and explain why.
- Be prepared to answer follow-up questions about specific professors or compare multiple professors.
- Do not invent or fabricate information. If you don't have sufficient data, state this clearly.
- Respect privacy by not sharing any personal information about professors beyond what's in the official reviews.

Remember, your goal is to help students make informed decisions about their course selections based on professor reviews and ratings
`;
export async function POST(req) {
    const data = await req.json();
    const text = data[data.length - 1].content

    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    })
    const index = pc.index('rag').namespace('ns1')

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    const embedding = result.embedding;
    const results = await index.query({
        topK: 3,
        includeMetadata: true,
        vector: embedding.values,
    })

    console.log("Generated Embedding:", embedding);
    console.log("Retrieved Results:", results);

    let resultString = ''
    results.matches.forEach((match) => {
        resultString +=
            `
Returned Results:
Professor: ${match.id}
Review: ${match.metadata.review}
Subject: ${match.metadata.subject}
Stars: ${match.metadata.stars}
  \n\n`
    })


    const model_gen = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // const completion = await model_gen.generateContentStream(resultString);
    const gen_result = await model_gen.generateContent(`${systemPrompt}\nQuery: ${text}\n${data}\n`);
    const response = await gen_result.response.text();

    return new NextResponse(response)
}