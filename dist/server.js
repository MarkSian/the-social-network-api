"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const thoughtRoutes_1 = __importDefault(require("./routes/thoughtRoutes"));
const connection_1 = __importDefault(require("./config/connection"));
const app = (0, express_1.default)();
const PORT = 3001; // Port number
//Middleware
app.use(express_1.default.json());
// Routes *uncomment when routes are created
app.use('/api/users', userRoutes_1.default);
app.use('/api/thoughts', thoughtRoutes_1.default);
// MongoDB connection
(0, connection_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err);
});
