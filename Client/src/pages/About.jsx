function About() {
  return (
<div className="flex flex-col md:flex-row items-center p-6 md:p-8">
      <div className="flex-1 mb-6 md:mb-0 md:mr-8 flex justify-center">
        <img 
          src="https://res.cloudinary.com/dhi6ul49y/image/upload/v1729880938/i48w1kumeiaqxve5pxbk.png" 
          alt="Abusha Ansari" 
          className="w-full max-w-[25rem] rounded-full" 
        />
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800">About Me</h1>
        <p>
        I am Abusha Ansari, a passionate MERN Stack Developer and Full Stack Developer. Currently studying at Pillai College of Engineering in the ECS department, I am focused on honing my skills in web development and software engineering. I love creating interactive and dynamic web applications that provide a seamless user experience, and I enjoy tackling complex problems with innovative solutions.
        </p>
        <br/>
        <p>
        In addition to my coursework, I am actively involved in personal projects and collaborations that allow me to explore new technologies and frameworks. I am particularly interested in user interface design and backend optimization, striving to create applications that are not only functional but also aesthetically pleasing.
        </p>
        <br/>
        <p>
        My goal is to continue growing as a developer and to contribute to meaningful projects that have a positive impact on users' lives. I believe in the power of technology to bring people together and solve real-world challenges.
        </p>
        <h2 className="text-xl text-gray-800 mt-6 font-bold">About the Project</h2>
        <p className="mt-2 text-gray-700">
          This is an online blog app developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). 
          The application allows users to create, read, update, and delete blog posts, providing a platform for sharing thoughts and ideas. 
          I aimed to incorporate user authentication, enabling personalized experiences for each user, while ensuring data security and integrity.
        </p>
      </div>
    </div>
  )
}

export default About