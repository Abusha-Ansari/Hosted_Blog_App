import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogContext } from '../Context/UserContext.jsx';



function EditBlog() {
  const { Blogs, setBlogs } = useContext(BlogContext);
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [blog, setBlog] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");


  useEffect(() => {
    const currentBlog = Blogs.find(blog => blog._id === id); 
    if (currentBlog) {
      setBlog(currentBlog);
      setLoading(false);
    } else {
      setError("Blog not found");
      setLoading(false);
    }
  }, [id, Blogs]);


  const updateBlog = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:1234/editblog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update blog: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      window.alert("Error updating blog:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedBlog = await updateBlog(id, blog);

    if (updatedBlog) {
      const updatedBlogs = Blogs.map(item =>
        item._id === id ? updatedBlog : item
      );
      setBlogs(updatedBlogs);
      navigate("/all-blog");
    } else {
      window.alert("Error updating blog");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-blue-50 p-4">
      <form
        onSubmit={handleSave}
        className="w-full max-w-lg bg-blue-100 p-8 rounded-lg shadow-lg border border-blue-200"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Edit Blog
        </h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-blue-700 font-semibold">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={blog.title}
            onChange={handleChange}
            placeholder="Write Title"
            className="w-full mt-2 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="body" className="block text-blue-700 font-semibold">
            Blog
          </label>
          <textarea
            id="body"
            name="body"
            value={blog.body}
            onChange={handleChange}
            placeholder="Write your blog"
            className="w-full mt-2 p-3 h-32 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;
