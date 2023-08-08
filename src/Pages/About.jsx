import "./About.scss";

import { FaBackward } from "react-icons/fa6";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about">
      <div className="about-heading">
        <h1 className=" heading">About Flexnote</h1>
        <p>
          <em>Your Ultimate Note-Taking and Organization App!</em>
        </p>
      </div>
      <div className="mission">
        <p>
          At Flexnote, we believe that staying organized and productive should
          be a seamless and enjoyable experience. Our mission is to empower you
          with a powerful yet simple tool that helps you capture your ideas,
          thoughts, and inspirations, so you can focus on what truly matters.
        </p>
      </div>
      <div className="summary">
        <p>
          Flexnote is a simple note-taking app that allows you to create, edit,
          and delete notes. You can also organize your notes into folders.
        </p>
      </div>
      <div>
        <h3 className="heading">Why Choose Flexnote?</h3>
        <p className="points">
          <strong className="heading">Flexibility and Freedom</strong>: Flexnote
          offers a flexible note-taking experience that adapts to your unique
          needs. Whether you prefer to jot down quick notes or organize your
          notes into folders, Flexnote has got you covered.
        </p>
        <p className="points">
          <strong className="heading">Simple and Intuitive</strong>: Flexnote is
          designed to be simple and intuitive. You can start taking notes right
          away without having to learn a new tool. The interface is clean and
          minimalistic, so you can focus on what matters most: your notes.
        </p>
        <p className="points">
          <strong className="heading">Fast and Reliable</strong>: Flexnote is
          built with speed and reliability in mind. You can access your notes
          from anywhere, anytime, on any device.
        </p>
        <p className="points">
          <strong className="heading">Secure and Private</strong>: Flexnote is
          built with security and privacy in mind. Your notes are stored
          securely in the cloud and are only accessible to you.
        </p>
      </div>

      <div className="contact">
        <h2 className="heading ">Contact Us</h2>
        <p>
          We'd love to hear from you! If you have any questions, feedback, or
          suggestions, please don't hesitate to get in touch with us. You can
          reach our support team at{" "}
          <a href="mailto:ameen.m.goney@gmail.com">ameen.m.goney@gmail.com</a>.
        </p>
      </div>

      <div className="farewell">
        <h4 className="heading ">
          Thank you for choosing Flexnote to be your trusted companion in
          staying organized and inspired. Happy note-taking!
        </h4>
      </div>
    </div>
  );
};

export default About;
