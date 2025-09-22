import axios from 'axios'


const handleError = (res, statusCode, message, error = null) => {
  if (error) console.error(message, error.response?.data || error.message)
  return res.status(statusCode).json({
    success: false,
    error: message
  })
}

export const chatWithChatGPT = async (req, res) => {
  const { message } = req.body
  if (!message || typeof message !== 'string') {
    return handleError(res, 400, 'Message is required and must be a string')
  }
  if (!process.env.OPENAI_API_KEY) {
    return handleError(res, 500, 'OPENAI_API_KEY not configured')
  }
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        timeout: 20000 
      }
    )

    const reply = response.data?.choices?.[0]?.message?.content
    if (!reply) {
      return handleError(res, 502, 'No reply received from ChatGPT API')
    }
    return res.status(200).json({
      success: true,
      reply
    })
  } catch (error) {
    return handleError(res, 500, 'Error calling ChatGPT API', error)
  }
}

export const chatWithGemini = async (req, res) => {
  const { message } = req.body

  if (!message || typeof message !== 'string') {
    return handleError(res, 400, 'Message is required and must be a string')
  }

  if (!process.env.GEMINI_API_KEY) {
    return handleError(res, 500, 'GEMINI_API_KEY not configured')
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`

    const response = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: message }] }]
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 20000
      }
    )

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!reply) {
      return handleError(res, 502, 'No reply received from Gemini API')
    }

    return res.status(200).json({
      success: true,
      reply
    })
  } catch (error) {
    console.error(error.response?.data || error.message)
    return handleError(res, 500, 'Error calling Gemini API', error)
  }
}
