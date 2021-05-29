const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// body parser middleware

// app.use(bodyParser,urlencoded({extended:false}));
// app.use(bodyParser.json());

// Db config
const db = require("./keys").mongoURI;
const { urlencoded } = require("body-parser");
const { initialize } = require("passport");

//  connect to mongoose

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected "))
  .catch((err) => console.log(err));

// app.get('/',(req,res) => res.send('<h1>hello world!</h1>') );

// passport middleware initialize
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running  on ${port}`));
