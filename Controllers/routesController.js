const dbSchema = require("../Schema/registerSchema");
const blogData = require("../Schema/blogSchema")
const bcrypt = require("bcrypt");

const home = (req, res) => {
  return res.status(200).send("hello welcome bro");
};


// Display All Blogs From Backend
const blog_db = async (req, res) => {
  try {
    const data = await blogData.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch blogs" });
  }
};


// Display  Blogs From Specific User From Backend
const user_blog = async (req, res) => {
  const { user } = req.params;
  const username = user;
  try {
    const data = await blogData.find({ user: username }); 
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch blogs" });
  }
};



// User Registeration
const register = async (req, res) => {
  try {
    const userData = req.body;
    const { email } = req.body;
    const ExistingUser = await dbSchema.findOne({ email });
    if (!ExistingUser) {
      const newUser = new dbSchema(userData);
      await newUser.save();
      return res.status(200).send({ message: "User registered successfully" });
    }
    res.status(400).send({ message: "Email aready existes" });
  } catch (error) {
    return res.status(400).send({ message: "Registeration failed" });
  }
};


// User Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ExistingUser = await dbSchema.findOne({ email });
    if (ExistingUser) {
      const decryptedPass = await bcrypt.compare(
        password,
        ExistingUser.password
      );
      if (decryptedPass && email == ExistingUser.email) {
        res.status(200).send({
          message: "Login Succesfull",
          token: await ExistingUser.genJWTtoken(),
          user_id: ExistingUser._id.toString(),
        });
      } else {
        res.status(401).send({ message: "invalid Username or Password" });
      }
    } else {
      res.status(401).send({ message: "user not found" });
    }
  } catch (error) {
    window.alert("error");
    res.status(400).send({ message: "Login failed" });
  }
};



// Verify JWT and json its data
const user = async (req, res) => {
  try {
    const data = req.user;
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};



// Add blogs to Database
const addBlog = async (req,res) => {
  try {
    const blog = req.body;
    const newBlog = new blogData(blog);
    await newBlog.save();
    res.status(200).send("Blog added to the database");
  } catch (error) {
    res.status(400).send({message: error.message})
  }
}


// Edit blog 
const editBlog = async (req, res) => {

  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const updatedBlog = await blogData.findByIdAndUpdate(
      id,
      { title, body },
      { new: true, runValidators: true } 
    );
    
    if (!updatedBlog) {
      return res.status(404).send({ message: "Blog post not found" });
    }

    res.status(200).send(updatedBlog); 
  } catch (error) {
    res.status(500).send({ message: "Failed to update blog", error: error.message });
  }
}


// Delete blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogData.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }


    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {

    res.status(500).send({ message: "Failed to delete blog", error: error.message });
  }
};



module.exports = { home, register, login, blog_db, user , addBlog , editBlog , deleteBlog , user_blog };
