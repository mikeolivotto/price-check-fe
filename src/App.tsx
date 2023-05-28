import "./App.css";
import { ResultsGrid } from "./components/ResultsGrid";
import { useGetData } from "./hooks/useGetData";

function App() {

  const [returnedData] = useGetData();

  return (
    <div className="App" style={{ height: "85vh", width: "100%" }}>
      <h1>JB Price checker</h1>
      <ResultsGrid data={returnedData} />
    </div>
  );
}

export default App;
