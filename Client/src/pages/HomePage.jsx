import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import 'aos/dist/aos.css'; 
import AOS from 'aos';
import {BlogContext} from '../Context/UserContext.jsx'

function HomePage() {
  const {Blogs,setBlogs,loggedIn} = useContext(BlogContext);
  const [recentBlogs,setrecentBlogs] = useState([]);

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
        console.log('fail')
        window.alert(`Fetching blogs failed: ${error.message}`);
      }
    };

    fetchBlogs(); 
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    if (Blogs.length > 0) {
      const recent = Blogs.slice(-3).reverse();
      setrecentBlogs(recent);
    }

  }, [Blogs]);



  
  return (
    <div className="min-h-screen flex flex-col">

      <header id="home" className="h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")' }}
        data-aos="fade-in"
      >
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Welcome to Our Blog</h1>
          <p className="text-xl mb-8">Share your thoughts with the world</p>
          <a href="/create-blog" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100">
            Write a Blog
          </a>
        </div>
      </header>

      <section id="blogs" className="bg-gray-100 py-16" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Recently Added Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentBlogs.map((blog, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold mb-4">{blog.title}</h3>
                <p className="text-gray-600 mb-2">{blog.body}</p>
                <span className="text-gray-500 text-sm">{blog.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Blog Website. All Rights Reserved.</p>
          <p>
            <a href="/About" className="hover:underline">About Us</a> | 
            <a href="https://github.com/Abusha-Ansari" className="hover:underline"> Github</a> |
            <a href="https://www.linkedin.com/in/abusha-ansari-a809b22b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app " className="hover:underline"> LinkedIn</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
