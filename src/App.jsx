import { useState } from "react";
import "./App.css";

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
        <h1>Password Generator</h1>
        <div className="pass-copy">
          <input type="text" value={password} readOnly placeholder="Password" />
          <button>Copy</button>
        </div>
        <div>
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
        </div>
      </div>
    </>
  );
}

export default App;
