import { connection } from "./connection";
import {AuthenticationData} from "../business/entities/user"

export const insertCollection =async(
    id:string,
    name:string,
    tokenData:AuthenticationData
)=>{
    
    await connection.raw(`insert into Lamu_colections values("${id}","${tokenData.id}","${name}")`)
}

export const getCollections = async(
    tokenData:AuthenticationData
)=>{
    
    const queryResult:any = await connection.raw(`select * from Lamu_colections where author = "${tokenData.id}"`)
    return queryResult
}

export const insertPost = async(
    tokenData:AuthenticationData,
    id:string,
    subtitle:string,
    date:Date,
    file:string,
    tags:string,
    collection:string
)=>{
    await connection.raw(`insert into Lamu_images values("${id}","${subtitle}","${tokenData.id}","${date}","${file}","${tags}","${collection}")`)
}

export const selectPost = async(
  )=>{
   
      const queryResult: any = await connection.raw(`select * from Lamu_images join Lamu_users where Lamu_images.author = Lamu_users.user_id`)
      return queryResult
    
  }

export const selectPostById = async(
  id:string,
  tokenData:AuthenticationData
)=>{
    
    const queryResult: any = await connection.raw(`select * from Lamu_images join Lamu_users where image_id = "${id}" and Lamu_images.author = Lamu_users.user_id`)

    return queryResult
}

export const deletePost = async(
    tokenData:AuthenticationData,
    id:string
) =>{

    await connection.raw(`delete from Lamu_images where image_id = "${id}" and author = "${tokenData.id}"`)

}

