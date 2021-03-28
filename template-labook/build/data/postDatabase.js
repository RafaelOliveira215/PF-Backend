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
exports.deletePost = exports.selectPostById = exports.selectPost = exports.insertPost = exports.getCollections = exports.insertCollection = void 0;
const connection_1 = require("./connection");
const insertCollection = (id, name, tokenData) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.connection.raw(`insert into Lamu_colections values("${id}","${tokenData.id}","${name}")`);
});
exports.insertCollection = insertCollection;
const getCollections = (tokenData) => __awaiter(void 0, void 0, void 0, function* () {
    const queryResult = yield connection_1.connection.raw(`select * from Lamu_colections where author = "${tokenData.id}"`);
    return queryResult;
});
exports.getCollections = getCollections;
const insertPost = (tokenData, id, subtitle, date, file, tags, collection) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.connection.raw(`insert into Lamu_images values("${id}","${subtitle}","${tokenData.id}","${date}","${file}","${tags}","${collection}")`);
});
exports.insertPost = insertPost;
const selectPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryResult = yield connection_1.connection.raw(`select * from Lamu_images join Lamu_users where Lamu_images.author = Lamu_users.user_id`);
    return queryResult;
});
exports.selectPost = selectPost;
const selectPostById = (id, tokenData) => __awaiter(void 0, void 0, void 0, function* () {
    const queryResult = yield connection_1.connection.raw(`select * from Lamu_images join Lamu_users where image_id = "${id}" and Lamu_images.author = Lamu_users.user_id`);
    return queryResult;
});
exports.selectPostById = selectPostById;
const deletePost = (tokenData, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.connection.raw(`delete from Lamu_images where image_id = "${id}" and author = "${tokenData.id}"`);
});
exports.deletePost = deletePost;
//# sourceMappingURL=postDatabase.js.map