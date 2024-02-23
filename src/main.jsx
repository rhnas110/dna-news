import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

// CONTEXT
import { SearchNewsProvider } from "./context/SearchNewsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SearchNewsProvider>
    <App />
  </SearchNewsProvider>
);
