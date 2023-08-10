import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";


// common component for login and singup
const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    if(username.trim() === "" || password.trim() === ""){
      alert("please enter correct details");
      return;
    }
    triggerLogin({ username, password });
    
  };

  const handleRegister = () => {
    if(username.trim() === "" || password.trim() === ""){
      alert("please enter correct details");
      return;
    }
    triggerSignUp({ username, password }); //sending credentials to backend to chat engine
    alert("Success! please sign in.");
    setUsername("");
    setPassword("");
    setIsRegister(false);
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
  }, [resultLogin.data]); // eslint-disable-line

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">Connect with the world.</h2>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>

        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-actions">
          {isRegister ? (
            <button className="auth-btn" type="button" onClick={handleRegister}>
              Register
            </button>
          ) : (
            <button className="auth-btn" type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

