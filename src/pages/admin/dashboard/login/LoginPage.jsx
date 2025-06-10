import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { supabase } from "../../../config/config";
import Header from "../../../../home/Header";
import styles from "./LoginPage.module.css";
import { useEffect, useState } from "react";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://xxsbhmnnstzhatmoivxp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4c2JobW5uc3R6aGF0bW9pdnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzczMDAsImV4cCI6MjA2Mjk1MzMwMH0.p8UVJF_QzsFh0yJFTtHbJ8pdrjR9LSDg0xjIGrZNuK0"
);

export default function LoginPage({ style }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [statusMessage, setStatusMessage] = useState();
  const navigate = useNavigate();
  // {
  // message: "Email is not confirmed",
  // isError: true,
  // }
  // message: ""
  // isError: true/false

  useEffect(() => {
    setStatusMessage(null);
  }, [email, password]);

  function handleShowPassword() {
    setShowPassword((p) => !p);
  }

  const makeInputVisible = (e) => {
      // Scroll so the input is visible
      setTimeout(() => {
        e.target.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300); // Slight delay to wait for the keyboard to appear (especially on mobile);
  }

  async function signUp() {
    const isValid = await verifyCredentials();
    if (!isValid) {
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "http://localhost:5173/admin/login",
        data: {
          name: name,
        },
      },
    });

    if (error) {
      setStatusMessage({ message: error.message, isError: true });
      return;
    }

    setStatusMessage({
      message:
        "Sign up successful. Check your EMAIL for the confirmation link.",
      isError: false,
    });

    console.log(`user is ${data.toString()}`);
  }

  async function login() {
    const isValid = await verifyCredentials();
    console.log(`isValid is ${isValid}`);
    if (!isValid) {
      return;
    }

    const { data: loginData, error: logInError } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

    if (logInError) {
      setStatusMessage({ message: logInError.message, isError: true });
      console.error("logInError is", logInError);
      return;
    }

    setStatusMessage({
      message: "Login successful",
      isError: false,
    });

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    console.log(`sessionData is`, sessionData);

    if (sessionError) {
      console.error("Session fetch error:", sessionError);
    }

    const user = sessionData?.session?.user;
    // console.log(`user is ${session.data.toString()}`);
    const { data: employeeList, error: employeeListError } = await supabase
      .from("employees")
      .select("name");

    if (employeeListError) {
      console.error("Error fetching employee list:", employeeListError);
      return;
    }

    const isUserInDB = employeeList?.some(
      (emp) => emp.name === user?.user_metadata?.name
    );
    if (!isUserInDB) {
      const { data: employeeData, error: employeeError } = await supabase
        .from("employees")
        .insert({
          name: user.user_metadata.name,
          email: user.email,
          uuid: user.id,
        })
        .select();

      if (employeeError) {
        console.error(`Employee upload error:`, employeeError);
        return;
      }

      console.log(`employeeData is ${employeeData}`);
    }

    window.location.href = "/admin"; // Do a forced page restart
  }

  async function verifyCredentials() {
    const { data, error } = await supabase.from("auth").select("email");

    console.log("Raw data from Supabase:", data);

    if (error) {
      setStatusMessage({ message: error.message, isError: true });
      console.error("Error fetching data from Supabase:", error);
      return false;
    }

    let allowedEmails = data.map((entry) => entry.email);
    console.log("Allowed emails:", allowedEmails);

    if (!email.endsWith("@gmail.com")) {
      setStatusMessage({
        message: "Wrong email format. Enter a valid email.",
        isError: true,
      });
      return false;
    } else if (
      password.length === 0 ||
      !/[a-zA-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setStatusMessage({
        message: "Password must contain at least one letter and one number.",
        isError: true,
      });
      return false;
    } else if (!allowedEmails.includes(email)) {
      console.log(`Email is ${email}`);
      console.log(`allowedEmails is ${allowedEmails.toString()}`);
      setStatusMessage({
        message: "You are not authorized for admin access",
        isError: true,
      });
      return false;
    }

    console.log("Verification successful");
    // setStatusMessage({
    //   message: "Verification successful",
    //   isError: false,
    // });
    return true;
  }

  return (
    <>
      {/* <Header /> */}
      <div className={styles.body} style={style}>
        <div
          className={`${styles.authCard} ${
            !isLoginActive ? styles.active : ""
          }`}
          onClick={() => setIsLoginActive(false)}
        >
          <div className={styles.title}>
            <h2>Sign Up</h2>
            <FontAwesomeIcon
              icon={isLoginActive ? faChevronDown : faChevronUp}
            />
          </div>

          <div className={styles.cardBody}>
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                value={name}
                type="text"
                onFocus={makeInputVisible}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className={styles.field}>
              <div className={styles.label}>
                <label htmlFor="username">Email</label>
                <p>{"(must be your organization email)"}</p>
              </div>
              <input
                value={email}
                type="text"
                onFocus={makeInputVisible}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <label htmlFor="username">Password</label>
                <p>{"(must conatin a letter and a number)"}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onFocus={makeInputVisible}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p
                  className={`${styles.toggleShow} ${
                    showPassword ? styles.active : ""
                  }`}
                  onClick={handleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </p>
              </div>
            </div>
            <p className={styles.authenticate} onClick={signUp}>
              Sign Up
            </p>
          </div>
        </div>

        <div
          className={`${styles.authCard} ${isLoginActive ? styles.active : ""}`}
          onClick={() => setIsLoginActive(true)}
        >
          <div className={styles.title}>
            <h2>Log In</h2>
            <FontAwesomeIcon
              icon={!isLoginActive ? faChevronDown : faChevronUp}
            />
          </div>

          <div className={styles.cardBody}>
            <div className={styles.field}>
              <label htmlFor="username">Email</label>
              <input
                value={email}
                type="text"
                onFocus={makeInputVisible}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  value={password}
                  onFocus={makeInputVisible}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p
                  className={`${styles.toggleShow} ${
                    showPassword ? styles.active : ""
                  }`}
                  onClick={handleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </p>
              </div>
            </div>
            <p className={styles.authenticate} onClick={login}>
              Log In
            </p>
          </div>
        </div>

        <div
          className={`
            ${styles.statusMessage} 
            ${
              statusMessage
                ? statusMessage.isError
                  ? styles.red
                  : styles.green
                : ""
            }
          `}
        >
          <p>{statusMessage?.message}</p>
        </div>
      </div>
    </>
  );
}
