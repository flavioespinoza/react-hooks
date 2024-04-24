import React, { useState, useRef, useEffect } from 'react';

const App: React.FC<{}> = () => {
  const [codes, setCodes] = useState<string[]>(Array(6).fill(''));
  const [authCode, setAuthCode] = useState('');
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    // Focus the first input initially
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Copy the current state array
    const newCodes = [...codes];
    // Update the value at the specified index
    newCodes[index] = value;
    // Update state with the new array
    setCodes(newCodes);

    // Move focus to the next input if not last input
    if (index < codes.length - 1 && value !== '') {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all inputs are filled
    if (!newCodes.includes('')) {
      // Combine all codes into one string and pass it to the parent component
      setAuthCode(newCodes.join(''));
    }
  };

  const handleBackspace = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    // Move focus to the previous input if backspace is pressed on an empty input
    setAuthCode('');
    if (event.keyCode === 8 && index > 0 && codes[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const clearInputs = () => {
    setCodes(Array(6).fill(''));
    setAuthCode('');
    inputRefs.current[0]?.focus();
  };

  return (
    <>
      {codes.map((code, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={code}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleBackspace(index, e)}
          ref={(thisInput) => (inputRefs.current[index] = thisInput)}
          style={{ width: '30px', marginRight: '5px' }}
        />
      ))}
      <div>
        <button onClick={clearInputs}>Clear</button>
      </div>
      <div>
        <p>{authCode}</p>
      </div>
    </>
  );
};

export default App;
