"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const userController_1 = require("./controller/userController");
const express_1 = __importDefault(require("express"));
const postConstroller_1 = require("./controller/postConstroller");
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.post('/users/signup', userController_1.signup);
app.post('/users/login', userController_1.login);
app.post('/image/create', postConstroller_1.createPost);
app.post('/images/createcollection', postConstroller_1.createCollection);
app.get('/images/collections', postConstroller_1.getCollections);
app.get('/posts', postConstroller_1.findPost);
app.get('/posts/:id', postConstroller_1.findPostById);
app.delete(`/post/delete`, postConstroller_1.deletePost);
app.listen(3003, () => {
    console.log("Server running on port 3003");
});
//# sourceMappingURL=index.js.map