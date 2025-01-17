import express from 'express';
import userRoutes from './routes/userRoutes';
import thoughtRoutes from './routes/thoughtRoutes';
import connectDB from './config/connection';

const app = express();
const PORT = 3001; // Port number

//Middleware
app.use(express.json());

// MongoDB connection
connectDB();

// Routes *uncomment when routes are created
app.use('/api/users', userRoutes);
app.use('/api/routes', thoughtRoutes); 

// Server listening
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});