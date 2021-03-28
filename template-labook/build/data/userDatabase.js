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
exports.findUser = exports.insertUser = void 0;
const connection_1 = require("./connection");
const insertUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.connection.raw(`
    insert into Lamu_users values ("${user.id}","${user.name}","${user.email}","${user.nickname}","${user.password}")
    `);
});
exports.insertUser = insertUser;
const findUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const queryResult = yield connection_1.connection.raw(`select * from Lamu_users where email = "${email}" `);
    return queryResult;
});
exports.findUser = findUser;
//# sourceMappingURL=userDatabase.js.map