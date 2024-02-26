import { Routes, Route } from "react-router-dom";

import { Home, About, News } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/news" element={<News />} />

      {/* 404 PAGE */}
      <Route path="*" element={"Not Found"} />
    </Routes>
  );
}

export default App;
