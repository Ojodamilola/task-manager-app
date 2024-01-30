import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { Button } from "react-bootstrap";

const Header = () => {
  return (
    <div className="container-fluid header">
      <div className="container">
        <div class=" d-flex row justify-content-center align-items-center g-2">
          <div class="col-8">
            <Link to="/" className="link">
              {" "}
              <h3> Task Manager</h3>
            </Link>
          </div>
          <div class="col-4 d-flex">
            <Button className="signUp me-3">
              <Link to="/Signup" className="link">
                Signup
              </Link>
            </Button>
            <Button className="login">
              <Link to="/Login" className="link">
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
