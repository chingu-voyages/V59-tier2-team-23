import { BrowserRouter, Routes, Route } from "react-router";
import { Layout, Home, Fallback } from "./pages";
import Questionnaire from "./components/Questionnaire";
import Geminitest from "./pages/Geminitest";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* home page is the index page */}
          <Route path="home" element={<Home />} />
          <Route path="geminitest" element={<Geminitest />} />
          <Route path="roles" element={<Questionnaire />} />
          {/* wanted to make the path 'quiz' but we need to set the path in supabase first */}
          <Route path="*" element={<Fallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
