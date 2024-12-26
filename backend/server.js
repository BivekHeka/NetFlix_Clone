import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import searchRoutes from "./routes/search.route.js";  // Import the search routes
import tvRoutes from "./routes/tv.route.js";
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js';

const app = express();
const PORT = ENV_VARS.PORT;


// Middleware to parse incoming JSON requests and cookies
app.use(express.json());
app.use(cookieParser());

// Define routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);  // Movie routes protected by JWT
app.use("/api/v1/search", protectRoute, searchRoutes);  // Search routes protected by JWT
app.use("/api/v1/tv", protectRoute, tvRoutes);

// Start the server and connect to the database
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    connectDB();
});
