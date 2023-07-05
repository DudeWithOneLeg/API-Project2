import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { useModal } from "../../context/Modal";

export default function LoginFormModal() {

    const dispatch = useDispatch();
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [validations, setValidations] = useState({errors: []})
    const { closeModal } = useModal();


//  useEffect(() => {
//     if ()
//  }[credential, password])

    const handleSubmit = (e) => {

        e.preventDefault();
     dispatch(sessionActions.login({ credential, password })).then(closeModal).catch(
      async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.message) {
            const errors = []
            for (let error of Object.values(data)) {
                errors.push(error)
            }
            setValidations({errors: [...errors]})
        };
      }
    );
    }

    

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>Username or E-mail:
                  <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                ></input>
                </label>

                <label>Password:
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>
                </label>
                {validations.errors && validations.errors.map((error) => {
                    console.log(validations)
                return <p>{error}</p>
                })}
                <button type="submit">Log In</button>
            </form>

        </div>
    )
}
