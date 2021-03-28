import {generateId} from "./services/idGenerator"
import {getTokenData} from "./services/authenticator"
import {AuthenticationData} from "./entities/user"
import { insertPost, selectPostById, selectPost, insertCollection, getCollections, deletePost } from "../data/postDatabase"
import {Post} from "./entities/post"

export const createCollectionBusiness = async(
  name:string,
  token:string
) =>{
  const id: string = generateId()
  const tokenData: AuthenticationData = getTokenData(token)

  await insertCollection(
    id,
    name,
    tokenData
    )
}

export const getCollectionsBusiness = async(
  token:string
)=>{

  const tokenData: AuthenticationData = getTokenData(token)
  const collections = await getCollections(
     tokenData
  )

  return collections
}

export const createPostBusiness = async(
  subtitle:string,
  file:string,
  collection:string,
  token:string
    )=>{

      const dayjs = require('dayjs')
      const date = dayjs().format(`YYYY/MM/DD`)
      const tokenData: AuthenticationData = getTokenData(token)
      const tags:string = generateId()
      const id: string = generateId()

      await insertPost(
      tokenData,
      id,
      subtitle,
      date,
      file,
      tags,
      collection
      )
      
}

export const findPostBusiness = async(
  token:string
) =>{
  const tokenData: AuthenticationData = getTokenData(token)

  const queryResult = await selectPost()

    if (!queryResult[0]) {
       throw new Error("Post not found")
    }
    console.log(queryResult)

    let posts: any = []

     queryResult[0].map((post:any)=>{
        posts.push({
            imageId: post.image_id,
            authorId:post.author,
            userId:tokenData.id,
            name:post.name,
            subtitle: post.subtitle,
            date: post.date,
            file: post.file,
            tags: post.tags,
            collection: post.collection
          })
    })
     
    
    return posts
}

export const findPostBusinessById = async(
    id:string,
    token:string
) =>{
    
    const tokenData: AuthenticationData = getTokenData(token)

    const queryResult = await selectPostById(id, tokenData)


      if (!queryResult[0]) {
         throw new Error("Post not found")
      }

      const post: Post = {
         id: queryResult[0][0].id,
         name:queryResult[0][0].name,
         subtitle: queryResult[0][0].subtitle,
         author: [queryResult[0][0].author, queryResult[0][0].name],  
         date: queryResult[0][0].date,
         file:queryResult[0][0].file,
         tags:queryResult[0][0].tags,
         collection:queryResult[0][0].collection
      }
      return post
}

export const deletePostBusiness = async(
  token:string,
  id:string
) =>{

  const tokenData: AuthenticationData = getTokenData(token)

  await deletePost(tokenData, id)
}