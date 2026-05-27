import ChatMessage from "@/models/chatMessage.model"
import connectDb from "@/lib/db"
import axios from "axios"
const geminiurl=process.env.GEMINI_API_URL!
export async function POST(
 req:Request
){
const {rideId}=await req.json()
 await connectDb()
const data= await axios.post(geminiurl,{
 "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
})
 const messages=await ChatMessage
 .find({rideId})
 .sort({createdAt:1})

 return Response.json({
  messages
 })
}