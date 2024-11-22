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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.login = exports.signup = void 0;
exports.updateSocketIdDb = updateSocketIdDb;
exports.findSocketIdByUsername = findSocketIdByUsername;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const database_1 = require("../config/database");
const JWT_Token = process.env.JWT_SECRET || '';
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/signup");
    try {
        const { username, email, password } = req.body;
        const db = (0, database_1.getDb)();
        const usersCollection = db.collection('users');
        // Check if user already exists
        const existingUser = yield usersCollection.findOne({ email });
        if (existingUser)
            return res.send('email_exists');
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Insert new user
        yield usersCollection.insertOne({ username, email, password: hashedPassword });
        res.status(201).send('success_signup');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('server_error');
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('/login');
    try {
        const { email, password } = req.body;
        const db = (0, database_1.getDb)();
        const usersCollection = db.collection('users');
        // Find user
        const user = yield usersCollection.findOne({ email });
        if (!user)
            return res.send('incorrect_email');
        // Check password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid)
            return res.send('incorrect_pass');
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_Token, { expiresIn: '30d' });
        res.status(200).json({ message: 'success_login', token, username: user.username });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server_error' });
    }
});
exports.login = login;
const validateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('validate-token');
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ valid: false });
    }
    try {
        const jwtToken = jsonwebtoken_1.default.verify(token, JWT_Token);
        const userId = jwtToken.userId;
        const db = (0, database_1.getDb)();
        const usersCollection = db.collection('users');
        const user = yield usersCollection.findOne({ _id: new mongodb_1.ObjectId(userId) });
        if (user) {
            res.json({ valid: true, username: user.username });
        }
        else {
            res.status(404).json({ valid: false, message: 'User not found' });
        }
    }
    catch (error) {
        res.status(401).json({ valid: false });
    }
});
exports.validateToken = validateToken;
function updateSocketIdDb(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = (0, database_1.getDb)();
        const userSocketIdCollection = db.collection('user_socketId');
        const username = socket.handshake.auth.username;
        const socketId = socket.id;
        try {
            const user = yield userSocketIdCollection.findOne({ username });
            if (user) {
                yield userSocketIdCollection.updateOne({ username }, { $set: { socketId } });
                console.log(`Updated socketId for user: ${username}`);
            }
            else {
                yield userSocketIdCollection.insertOne({
                    username,
                    socketId
                });
                console.log(`Added new user to collection: ${username}`);
            }
        }
        catch (error) {
            console.error('Error updating/inserting user socket ID:', error);
        }
    });
}
function findSocketIdByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = (0, database_1.getDb)();
        const userSocketIdCollection = db.collection('user_socketId');
        try {
            const user = yield userSocketIdCollection.findOne({ username });
            if (user) {
                return user.socketId;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('Error finding user socket ID:', error);
            throw new Error('Could not find user socket ID');
        }
    });
}
