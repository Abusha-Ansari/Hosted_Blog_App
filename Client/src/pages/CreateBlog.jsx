import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Navigate} from "react-router-dom"
import { BlogContext } from "../Context/UserContext";
import axios from "axios"; 

function CreateBlog() {
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [imageFile, setImageFile] = useState(null); 
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { userdata , loggedIn} = useContext(BlogContext);
  const navigate = useNavigate();

 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };


  const uploadImageToCloudinary = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "blog_preset"); 
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); 

    try {
      const response = await axios.post(
        import.meta.env.VITE_IMG_UPLOAD_URL, 
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      window.alert("Failed to upload image.");
      return null;
    }
  };

 
  const handleAddBlog = async (e) => {
    e.preventDefault();

    const uploadedImageUrl = await uploadImageToCloudinary();
    if (!uploadedImageUrl) {
      window.alert("Please upload an image before submitting.");
      return;
    }

    const newBlog = {
      time: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
      title: newTitle,
      body: newBody,
      imageUrl: uploadedImageUrl, 
      id: Date.now(),
      user: userdata.username,
    };

    try {
      const response = await fetch(import.meta.env.VITE_ADD_BLOG, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        window.alert("Blog Added Successfully");
        navigate("/create-blog");
      } else {
        const errorData = await response.json();
        window.alert(`Failed to Add Blog: ${errorData.message}`);
      }
    } catch (error) {
      window.alert(`Failed to Add Blog: ${error.message}`);
    }

    setNewTitle("");
    setNewBody("");
    setImagePreview("");
    setImageFile(null);
    setImageUrl("");
  };
  return (
  <div className="w-full flex justify-center items-center min-h-screen bg-blue-50 p-4">
      <form
        onSubmit={handleAddBlog}
        className="w-full max-w-lg bg-blue-100 p-8 rounded-lg shadow-lg border border-blue-200"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Create a New Blog
        </h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-blue-700 font-semibold">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Write Title"
            className="w-full mt-2 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="blog" className="block text-blue-700 font-semibold">
            Blog
          </label>
          <textarea
            id="blog"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            placeholder="Write your blog"
            className="w-full mt-2 p-3 h-32 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="image" className="block text-blue-700 font-semibold">
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full mt-2 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border border-blue-300"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
