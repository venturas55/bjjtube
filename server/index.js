import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import webRoutes from "./routes/web.js";
import cors from "cors";
import { config } from "./utils/config.js";
import * as path from "path";
import * as url from "url";
import handlebars from "./utils/handlebars.js"; //Para usar funciones en las plantillas
import { engine } from "express-handlebars"; //Para usar plantillas
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const app = express();

const allowedOrigins = [
    'http://localhost:8001',
    'https://bjjtube.guardiandelfaro.es',
    'http://bjjtube.guardiandelfaro.es',
    'https://bjjtube.adriandeharo.es',
    'http://bjjtube.adriandeharo.es',
    'https://adriandeharo.es:8001',
    'http://adriandeharo.es:8001',
    'http://localhost:8002',
    'http://adriandeharo.es:8002',
    'http://bjjtube.adriandeharo.es:8001',
    'http://bjjtube.adriandeharo.es:8002',
    'http://bjjtube.guardiandelfaro.es:8001',
    'http://bjjtube.guardiandelfaro.es:8002'
];
// Add CORS middleware to allow all origins
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Length'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Add additional headers for all requests
// Simplified CORS configuration to allow all origins
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Length'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Server configuration
const PORT = config.PORT || 8001;

// Connect to MongoDB
const connect = () => {
    mongoose.connect(config.DB_CONNECTION_STRING, {
        //useUnifiedTopology: true,
        //useNewUrlParser: true,
        //useCreateIndex: true
    }).then(() => {
        console.log("connected to mongo");
    }).catch(err => {
        console.log(err);
    });
}

// Middleware setup
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/", webRoutes);

// Error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({
        success: false,
        message,
        status
    });
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/fontawesome/css', express.static(path.join(__dirname, 'node_modules/font-awesome/css')));
app.use('/fontawesome/fonts', express.static(path.join(__dirname, 'node_modules/font-awesome/fonts')));

// Start server
app.listen(PORT, () => {
    connect();
    console.log(`Server running on port http://localhost:${PORT}`);
});