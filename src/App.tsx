import { BrowserRouter, Routes, Route } from "react-router";
import { Layout, Home, Fallback } from "./pages";
import Questionnaire from "./components/Questionnaire";
import Geminitest from "./pages/Geminitest";
import { RedirectGuest } from "./components";
import History from "./pages/History";
import ReviewAttempt from "./pages/ReviewAttempt";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* home page is the index page */}
          <Route path="home" element={<Home />} />
          <Route element={<RedirectGuest />}>
            <Route path="geminitest" element={<Geminitest />} />
            <Route path="roles" element={<Questionnaire />} />
            <Route path="history" element={<History />} />
            <Route path="history/:id" element={<ReviewAttempt />} />
            {/* wanted to make the path 'quiz' but we need to set the path in supabase first */}
            <Route path="*" element={<Fallback />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
