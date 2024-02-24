import { useRef } from "react";
import { CurrentMode } from "../../../currentMode";
import useUserContext from "../../hooks/useUserContext";

export default function SignupPage() {

  const { dispatch } = useUserContext();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();


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
      dispatch({ type: 'login', payload: json })
    } else {

      console.error('Unsuccessful Registration')
      console.log(json);
    }

  }

  return (
    <div className="signupPage-div">
      <div className="signupPage-heading">
        Signup Page
      </div>

      <form className="signupPage-form" onSubmit={handleSubmit}>
        <label htmlFor="signupPage-name">Name</label>
        <input type="text" id="signupPage-name" ref={nameRef} required="true" />

        <label htmlFor="signupPage-emial">Email</label>
        <input type="text" id="signupPage-emial" ref={emailRef} required="true" />

        <label htmlFor="signupPage-password">Password</label>
        <input type="password" id="signupPage-password" ref={passwordRef} required="true" />

        <select id="loginPage-userRole" ref={roleRef} required="true">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button type="submit">Signup</button>
      </form>
    </div>
  )
}