import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosHandler, errorHandler } from "../helper";
import { AuthForm, loginRequest } from "./login";
import { REGISTER_URL } from "../urls";

const Register = (props) => {
  const [registerData, setRegisterData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await axiosHandler({
      method: "post",
      url: REGISTER_URL,
      data: registerData,
    }).catch((e) => setError(errorHandler(e)));

    if (result) {
      await loginRequest(registerData, setError, props);
    }
    setLoading(false);
  };

  const onChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="loginContainer">
      <div className="inner">
        <div className="logo">DEVTOT</div>
        <div className="title">Sign up</div>
        <AuthForm
          data={registerData}
          onSubmit={submit}
          onChange={onChange}
          showPassword={showPassword}
          error={error}
          loading={loading}
          setError={setError}
          setShowPassword={setShowPassword}
        />
        <div className="switchOption">
          Already got an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
