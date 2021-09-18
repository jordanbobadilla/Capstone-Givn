import { UserContext } from "../Providers/UserProvider";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signInWithGoogle } from "../Services/Firebase";
import { useState } from "react";
import { login } from "../util/firebaseFuntion";
import "../Styles/Home.css";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      history.push("/posts");
    }
  }, [user, history]);

  const handleSignIn = () => {
    signInWithGoogle();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //sign in with firebase and then change route
    try {
      await login(email, password);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="Home">
      <section className="left-side">
        <h1>GIVN</h1>
        <h2>
          We educate, encourage, and incentivize users to give away their
          unwanted goods to other users who are seeking them.
        </h2>
        <h3>"Save the planet one item at a time."</h3>
      </section>
      <section className="right-side">
        <div className="login">
          <h1>Enter your account</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="first-btn">Log In</button>
          </form>
          <p>Or</p>
          <div>
            <button>
              <i className="fab fa-facebook-f"></i>
            </button>
            <button onClick={handleSignIn}>
              <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                alt="google"
              />
            </button>
            <button>
              <i className="fab fa-twitter"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
