import React from "react";
import EquationCreator from "../components/EquationCreator";
import ResultsBox from "../components/ResultsBox";

const HomePage: React.FC = () => {
  return (
    <div className="flex h-screen p-6 py-0">
      <div className="flex flex-col w-2/3 pr-6">
        {/* <div className="border p-6 mb-6 h-1/2">Results go here</div> */}
        {/* <div className="border p-6 h-1/2"> */}
        {/* </div> */}
        <div className="border p-6 h-1/3">
          <EquationCreator />
        </div>

        <ResultsBox />
      </div>
      <div className="w-1/3 border-l pl-6">Sidebar goes here</div>
    </div>
  );
};

export default HomePage;
