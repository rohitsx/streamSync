"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
router.post('/signup', authService_1.signup);
router.post('/login', authService_1.login);
router.post('/validate-token', authService_1.validateToken);
exports.default = router;
