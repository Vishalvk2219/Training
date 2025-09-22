import express from 'express'
import {
  chatWithChatGPT,
  chatWithGemini
} from '../controllers/chatbot-controller.js'

const chatbotRouter = express.Router()

chatbotRouter.post('/chatgpt', chatWithChatGPT)
chatbotRouter.post('/gemini', chatWithGemini)

export default chatbotRouter
