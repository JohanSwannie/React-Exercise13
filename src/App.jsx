import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [newPassword, setNewPassword] = useState(false);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [specialCharactersAllowed, setSpecialCharactersAllowed] =
    useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let passw = "";
    let passwString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) passwString += "0123456789";
    if (specialCharactersAllowed) passwString += "!@#$%^&*()_";
    for (let i = 0; i < passwordLength; i++) {
      const character = Math.floor(Math.random() * passwString.length + 1);
      passw += passwString.charAt(character);
    }
    // OR
    // let passwArray = passwString.split("");
    // for (let j = 0; j < passwordLength; j++) {
    //   const char =
    //     passwArray[Math.floor(Math.random() * passwArray.length + 1)];
    //   passw += char;
    // }
    setPassword(passw);
  }, [passwordLength, numbersAllowed, specialCharactersAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  useEffect(() => {
    generatePassword();
  }, [newPassword, passwordLength, numbersAllowed, specialCharactersAllowed]);

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
                min={8}
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
                defaultChecked={specialCharactersAllowed}
                onChange={() => {
                  setSpecialCharactersAllowed((prevValue) => !prevValue);
                }}
              />
              <label htmlFor="characters">Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
