import {generateId} from "./services/idGenerator"
import {hash, compare} from "./services/hashManager"
import {generateToken} from "./services/authenticator"
import {findUser, insertUser} from "../data/userDatabase"
import {User} from "./entities/user"


export const signupBusiness = async( 
    name:string,
    email:string,
    nickname:string,
    password:string
    ) =>{

    if (!name || !email ||!nickname || !password) {
        throw new Error('"name", "email", "nickname" and "password" must be provided')
     }

     const id: string = generateId()

     const cypherPassword = await hash(password);

     await insertUser({
      id,
      name,
      email,
      nickname,
      password: cypherPassword
   })

     const token: string = generateToken({ id })
    return token
}

export const loginBusiness = async(
    email:string,
    password:string
    ) => {

    if (!email || !password) {
        throw new Error('"email" and "password" must be provided')
     }

     const queryResult = await findUser(email)

     if (!queryResult[0]) {
        throw new Error("Invalid credentials")
     }
     
     const user: User = {
        id: queryResult[0][0].user_id,
        name: queryResult[0][0].name,
        email: queryResult[0][0].email,
        nickname:queryResult[0][0].nickname,
        password: queryResult[0][0].password
     }

     const passwordIsCorrect: boolean = await compare(password, user.password)
     if (!passwordIsCorrect) {
        throw new Error("Invalid credentials")
     }

     const token: string = generateToken({
        id: user.id
     })
     return token
} 
 