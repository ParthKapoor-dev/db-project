import { useRef } from "react";
import { CurrentMode } from "../../../currentMode";

export default function SignupPage() {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      isStudent: true
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
      dispatch({ type : 'login' , payload : json})
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
        <input type="text" id="signupPage-name" ref={nameRef} />

        <label htmlFor="signupPage-emial">Email</label>
        <input type="text" id="signupPage-emial" ref={emailRef} />

        <label htmlFor="signupPage-password">Password</label>
        <input type="password" id="signupPage-password" ref={passwordRef} />

        <button type="submit">Signup</button>
      </form>
    </div>
  )
}