import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [newPassword, setNewPassword] = useState(false);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let passw = "";
    let passwString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) passwString += "0123456789";
    if (charactersAllowed) passwString += "!@#$%^&*()_";
    for (let i = 0; i < passwordLength; i++) {
      const character = Math.floor(Math.random() * passwString.length + 1);
      passw += passwString.charAt(character);
    }
    setPassword(passw);
  }, [passwordLength, numbersAllowed, charactersAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  useEffect(() => {
    generatePassword();
  }, [newPassword, passwordLength, numbersAllowed, charactersAllowed]);

  return (
    <>
      <div className="password-generator">
        <h1>Password Generator</h1>
        <div className="pass-copy">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard}>Copy</button>
          <button onClick={() => setNewPassword((prevValue) => !prevValue)}>
            Generate new password
          </button>
        </div>
        <div>
          <div className="bottom-row">
            <div>
              <input
                type="range"
                min={7}
                max={18}
                value={passwordLength}
                onChange={(event) => setPasswordLength(event.target.value)}
              />
              <label htmlFor="passwordLength">Length: {passwordLength}</label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={numbersAllowed}
                onChange={() => {
                  setNumbersAllowed((prevValue) => !prevValue);
                }}
              />
              <label htmlFor="numbers">Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={charactersAllowed}
                onChange={() => {
                  setCharactersAllowed((prevValue) => !prevValue);
                }}
              />
              <label htmlFor="characters">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
