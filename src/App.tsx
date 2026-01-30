import { BrowserRouter, Routes, Route } from "react-router";
import { Layout, Home, Fallback } from "./pages";
import type { JSX } from "react";
import { ProtectedRoute } from "./components";
import Questionnaire from "./components/Questionnaire";
import Geminitest from "./pages/Geminitest";

export default function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* all pages will be rendered within <Page/> to ensure header/footer consistency */}
          <Route index element={<Home />} /> {/* home page is the index page */}
          <Route path="home" element={<Home />} />
          <Route path ="geminitest" element={<Geminitest />} />
          <Route element={<ProtectedRoute />}>
            <Route path="roles" element={<Questionnaire />} />{/* wanted to make the path 'quiz' but we need to set the path in supabase first */}
            <Route path="*" element={<Fallback />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
