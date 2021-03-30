import { connection } from "./connection";
import {User} from "../business/entities/user"

export const insertUser = async(
    user:User
)=>{
    await connection.raw(`
    insert into Lamu_users values ("${user.id}","${user.name}","${user.email}","${user.nickname}","${user.password}")
    `)
}

export const findUser = async(
    email:string
)=>{
    const queryResult: any = await connection.raw(`select * from Lamu_users where email = "${email}" `)
    return queryResult
} 