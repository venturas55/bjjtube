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
app.use(cors());
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
//Bootstrap
app.use((express.static(path.join(__dirname,"public"))));
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, '../node_modules/@popperjs/core/dist/umd')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')))
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/fonts", express.static(path.join(__dirname, "../node_modules/font-awesome/fonts")));
app.use("/css", express.static(path.join(__dirname, "../node_modules/font-awesome/css")));


const PORT = config.PORT || 8000;
app.listen(PORT, () => {
    connect()
    console.log(`App is running on port http://localhost:${PORT}`);
});