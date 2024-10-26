const ConnectDB = require('./blogDB');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { home, register, blog_db, login, user, addBlog, editBlog, deleteBlog, user_blog } = require('./Controllers/routesController');
const authMiddleware = require('./Middlewears/Auth-Middlewear');
const app = express();

app.use(bodyParser.json());

var corsOptions = {
    origin: process.env.FRONTEND_ORIGIN,
    methods: "GET, PUT, PATCH, DELETE, POST, HEAD",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, 'Client/dist')));



app.route("/").get(home);
app.route("/blogdata").get(blog_db);
app.route("/userblog/:user").get(user_blog);
app.route("/user").get(authMiddleware,user);
app.route("/addblog").post(addBlog);
app.route("/register").post(register);
app.route("/login").post(login);
app.route("/editblog/:id").put(editBlog);
app.route("/delete/:id").delete(deleteBlog)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client/dist/index.html'));
  });

const PORT = process.env.SERVER_PORT;
ConnectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is live at PORT: ${PORT}`)
    })
});

