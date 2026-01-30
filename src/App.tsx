import { BrowserRouter, Routes, Route } from "react-router";
import { Layout, Home, Roles, Fallback } from "./pages";
import Questionnaire from "./components/Questionnaire";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="questionnaire" element={<Questionnaire />} />
          <Route path="roles" element={<Roles />} />
          <Route path="*" element={<Fallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
