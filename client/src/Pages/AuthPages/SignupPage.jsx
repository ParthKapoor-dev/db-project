import { useRef, useState } from "react";
import { CurrentMode } from "../../../currentMode";
import useUserContext from "../../hooks/useUserContext";
import { Link, useNavigate } from "react-router-dom";

import "./style.css"
import Navbar from "../../Components/Navbar/Navbar";

export default function SignupPage() {

  const { dispatch } = useUserContext();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const Navigate = useNavigate();
  const [error, setError] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    var isStudent;
    if (roleRef.current.value == 'student') isStudent = true;
    else if (roleRef.current.value == 'teacher') isStudent = false;
    else console.error('In Correct value of User Role');

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      isStudent
    };

    const serverUrl = CurrentMode.url + '/auth/signup'
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log(data);

    const json = await response.json();

    if (response.ok) {
      console.log('Successful Registraion , User : ')
      console.log(json);
      dispatch({ type: 'login', payload: json });
      Navigate('/home');

    } else {

      console.error('Unsuccessful Registration');
      console.log(json);
      setError(json.message)
    }

  }

  return (
    <div>
      <Navbar />
      <div className="mx-20 my-4 flex flex-col items-center justify-center gap-4">
        <div className="text-2xl font-bold">
          Signup Page
        </div>

        <form className="input-styles flex flex-col gap-[4px] justify-center text-lg" onSubmit={handleSubmit}>


          <label htmlFor="signupPage-name">Name</label>
          <input type="text" id="signupPage-name" ref={nameRef} required="true" />

          <label htmlFor="signupPage-emial">Email</label>
          <input type="text" id="signupPage-emial" ref={emailRef} required="true" />

          <label htmlFor="signupPage-password">Password</label>
          <input type="password" id="signupPage-password" ref={passwordRef} required="true" />

          <label htmlFor="signupPage-userRole">User Role</label>
          <select id="signupPage-userRole" ref={roleRef}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button type="submit" className="btn">Signup</button>

          <Link to="/user/login" className="flex justify-center items-center mt-2 hover:">
            Already have a account? <span className="text-purple-600">Login</span>
          </Link>


          {error && (
            <div className="error-div">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}