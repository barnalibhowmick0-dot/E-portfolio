import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app=express(); app.use(cors()); app.use(express.json())
app.get('/api/health',(req,res)=>res.json({ok:true,service:'Barnali portfolio API'}))
app.post('/api/contact',async(req,res)=>{
  const {name,email,message}=req.body||{}
  if(!name||!email||!message) return res.status(400).json({error:'Name, email and message are required.'})
  if(!process.env.SMTP_HOST) return res.json({ok:true,mode:'demo',message:'Contact received. Configure SMTP variables to enable email delivery.'})
  const transporter=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:process.env.SMTP_SECURE==='true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}})
  await transporter.sendMail({from:process.env.SMTP_FROM||process.env.SMTP_USER,to:process.env.CONTACT_TO||'barnalibhowmick0@gmail.com',replyTo:email,subject:`Portfolio enquiry from ${name}`,text:`Name: ${name}\nEmail: ${email}\n\n${message}`})
  res.json({ok:true})
})
const port=process.env.PORT||4000; app.listen(port,()=>console.log(`Portfolio API running on ${port}`))
