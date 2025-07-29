export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { propertyDetails } = req.body;

  const messages = [
    {
      role: 'system',
      content: 'You are a real estate copywriter. Write a compelling flyer based on listing details provided.',
    },
    {
      role: 'user',
      content: propertyDetails,
    },
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const flyer = data.choices?.[0]?.message?.content?.trim() || 'No result.';
    res.status(200).json({ flyer });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to generate flyer.' });
  }
}
