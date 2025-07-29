export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { propertyDetails } = req.body;

  const prompt = `Write a compelling real estate flyer based on the following listing:\n\n${propertyDetails}\n\nFlyer:`;

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const flyer = data.choices?.[0]?.text?.trim() || 'No result.';

    res.status(200).json({ flyer });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to generate flyer.' });
  }
}
