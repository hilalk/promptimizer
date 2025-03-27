import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || 'your-api-key-placeholder', // Use environment variable
  dangerouslyAllowBrowser: true // Note: In production, API calls should be handled by a backend
});

// Actual OpenAI API call
const actualOptimizePrompt = async (originalPrompt) => {
  console.log('Calling OpenAI API to optimize prompt:', originalPrompt);
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: `You are a prompt optimization expert. Your task is to dramatically transform and improve prompts using as many of the 20 prompt engineering criteria as possible, incorporating them directly into the optimized prompt text.

Return ONLY a JSON object with exactly this structure:
{
  "optimizedPrompt": "your optimized prompt here",
  "explanation": "Explanation of Improvements:\\n\\n1. **Clear & Specific Instructions**: explanation here\\n\\n2. **Defined Output Format**: explanation here\\n\\n3. **Appropriate Tone and Style**: explanation here\\n\\n4. **Context Provision**: explanation here\\n\\n5. **Use of Examples**: explanation here\\n\\n6. **Specified Length & Detail**: explanation here\\n\\n7. **Iteration and Refinement**: explanation here\\n\\n8. **Roles or Personas Assignment**: explanation here\\n\\n9. **Explicit Constraint Handling**: explanation here\\n\\n10. **Structured Response**: explanation here\\n\\n11. **Chain-of-Thought Prompting**: explanation here\\n\\n12. **Temperature and Top-p Adjustments**: explanation here\\n\\n13. **Delimiters for Clarity**: explanation here\\n\\n14. **Prompt Chaining**: explanation here\\n\\n15. **Negative Prompting**: explanation here\\n\\n16. **Priming or Context Seeding**: explanation here\\n\\n17. **Conditional Instructions**: explanation here\\n\\n18. **Explicit Reasoning Requests**: explanation here\\n\\n19. **Interactive Prompting**: explanation here\\n\\n20. **Prompt Testing & Experimentation**: explanation here"
}

Apply these 20 prompt engineering criteria when optimizing - IMPORTANT: DIRECTLY EMBED THESE TECHNIQUES INTO THE TEXT OF THE OPTIMIZED PROMPT:

1. **Clear & Specific Instructions**: Ensures the model understands exactly what is needed, reducing ambiguity.
   Example: "Summarize the article in 3 sentences."

2. **Defined Output Format**: Helps produce consistent, structured responses easy to interpret.
   Example: "List 5 key points as bullet points."

3. **Appropriate Tone and Style**: Aligns the response to audience expectations (formal, conversational, technical).
   Example: "Explain quantum computing in a friendly, conversational style."

4. **Context Provision**: Provides background to improve accuracy and relevance.
   Example: "Given that the user knows basic HTML, explain CSS in simple terms."

5. **Use of Examples**: Clarifies expectations and guides the model by showing desired output.
   Example: "Generate names like Airbnb, Slack, or Spotify for a new music app."

6. **Specified Length & Detail**: Controls response length and complexity to match user needs.
   Example: "Write a brief, 50-word bio for a web designer."

7. **Iteration and Refinement**: Improves quality through iterative adjustments based on user feedback.
   Example: "Rewrite this response again, but simpler."

8. **Roles or Personas Assignment**: Frames responses effectively by guiding the perspective or expertise.
   Example: "Answer as if you were a history professor explaining to students."

9. **Explicit Constraint Handling**: Clearly defines what to avoid, preventing unwanted or irrelevant content.
   Example: "Describe cybersecurity threats without mentioning phishing."

10. **Structured Response**: Improves readability, usability, and clarity through consistent structuring.
    Example: "Provide pros and cons in a two-column table."

11. **Chain-of-Thought Prompting**: Encourages step-by-step reasoning, enhancing clarity and logical accuracy.
    Example: "Solve this math problem step-by-step."

12. **Temperature and Top-p Adjustments**: Balances creativity and consistency by adjusting response randomness.
    Example: "Set temperature to 0.3 for highly accurate answers."

13. **Delimiters for Clarity**: Clearly separates instructions and content, avoiding confusion.
    Example: "Summarize the following text: <text here>"

14. **Prompt Chaining**: Sequentially refines prompts for improved precision.
    Example: "Summarize this text, then simplify that summary into one sentence."

15. **Negative Prompting**: Explicitly indicates undesirable elements, keeping responses relevant.
    Example: "Write about renewable energy without mentioning solar power."

16. **Priming or Context Seeding**: Guides the model by providing initial context or expectations.
    Example: "You are a travel expert advising first-time travelers."

17. **Conditional Instructions**: Adapts the response dynamically based on specific conditions or contexts.
    Example: "If the audience is beginners, simplify the explanation; otherwise, provide detailed reasoning."

18. **Explicit Reasoning Requests**: Requires the model to justify its responses, enhancing reliability and transparency.
    Example: "List three best frameworks and explain why each was selected."

19. **Interactive Prompting**: Uses conversational interactions to refine and optimize output iteratively.
    Example: "After your response, I will give feedback for further adjustments."

20. **Prompt Testing & Experimentation**: Systematically evaluates and compares prompts to optimize overall effectiveness.
    Example: "Test variations of this prompt to see which yields the clearest response."

CRUCIAL INSTRUCTIONS:
1. You MUST explicitly embed each technique directly into the text of your optimized prompt
2. Don't just mention the criteria, actually implement them in the prompt text
3. Include actual examples, delimiters, role assignments, etc. in the prompt itself
4. Implement at least 15 of the 20 criteria in a meaningful way
5. The optimized prompt should be significantly longer and more detailed than the original
6. Only explain criteria in the "explanation" section that you've actually applied in the optimized prompt

Do not include any text outside the JSON object. Ensure all newlines in the explanation use \\n and all quotes are properly escaped.`
        },
        {
          role: "user",
          content: originalPrompt
        }
      ],
      response_format: { type: "json_object" }
    });
    
    console.log('OpenAI API response received:', response.choices[0].message);
    
    // Parse the JSON from the response
    const responseContent = JSON.parse(response.choices[0].message.content);
    return responseContent;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};

