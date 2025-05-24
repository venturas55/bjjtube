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
    'https://localhost:8001',
    'http://localhost:8001',
    'https://bjjtube.guardiandelfaro.es',
    'http://bjjtube.guardiandelfaro.es',
    'https://adriandeharo.es:8001',
    'http://adriandeharo.es:8001'

];
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Create a CORS middleware that will be applied to all routes
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

// Also explicitly set the headers for all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs",
  engine({
    defaultLayout: "main",
    layoutDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: handlebars, 
  }));
app.set("view engine", ".hbs"); //Para utilizar el app.engine

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

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/", webRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({
        success: false,
        message,
        status
    });
});


//Public
// Servir 'public' directamente
app.use(express.static(path.join(__dirname, 'public')));
// Bootstrap CSS en /bootstrap/css
app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
// Bootstrap JS en /bootstrap/js
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
// jQuery en /jquery
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
// Font Awesome CSS en /fontawesome/css
app.use('/fontawesome/css', express.static(path.join(__dirname, 'node_modules/font-awesome/css')));
app.use('/fontawesome/fonts', express.static(path.join(__dirname, 'node_modules/font-awesome/fonts')));


const PORT = config.PORT || 8000;
app.listen(PORT, () => {
    connect()
    console.log(`App is running on port http://localhost:${PORT}`);
});