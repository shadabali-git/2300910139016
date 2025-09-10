import { BrowserRouter, Routes, Route } from "react-router-dom";
import URLShortener from "./components/URLShortener";
import Statistics from "./components/Statistics";
import RedirectHandler from "./components/RedirectHandler";

 function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<URLShortener />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/:shortCode" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
