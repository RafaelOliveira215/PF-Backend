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
exports.login = exports.signup = void 0;
const userBusiness_1 = require("../business/userBusiness");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, nickname, password } = req.body;
        const token = yield userBusiness_1.signupBusiness(name, email, nickname, password);
        res.status(201).send(`usuario criado com sucesso:${token}`);
    }
    catch (error) {
        res.statusCode = 400;
        let message = error.sqlMessage || error.message;
        res.send({ message });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield userBusiness_1.loginBusiness(email, password);
        res.status(200).send(`${token}`);
    }
    catch (error) {
        let message = error.sqlMessage || error.message;
        res.statusCode = 400;
        res.send({ message });
    }
});
exports.login = login;
//# sourceMappingURL=userController.js.map