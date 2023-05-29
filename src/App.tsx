import React, { useState, useEffect } from "react";
import "./App.css";

// Interface for token objects
interface Token {
  type: "token" | "operator";
  value: string;
}

const App: React.FC = () => {
  // State variables
  const [equation, setEquation] = useState<{ left: Token[]; right: Token[] }>({
    left: [],
    right: [],
  });
  const [input, setInput] = useState("");
  const [selectedSide, setSelectedSide] = useState<"left" | "right">("left");
  const [isFocused, setIsFocused] = useState(false);

  // Arrays of valid tokens and operators
  const validTokens = ["apple", "banana", "cherry"];
  const validOperators = ["+", "-"];

  // Function to validate and add a token to the equation
  const validateAndAddToken = (token: string) => {
    const pieces = token.split(" ").filter((t) => t !== "");
    pieces.forEach((piece) => {
      if (validTokens.includes(piece)) {
        // Add a valid token to the equation
        setEquation((prev) => {
          const updatedTokens = [
            ...prev[selectedSide],
            { type: "token", value: piece },
          ];
          return { ...prev, [selectedSide]: updatedTokens };
        });
      } else if (validOperators.includes(piece)) {
        // Add a valid operator to the equation
        setEquation((prev) => {
          const lastToken = prev[selectedSide][prev[selectedSide].length - 1];
          if (lastToken?.type !== "operator") {
            const updatedTokens = [
              ...prev[selectedSide],
              { type: "operator", value: piece },
            ];
            return { ...prev, [selectedSide]: updatedTokens };
          }
          return prev;
        });
      }
    });
    setInput("");
  };

  // Event handler for input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
    if (value.endsWith(" ")) {
      // Validate and add token when a space is entered
      validateAndAddToken(value.trim());
    }
  };

  // Event handler for side change
  const handleSideChange = (side: "left" | "right") => {
    // Clear input and set the selected side
    setInput("");
    setSelectedSide(side);
    setIsFocused(true);
  };

  // useEffect to handle input change
  useEffect(() => {
    if (input.endsWith(" ")) {
      const token = input.trim();
      if (validTokens.includes(token)) {
        // Add a valid token to the equation
        setEquation((prev) => {
          const updatedTokens = [
            ...prev[selectedSide],
            { type: "token", value: token },
          ];
          return { ...prev, [selectedSide]: updatedTokens };
        });
      } else if (
        validOperators.includes(token) &&
        equation[selectedSide].length &&
        equation[selectedSide][equation[selectedSide].length - 1]?.type !==
          "operator"
      ) {
        // Add a valid operator to the equation
        setEquation((prev) => {
          const updatedTokens = [
            ...prev[selectedSide],
            { type: "operator", value: token },
          ];
          return { ...prev, [selectedSide]: updatedTokens };
        });
      }
      setInput("");
    }
  }, [input, selectedSide, equation, validTokens, validOperators]);

  // useEffect to handle backspace
  useEffect(() => {
    const handleBackspace = (event: KeyboardEvent) => {
      if (event.key === "Backspace" && input === "") {
        // Remove the last token from the equation when backspace is pressed
        setEquation((prev) => {
          const updatedTokens = [...prev[selectedSide]];
          updatedTokens.pop();
          return { ...prev, [selectedSide]: updatedTokens };
        });
      }
    };

    window.addEventListener("keydown", handleBackspace);
    return () => window.removeEventListener("keydown", handleBackspace);
  }, [selectedSide, input]);

  return (
    <div className="App flex items-center justify-center h-screen">
      <div
        onClick={() => handleSideChange("left")}
        className="border p-4 flex flex-row space-x-4"
      >
        {/* Render tokens on the left side of the equation */}
        {equation.left.map((token, index) => (
          <div
            key={index}
            className={`px-2 py-1 rounded ${
              token.type === "token" ? "bg-green-200" : "bg-blue-200"
            }`}
          >
            {token.value}
          </div>
        ))}
        {/* Render an input field on the left side if it is selected and focused */}
        {selectedSide === "left" && isFocused && (
          <div
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              autoComplete="off"
              className="border px-2 py-1 rounded"
            />
          </div>
        )}
      </div>
      <div className="mx-4 text-2xl">=</div>
      <div
        onClick={() => handleSideChange("right")}
        className="border p-4 flex flex-row space-x-4"
      >
        {/* Render tokens on the right side of the equation */}
        {equation.right.map((token, index) => (
          <div
            key={index}
            className={`px-2 py-1 rounded ${
              token.type === "token" ? "bg-green-200" : "bg-blue-200"
            }`}
          >
            {token.value}
          </div>
        ))}
        {/* Render an input field on the right side if it is selected and focused */}
        {selectedSide === "right" && isFocused && (
          <div
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              autoComplete="off"
              className="border px-2 py-1 rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
