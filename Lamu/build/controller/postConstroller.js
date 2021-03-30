"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.findPostById = exports.findPost = exports.createPost = exports.getCollections = exports.createCollection = void 0;
const postBusiness_1 = require("../business/postBusiness");
const authenticator_1 = require("../business/services/authenticator");
const createCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const token = req.headers.authorization;
        const authenticate = authenticator_1.getTokenData(token);
        if (!authenticate) {
            throw new Error("você precisa estar logado");
        }
        yield postBusiness_1.createCollectionBusiness(name, token);
        res.status(201).send("coleção criada com sucesso");
    }
    catch (error) {
        let message = error.sqlMessage || error.message;
        res.statusCode = 400;
        res.send({ message });
    }
});
exports.createCollection = createCollection;
const getCollections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const authenticate = authenticator_1.getTokenData(token);
        if (!authenticate) {
            throw new Error("você precisa estar logado");
        }
        const collections = yield postBusiness_1.getCollectionsBusiness(token);
        res.status(201).send(collections);
    }
    catch (error) {
        let message = error.sqlMessage || error.message;
        res.statusCode = 400;
        res.send({ message });
    }
});
exports.getCollections = getCollections;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subtitle, file, collection } = req.body;
        const token = req.headers.authorization;
        const authenticate = authenticator_1.getTokenData(token);
        if (!authenticate) {
            throw new Error("você precisa estar logado");
        }
        yield postBusiness_1.createPostBusiness(subtitle, file, collection, token);
        res.status(201).send("post criado com sucesso");
    }
    catch (error) {
        let message = error.sqlMessage || error.message;
        res.statusCode = 400;
        res.send({ message });
    }
});
exports.createPost = createPost;
const findPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const authenticate = authenticator_1.getTokenData(token);
        if (!authenticate) {
            throw new Error("você precisa estar logado");
        }
        const post = yield postBusiness_1.findPostBusiness(token);
        res.status(200).send(post);
    }
    catch (error) {
        let message = error.sqlMessage || error.message;
        res.statusCode = 400;
        res.send({ message });
    }
});
exports.findPost = findPost;
const findPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;
        const authenticate = authenticator_1.getTokenData(token);
        if (!authenticate) {
            throw new Error("você precisa estar logado");
        }
        const post = yield postBusiness_1.findPostBusinessById(id, token);
        res.status(200).send(post);
    }
    catch (error) {
        let message = error.sqlMessage || error.message;
        res.statusCode = 400;
        res.send({ message });
    }
});
exports.findPostById = findPostById;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const authenticate = authenticator_1.getTokenData(token);
        if (!authenticate) {
            throw new Error("você precisa estar logado");
        }
        const { id } = req.params;
        yield postBusiness_1.deletePostBusiness(token, id);
        res.status(200).send("Post deletado com sucesso");
    }
    catch (error) {
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=postConstroller.js.map