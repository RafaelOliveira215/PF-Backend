import cors from "cors"
import { signup,login } from "./controller/userController"
import express, { Express} from "express"
import { createPost,findPost, findPostById, createCollection, getCollections,deletePost } from "./controller/postConstroller"

const app: Express = express()
app.use(express.json())
app.use(cors())


app.post('/users/signup',signup)
app.post('/users/login',login)

app.post('/image/create',createPost) 
app.post('/images/createcollection',createCollection)
app.get('/images/collections',getCollections) 
app.get('/posts',findPost)
app.get('/posts/:id',findPostById)
app.delete(`/post/delete`,deletePost)


app.listen(3003, () => {
   console.log("Server running on port 3003")
})