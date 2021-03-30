import{ Request, Response } from "express"
import {createPostBusiness, findPostBusiness, findPostBusinessById, createCollectionBusiness, getCollectionsBusiness, deletePostBusiness} from "../business/postBusiness"
import {getTokenData} from "../business/services/authenticator"
import * as dayjs from 'dayjs'


export const createCollection = async(req:Request, res:Response)=>{
 
   try {
      
      const {name} = req.body

      const token: string = req.headers.authorization as string
      const authenticate = getTokenData(token)

      if(!authenticate){throw new Error("você precisa estar logado")
     }
      
     await createCollectionBusiness(name,token)
  
      res.status(201).send("coleção criada com sucesso")

   } catch (error) {
      let message = error.sqlMessage || error.message
      res.statusCode = 400

      res.send({ message })
   }

   

}

export const getCollections = async(req:Request, res:Response)=>{

   try {

      const token: string = req.headers.authorization as string
      const authenticate = getTokenData(token)

      if(!authenticate){throw new Error("você precisa estar logado")
     }

     const collections = await getCollectionsBusiness(token)

     res.status(201).send(collections)
     
   } catch (error) {

      let message = error.sqlMessage || error.message
      res.statusCode = 400

      res.send({ message })
   
   }
   
}

 export const createPost = async(req:Request, res:Response)=>{
    try {
   
        const { subtitle, file, collection } = req.body
        const token: string = req.headers.authorization as string
        const authenticate = getTokenData(token)

      if(!authenticate){throw new Error("você precisa estar logado")
     }

        await createPostBusiness(subtitle, file, collection, token)
  
        res.status(201).send("post criado com sucesso")
  
     } catch (error) {
        let message = error.sqlMessage || error.message
        res.statusCode = 400
  
        res.send({ message })
     }
}

export const findPost = async(req:Request, res:Response)=>{
   try {
      

      const token: string = req.headers.authorization as string
      const authenticate = getTokenData(token)


      if(!authenticate){throw new Error("você precisa estar logado")
     }
 
      const post = await findPostBusiness(token)
 
       res.status(200).send(post)
 
    } catch (error) {
       let message = error.sqlMessage || error.message
       res.statusCode = 400
 
       res.send({ message })
    }
}

export const findPostById = async(req:Request, res:Response)=>{
    try {

       const { id } = req.params
       const token: string = req.headers.authorization as string
       const authenticate = getTokenData(token)

       if(!authenticate){throw new Error("você precisa estar logado")
      }
       const post = await findPostBusinessById(id, token)
  
        res.status(200).send(post)
  
     } catch (error) {
        let message = error.sqlMessage || error.message
        res.statusCode = 400
  
        res.send({ message })
     }
}

export const deletePost = async(req:Request, res:Response)=>{
   try {
      const token: string = req.headers.authorization as string
      const authenticate = getTokenData(token)


      if(!authenticate){throw new Error("você precisa estar logado")
     }
     const {id} = req.params

     await deletePostBusiness(token, id)

     res.status(200).send("Post deletado com sucesso")

   } catch (error) {
      
   }
}