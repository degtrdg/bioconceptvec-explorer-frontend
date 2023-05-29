import React, { useState, useEffect } from "react";
import "./App.css";
import Autosuggest from "react-autosuggest";
import { StyleSheet, css } from "aphrodite";

// Interface for token objects
interface Token {
  type: "token" | "operator";
  value: string;
}

const autosuggestStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
  suggestionsContainer: {
    position: "absolute",
    zIndex: 1,
    marginTop: "2px",
    backgroundColor: "#fff",
    width: "100%",
    border: "1px solid #d9d9d9",
    borderRadius: "4px",
  },
  suggestion: {
    padding: "10px 20px",
    cursor: "pointer",
  },
  suggestionHighlighted: {
    backgroundColor: "#f0f0f0", // Customize the background color for the highlighted suggestion
  },
  input: {
    width: "100%",
    height: "30px",
    padding: "0.375rem 0.75rem",
    borderWidth: "1px",
    borderRadius: "0.25rem",
  },
});

// Apply the styles using css() from aphrodite
const styledAutosuggestStyles = {
  container: css(autosuggestStyles.container),
  suggestionsContainer: css(autosuggestStyles.suggestionsContainer),
  suggestion: css(autosuggestStyles.suggestion),
  input: css(autosuggestStyles.input),
};

const App: React.FC = () => {
  // State variables
  const [equation, setEquation] = useState<{ left: Token[]; right: Token[] }>({
    left: [],
    right: [],
  });
  const [input, setInput] = useState("");
  const [selectedSide, setSelectedSide] = useState<"left" | "right">("left");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedToken, setSelectedToken] = useState<{
    side: "left" | "right";
    index: number;
  } | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Arrays of valid tokens and operators
  const validTokens = ["apple", "banana", "bananas", "cherry"];
  const validOperators = ["+", "-"];

  // Function to get suggestions
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : validTokens.filter(
          (token) => token.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // Function to get suggestion value
  const getSuggestionValue = (suggestion: string) => suggestion;

  // Function to render suggestion
  const renderSuggestion = (suggestion: string, { isHighlighted }: any) => (
    <div
      className={
        isHighlighted
          ? css(autosuggestStyles.suggestionHighlighted)
          : css(autosuggestStyles.suggestion)
      }
    >
      {suggestion}
    </div>
  );

  // Function to handle input change
  const onChange = (event: any, { newValue }: any) => {
    setInput(newValue);
  };

  // Function to handle suggestions fetch requested
  const onSuggestionsFetchRequested = ({ value }: any) => {
    setSuggestions(getSuggestions(value));
  };

  // Function to handle suggestions clear requested
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Autosuggest input properties
  const inputProps = {
    placeholder: "",
    value: input,
    onChange: onChange,
  };
  // Function to validate and add a token to the equation
  const validateAndAddToken = (token: string) => {
    const pieces = token.split(" ").filter((t) => t !== "");
    pieces.forEach((piece) => {
      if (validTokens.includes(piece)) {
        setEquation((prev) => {
          const updatedTokens = [
            ...prev[selectedSide],
            { type: "token", value: piece },
          ];
          const updatedEquation = { ...prev, [selectedSide]: updatedTokens };
          console.log("Updated Equation:", updatedEquation); // Log the updated equation
          return updatedEquation;
        });
      } else if (
        validOperators.includes(piece) &&
        equation[selectedSide].length
      ) {
        setEquation((prev) => {
          const lastToken = prev[selectedSide][prev[selectedSide].length - 1];
          if (lastToken?.type !== "operator") {
            const updatedTokens = [
              ...prev[selectedSide],
              { type: "operator", value: piece },
            ];
            const updatedEquation = { ...prev, [selectedSide]: updatedTokens };
            console.log("Updated Equation:", updatedEquation); // Log the updated equation
            return updatedEquation;
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
      if (event.key === "Backspace" && input === "" && selectedToken) {
        setEquation((prev) => {
          const updatedTokens = [...prev[selectedToken.side]];
          updatedTokens.splice(selectedToken.index, 1);
          if (updatedTokens[selectedToken.index]?.type === "operator") {
            updatedTokens.splice(selectedToken.index, 1);
          }
          return { ...prev, [selectedToken.side]: updatedTokens };
        });
        setSelectedToken(null);
      }
    };

    window.addEventListener("keydown", handleBackspace);
    return () => window.removeEventListener("keydown", handleBackspace);
  }, [selectedSide, input, selectedToken]);

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
            } ${
              selectedToken?.side === "left" && selectedToken?.index === index
                ? "border-2 border-red-500"
                : ""
            }`}
            onClick={() => setSelectedToken({ side: "left", index })}
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
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              shouldRenderSuggestions={() => true} // This allows empty suggestions to be rendered
              theme={styledAutosuggestStyles} // Use the styledAutosuggestStyles object
            />
          </div>
        )}{" "}
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
            } ${
              selectedToken?.side === "right" && selectedToken?.index === index
                ? "border-2 border-red-500"
                : ""
            }`}
            onClick={() => setSelectedToken({ side: "right", index })}
          >
            {token.value}
          </div>
        ))}{" "}
        {/* Render an input field on the right side if it is selected and focused */}
        {selectedSide === "right" && isFocused && (
          <div
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              shouldRenderSuggestions={() => true} // This allows empty suggestions to be rendered
              theme={styledAutosuggestStyles} // Use the styledAutosuggestStyles object
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
