const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/api/flyers', async (req, res) => {
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
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
