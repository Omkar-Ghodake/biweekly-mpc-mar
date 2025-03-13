import { Link } from "react-router";
import "./App.css";

function App() {
  return (
    <Link to={"/landing"} className="overflow-hidden w-[100vh] h-[100vh]">
      <div className="h-screen w-screen bg-black">BLACK PAGE</div>
    </Link>
  );
}

export default App;
