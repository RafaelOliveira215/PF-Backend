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
exports.deletePostBusiness = exports.findPostBusinessById = exports.findPostBusiness = exports.createPostBusiness = exports.getCollectionsBusiness = exports.createCollectionBusiness = void 0;
const idGenerator_1 = require("./services/idGenerator");
const authenticator_1 = require("./services/authenticator");
const postDatabase_1 = require("../data/postDatabase");
const createCollectionBusiness = (name, token) => __awaiter(void 0, void 0, void 0, function* () {
    const id = idGenerator_1.generateId();
    const tokenData = authenticator_1.getTokenData(token);
    yield postDatabase_1.insertCollection(id, name, tokenData);
});
exports.createCollectionBusiness = createCollectionBusiness;
const getCollectionsBusiness = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenData = authenticator_1.getTokenData(token);
    const collections = yield postDatabase_1.getCollections(tokenData);
    return collections;
});
exports.getCollectionsBusiness = getCollectionsBusiness;
const createPostBusiness = (subtitle, file, collection, token) => __awaiter(void 0, void 0, void 0, function* () {
    const dayjs = require('dayjs');
    const date = dayjs().format(`YYYY/MM/DD`);
    const tokenData = authenticator_1.getTokenData(token);
    const tags = idGenerator_1.generateId();
    const id = idGenerator_1.generateId();
    yield postDatabase_1.insertPost(tokenData, id, subtitle, date, file, tags, collection);
});
exports.createPostBusiness = createPostBusiness;
const findPostBusiness = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenData = authenticator_1.getTokenData(token);
    const queryResult = yield postDatabase_1.selectPost();
    if (!queryResult[0]) {
        throw new Error("Post not found");
    }
    let posts = [];
    queryResult[0].map((post) => {
        posts.push({
            imageId: post.image_id,
            authorId: post.author,
            userId: tokenData.id,
            name: post.name,
            subtitle: post.subtitle,
            date: post.date,
            file: post.file,
            tags: post.tags,
            collection: post.collection
        });
    });
    return posts;
});
exports.findPostBusiness = findPostBusiness;
const findPostBusinessById = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenData = authenticator_1.getTokenData(token);
    const queryResult = yield postDatabase_1.selectPostById(id, tokenData);
    if (!queryResult[0]) {
        throw new Error("Post not found");
    }
    const post = {
        id: queryResult[0][0].id,
        name: queryResult[0][0].name,
        subtitle: queryResult[0][0].subtitle,
        author: [queryResult[0][0].author, queryResult[0][0].name],
        date: queryResult[0][0].date,
        file: queryResult[0][0].file,
        tags: queryResult[0][0].tags,
        collection: queryResult[0][0].collection
    };
    return post;
});
exports.findPostBusinessById = findPostBusinessById;
const deletePostBusiness = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenData = authenticator_1.getTokenData(token);
    yield postDatabase_1.deletePost(tokenData, id);
});
exports.deletePostBusiness = deletePostBusiness;
//# sourceMappingURL=postBusiness.js.map