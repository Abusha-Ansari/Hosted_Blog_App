import { useContext, useEffect } from "react";
import { BlogContext } from "../Context/UserContext.jsx";

function AllBlog() {
  const { Blogs, setBlogs } = useContext(BlogContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_FETCH_BLOG_DATA, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.log("fail");
        window.alert(`Fetching blogs failed: ${error.message}`);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
  {Blogs && Blogs.length > 0 ? (
    <ul className="flex flex-wrap gap-6 justify-center p-4">
      {Blogs.map((currBlog) => {
        const { title, body, _id, user, imageUrl } = currBlog;

        return (
          <li 
            key={_id} 
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
          >
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
                    Image not available
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

export default AllBlog;