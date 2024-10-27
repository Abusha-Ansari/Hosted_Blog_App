import React, { useContext, useEffect } from 'react';
import { BlogContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

function YourBlogs() {
  const { personalBlogs, setpersonalBlogs, userdata } = useContext(BlogContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonalBlog = async () => {
      try {
        const response = await fetch(
          `https://blogapp-ag2a.onrender.com/userblog/${userdata.username}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        setpersonalBlogs(data);
      } catch (error) {
        console.log('fail');
        window.alert(`Fetching blogs failed: ${error.message}`);
      }
    };

    fetchPersonalBlog();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:1234/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const newBlogs = personalBlogs.filter(
          (currItem) => currItem._id !== id
        );
        setpersonalBlogs(newBlogs);
      } else {
        console.error('Failed to delete blog.');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <>
  {personalBlogs && personalBlogs.length > 0 ? (
    <ul className="flex flex-wrap gap-6 justify-center p-4">
      {personalBlogs.map((currBlog) => {
        const { title, body, _id, user, imageUrl } = currBlog;

        return (
          <li key={_id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <div className="bg-blue-50 border border-blue-300 rounded-lg shadow-md hover:shadow-lg p-4 transition-all">
              <div className="rounded-lg overflow-hidden mb-4 aspect-video">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="flex items-center justify-center h-full text-blue-700">
                    User Image not available
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <h2 className="text-blue-900 font-semibold text-lg">
                  Title: {title}
                </h2>
                <p className="text-blue-700">Writer: {user}</p>
                <p className="text-gray-600">{body}</p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDelete(_id)}
                  className="w-[48%] bg-red-100 hover:bg-red-300 text-red-700 font-medium py-2 rounded-md transition-colors"
                >
                  Delete Blog
                </button>
                <button
                  onClick={() => handleEdit(_id)}
                  className="w-[48%] bg-green-100 hover:bg-green-300 text-green-700 font-medium py-2 rounded-md transition-colors"
                >
                  Edit Blog
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <h1 className="text-center text-2xl font-bold text-blue-900 mt-10">
      WRITE A BLOG
    </h1>
  )}
</>

  );
}

export default YourBlogs;
