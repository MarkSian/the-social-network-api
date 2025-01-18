import express from 'express';
import userRoutes from './routes/userRoutes';
import thoughtRoutes from './routes/thoughtRoutes';
import connectDB from './config/connection';

const app = express();
const PORT = 3001; // Port number

//Middleware
app.use(express.json());

// Routes *uncomment when routes are created
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// MongoDB connection
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err);
});