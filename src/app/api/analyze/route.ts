import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const { raceProgram, pastPerformances, splitData } = await req.json();

    if (!raceProgram || !pastPerformances || !splitData) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const prompt = `
You are an expert Horse Racing Analyst specializing in tactical speed data and race shape analysis.
Analyze the following data for a single horse race and provide a structured JSON analysis.

RULES:
1. Running style MUST be derived ONLY from split data. 
   - No split = no running style.
   - No running style = no race shape contribution from that horse.
2. Race shape must be based on the collective behavior of all horses.
3. Output MUST be ONLY the JSON object.

DATA:
--- RACE PROGRAM ---
${JSON.stringify(raceProgram, null, 2)}

--- PAST PERFORMANCES ---
${JSON.stringify(pastPerformances, null, 2)}

--- SPLIT DATA ---
${JSON.stringify(splitData, null, 2)}

--- EXPECTED OUTPUT JSON FORMAT ---
{
  "steps": ["Step 1 description", "Step 2..."],
  "paceMap": "Tactical map description",
  "raceShape": "Expected tempo and dynamic description",
  "scenarios": [
    { "title": "Main Scenario", "description": "...", "probability": 70 },
    { "title": "Counter Scenario", "description": "...", "probability": 30 }
  ],
  "horses": [
    {
      "name": "Horse Name",
      "runningStyle": "Style (e.g. Leader, Presser, Closer)",
      "strengths": ["..."],
      "risks": ["..."],
      "scenarioFit": "How they fit the expected shape",
      "winPercentage": 25
    }
  ],
  "winPercentages": { "Horse Name": 25 },
  "winnerPool": ["Name1", "Name2"],
  "finalDecision": "Calculated recommendation"
}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional racing analyst. Return JSON only.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return NextResponse.json(result);

  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
