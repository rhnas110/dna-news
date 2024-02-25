import { Routes, Route } from "react-router-dom";

import { About } from "./pages";
import { News } from "./pages/News";

function App() {
  return (
    <Routes>
      <Route path="/" element={"Home"} />
      <Route path="/about" element={<About />} />

      {/* 404 PAGE */}
      <Route path="*" element={"Not Found"} />
    </Routes>
  );
}

export default App;
