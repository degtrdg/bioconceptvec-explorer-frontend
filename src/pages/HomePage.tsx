import React from "react";
import EquationCreator from "../components/EquationCreator";
import ResultsBox from "../components/ResultsBox";

{/* START HERE */ }
const top_concepts = {
  concept1: 'Value 1',
  concept2: 'Value 2',
  concept3: 'Value 3',
  concept4: 'Value 4',
  concept5: 'Value 5',
  concept6: 'Value 6',
  concept7: 'Value 7',
  concept8: 'Value 8',
  concept9: 'Value 9',
  concept10: 'Value 10',
};
{/* END HERE */ }


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

      {/* START HERE */}
      <div className="w-1/3 border-l pl-6" style={{ height: '90vh', overflow: 'auto' }}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {Object.keys(top_concepts).map((key, index) => (
            <div key={key}>
              {`${index + 1}. ${key}`}
            </div>
          ))}
        </div>
      </div>
      {/* END HERE */}

    </div>
  );
};

export default HomePage;
