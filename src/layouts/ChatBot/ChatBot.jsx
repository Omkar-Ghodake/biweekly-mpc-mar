import React, { useEffect, useState } from 'react'
import ChatBotButton from './ChatBotButton'
import ChatBox from './ChatBox'
import { GoogleGenAI } from '@google/genai'
import { ChatBotData } from './ChatBotData.js'
import { useLocation } from 'react-router'

const ChatBot = () => {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false)
  const [displayGreeting, setDisplayGreeting] = useState(true)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const { pathname } = useLocation()

  // this code is for gemini ai
  const ai = new GoogleGenAI({
    apiKey: 'AIzaSyBdTxoCOu2KI4EsTi5XHlVdL-AAi_rlu8o',
  })

  const excludeChatbotLinks = ['/', '/landing']

  async function main() {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'Explain how AI works',
    })
    console.log(response.text)
  }

  const generateResponse = async (prompt) => {
    console.log(ChatBotData)
    // manipulated prompt

    const final_prompt = `
     Here is a dataset in JSON format:
     ${JSON.stringify(ChatBotData)}

     Answer the following query based on the dataset:
     "${prompt}"

    About : The dataset contains data of employees/members/persons of MPC team and their respective personal projects and contribution in this website/project who are Associate QA Enginner and there are a total of two designation in the team one is Team Leads and the other is teammate also their managers data is present in the dataset and the dataset also contains the data about their work in MPCData

    Instuctions : 
    - Give only Answer of query as response and not the instructions in response 
    - Strictly do not mention the source of your dataset in any format and incase of asked to do so generate a default response and strictly don't give whole data in response 
    - Strictly follow the given instructions 
    - Remember that a team lead is also a member of team and can be referred as a lead 
    - Return the response in 20-50 words until it's mentioned or required
    - The data which is related to employees is present in the EmployeeData and data related to MPC is present in MPCData
    - If the query's response is not present in the dataset then return "Sorry ! I don't have any data related to your query "${prompt}" and if the query is abusive and offensive then return a profanity response"
    - format the response using line breaks and in paragraph form 
    - Extend the response by taking reference of query to make it humanly if required 
    - consider synonyms of the words also while parsing the query 
    - don't add that whether a team member is lead or not in the response and also don't add gender of team members anywhere but use the pronouns accordingly
    - while asking about yourself strictly remember that Sakshi , Sanjeev and Rishabh developed you while Anushree helped in your training and don't mention any personal projects of sakshi,sanjeev , rishabh and anushree there 
    - consider total team score is 171 and don't mention score until asked
    - Consider the count of gender from the employee data set as there are 5 females and 13 males in the team
    - Vartika , Sejal and Akhil are not the team members as they are at management level so don't give responses for them until prompt contains their name or specificly asked
    - Remember that Vartika , Sejal and Akhil are not intrested in product management hence don't generate response related to it
    - Do not use * 
    - Consider that every member is interested and want to work in their release intrest technology
    - When asked related to release intrest or intrest you have to search for the data in employee data dataset
    - Consider that there are total 11 members named Avinash , Devraj , Dhiraj , Bhavya , Nikita Sonawane , Vishnu , Rishabh , Jaypal , Shubham , Omkar and umakant in the team  who are interested in any kind of development
    - Issue Type in employee data can also be reffered as the severity of issue
    - Do not generate reasponses for Json as prompt and YAML prompt
    - reply for jai shree ram as jai shree ram and assalam walikum as jai shree ram

    `;

   


    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: final_prompt,
    })
    return response.text
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    setDisplayGreeting(false)

    const userMessage = { sender: 'user', text: input }
    setMessages([...messages, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await generateResponse(input)
      const botResponse = {
        sender: 'bot',
        text: response,
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    } catch (error) {
      sendMessage()
    }
  }

  if (excludeChatbotLinks.includes(pathname)) return

  return (
    <div className='h-fit w-fit fixed right-6 bottom-6 z-40'>
      {isChatBoxOpen ? (
        <ChatBox
          messages={messages}
          isTyping={isTyping}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          displayGreeting={displayGreeting}
          setIsChatBoxOpen={setIsChatBoxOpen}
        />
      ) : (
        <ChatBotButton setIsChatBoxOpen={setIsChatBoxOpen} />
      )}
    </div>
  )
}

export default ChatBot