// Mock function as fallback in case API doesn't work
const mockOptimizePrompt = (originalPrompt) => {
  console.log('Mocking optimize prompt call:', originalPrompt);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        optimizedPrompt: `[ROLE: Prompt Optimization Expert] I need you to ${originalPrompt.trim()} and provide a thoroughly detailed explanation that breaks down complex concepts into easy-to-understand language. 

FORMAT YOUR RESPONSE AS FOLLOWS:
1. Start with a concise executive summary (200 words maximum)
2. Then provide a detailed analysis with sections clearly marked by headings
3. Include at least 3 specific examples to illustrate key points
4. Conclude with actionable recommendations

CONSTRAINTS:
- Avoid technical jargon unless absolutely necessary
- Keep sentences under 20 words for readability
- Do NOT include any information about [topic to avoid]
- Primary audience: intermediate level knowledge

If aspects of my question remain unclear, please follow this reasoning process:
Step 1: Identify ambiguous elements
Step 2: Make reasonable assumptions based on context
Step 3: Explain your assumptions in your response

Would you please provide your response both as a comprehensive explanation and as a simplified summary table?`,
        explanation: "Explanation of Improvements:\\n\\n1. **Clear & Specific Instructions**: Added explicit formatting instructions with numbered points and section requirements for a structured response.\\n\\n2. **Defined Output Format**: Specified exactly how the response should be formatted with executive summary, detailed analysis, examples, and recommendations.\\n\\n3. **Appropriate Tone and Style**: Maintained a formal, instructional tone appropriate for receiving expert information.\\n\\n4. **Context Provision**: Added '[ROLE: Prompt Optimization Expert]' to frame the response perspective.\\n\\n5. **Use of Examples**: Requested 'at least 3 specific examples' to illustrate key points.\\n\\n6. **Specified Length & Detail**: Constrained the executive summary to '200 words maximum' while requiring 'detailed analysis' for the main content.\\n\\n7. **Constraint Handling**: Added specific constraints about avoiding jargon, sentence length, and topics to avoid.\\n\\n8. **Roles Assignment**: Established the AI as a 'Prompt Optimization Expert' to frame the perspective.\\n\\n9. **Explicit Constraint Handling**: Clearly listed constraints under a dedicated section with bullet points.\\n\\n10. **Structured Response**: Required specific formatting with numbered lists, headings, and sections.\\n\\n11. **Chain-of-Thought Prompting**: Included a 3-step reasoning process for handling unclear aspects of the question.\\n\\n12. **Delimiters for Clarity**: Used headings like 'FORMAT YOUR RESPONSE AS FOLLOWS:' and 'CONSTRAINTS:' to separate instructions.\\n\\n13. **Priming or Context Seeding**: Specified the audience as having 'intermediate level knowledge' to calibrate explanation depth.\\n\\n14. **Conditional Instructions**: Provided instruction for what to do 'If aspects of my question remain unclear'.\\n\\n15. **Explicit Reasoning Requests**: Requested a reasoning process with 'Step 1, Step 2, Step 3' for handling ambiguity."
      };
      
      resolve(response);
    }, 1500);
  });
};

// Function to optimize a prompt - try real API first, fall back to mock if API fails
const optimizePrompt = async (prompt) => {
  try {
    console.log('Starting prompt optimization process');
    
    try {
      // First try the real OpenAI API
      return await actualOptimizePrompt(prompt);
    } catch (apiError) {
      console.error('API call failed, falling back to mock:', apiError);
      // Fall back to mock if API call fails
      return await mockOptimizePrompt(prompt);
    }
  } catch (error) {
    console.error('Error optimizing prompt:', error);
    throw error;
  }
};

export { optimizePrompt }; 