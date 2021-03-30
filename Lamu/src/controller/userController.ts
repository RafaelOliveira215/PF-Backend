import  {Request, Response } from "express"
import {signupBusiness, loginBusiness} from "../business/userBusiness"

 export const signup = async(req:Request, res:Response)=>{
    try {
      
        const { name, email,nickname, password } = req.body
  
        const token = await signupBusiness(name, email,nickname, password)
  
        res.status(201).send(`usuario criado com sucesso:${token}`)
  
     } catch (error) {
        res.statusCode = 400
        let message = error.sqlMessage || error.message
  
        res.send({ message })
     }
}

export const login = async(req:Request, res:Response)=>{
    try {
    
        const { email, password } = req.body
  
        const token = await loginBusiness(email, password)
  
        res.status(200).send(`${token}`)
  
     } catch (error) {
        let message = error.sqlMessage || error.message
        res.statusCode = 400
  
        res.send({ message })
     }
}