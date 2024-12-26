import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        // Validate the presence of the connection string
        if (!ENV_VARS.MONGO_URI) {
            console.error("MONGO_URI is not defined in environment variables.");
            process.exit(1);
        }

        // Connect to the database
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
;

        console.log(`MONGODB connected: ${conn.connection.host}/${conn.connection.name}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}. Check your connection string and database server.`);
        process.exit(1); // Exit the process with failure
    }
};
