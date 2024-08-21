import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState("10");
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false); // New state for showing the copied message

  const passwordRef = useRef(null);

  let passwordGenerator = useCallback(() => {
    let pass = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) chars += "0123456789";
    if (charAllowed) chars += "!@#$%^&*()_+<>?/";

    for (let i = 1; i <= length; i++) {
      let adds = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(adds);
    }

    setPassword(pass);
  }, [length, charAllowed, numberAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    setCopied(true); // Show the copied message
    setTimeout(() => {
      setCopied(false); // Hide the message after 2 seconds
    }, 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-white">
      <h1 className="text-white text-center my-3 text-2xl">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 text-black"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 hover:bg-blue-500 text-white px-3 py-0.5 shrink-0"
          id="btn"
        >
          Copy
        </button>
      </div>
      {copied && <p className="text-green-400 text-center">Password Copied!</p>} {/* Display the copied message */}
      <div className="m-2">
        <div className="flex justify-between">
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="numberInput">Numbers</label>
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="characterInput">Characters</label>
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
