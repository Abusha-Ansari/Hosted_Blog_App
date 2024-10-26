PACKAGES NEED TO BE INSTALLED:- (Everything needs to be installed inside the Blogging App (cd Blog-Web-APP))
    NODE MODULES (npm i)
    AXIOS (npm i axios)
    REACT ROUTER DOM (npm i react-router-dom)
    UUID (npm i uuid)
    AOS - ANIMATE ON SCROLL (npm i aos)

To run file 
    npm run dev


<!-- STRUCTURE FOR WEB -->
/src
  /components
    - Navbar.js
    
  /pages
    - HomePage.jsx
    - CreateBlog.jsx
    - EditBlog.jsx
    - AllBlogs.jsx
    - About.jsx
    
  /utils
    <!-- - api.js (for handling API calls) -->
  - Layouts.js
  - index.js
  
    /api
    - FetchData.jsx
        -CREATE READ UPDATE DELETE



<!-- Rough Apis to Work On -->
export const fetchBlogs = () => ()
export const createBlog = (newBlog) => ()
export const updateBlog = (id, updatedBlog) => ()
export const deleteBlog = (id) => ()

<!-- Navbar -->
Navbar items:
            Logo
            Home / Create Blog / Edit Blog / About
            [LOGIN / SIGNUP]

