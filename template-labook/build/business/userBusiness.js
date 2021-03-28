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
exports.loginBusiness = exports.signupBusiness = void 0;
const idGenerator_1 = require("./services/idGenerator");
const hashManager_1 = require("./services/hashManager");
const authenticator_1 = require("./services/authenticator");
const userDatabase_1 = require("../data/userDatabase");
const signupBusiness = (name, email, nickname, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name || !email || !nickname || !password) {
        throw new Error('"name", "email", "nickname" and "password" must be provided');
    }
    const id = idGenerator_1.generateId();
    const cypherPassword = yield hashManager_1.hash(password);
    yield userDatabase_1.insertUser({
        id,
        name,
        email,
        nickname,
        password: cypherPassword
    });
    const token = authenticator_1.generateToken({ id });
    return token;
});
exports.signupBusiness = signupBusiness;
const loginBusiness = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password) {
        throw new Error('"email" and "password" must be provided');
    }
    const queryResult = yield userDatabase_1.findUser(email);
    if (!queryResult[0]) {
        throw new Error("Invalid credentials");
    }
    const user = {
        id: queryResult[0][0].user_id,
        name: queryResult[0][0].name,
        email: queryResult[0][0].email,
        nickname: queryResult[0][0].nickname,
        password: queryResult[0][0].password
    };
    const passwordIsCorrect = yield hashManager_1.compare(password, user.password);
    if (!passwordIsCorrect) {
        throw new Error("Invalid credentials");
    }
    const token = authenticator_1.generateToken({
        id: user.id
    });
    return token;
});
exports.loginBusiness = loginBusiness;
//# sourceMappingURL=userBusiness.js.map