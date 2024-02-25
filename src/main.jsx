import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

// CONTEXT
import { SearchNewsProvider } from "./context/SearchNewsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <SearchNewsProvider>
      <App />
    </SearchNewsProvider>
  </Router>
);
