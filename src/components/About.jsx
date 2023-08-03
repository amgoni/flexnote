import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h1>Track your tasks!</h1>
      <h2>Your Very Own To-do List</h2>
      <h4>Version 1.0.0</h4>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default About;
