import { createContext, useState, useEffect } from "react";
export const BlogContext = createContext();

export const BlogProvider = ({children}) => {

    const [Blogs, setBlogs] = useState([]);
    const [personalBlogs, setpersonalBlogs] = useState([])
    const [userdata, setuserdata] = useState({})
    const [loggedIn,setloggedIn] = useState(localStorage.getItem('token')? true:false);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("token");
  
          if (!token) {
            throw new Error("No token found. Please log in.");
          }

          const response = await fetch(import.meta.env.VITE_FETCH_USER_TOKEN_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
          }
  
          const data = await response.json();
  
          setuserdata(data);
  
          if (!userdata) {
            setloggedIn(false);
          }
        } catch (error) {}
      };
  
      fetchUserData();
    }, [loggedIn]);
    
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
            window.alert(`Fetching blogs failed: ${error.message}`);
          }
        };
    
        fetchBlogs(); 
      }, []);



    const Logout = () => {
        localStorage.removeItem('token')
        setloggedIn(false)
    }

    return (
        <BlogContext.Provider value={{ Blogs, setBlogs , Logout , loggedIn , setloggedIn , userdata , setuserdata , personalBlogs , setpersonalBlogs}}>
            {children}
        </BlogContext.Provider>
    );
};