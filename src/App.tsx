import { BrowserRouter, Routes, Route } from "react-router";
import { Layout, Home, Roles, Fallback } from "./pages";
import type { JSX } from "react";
import { ProtectedRoute } from "./components";
import Questionnaire from "./components/Questionnaire";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* all pages will be rendered within <Page/> to ensure header/footer consistency */}
          <Route index element={<Home />} /> {/* home page is the index page */}
          <Route path="home" element={<Home />} />
          <Route path="questionnaire" element={<Questionnaire />} />
          <Route element={<ProtectedRoute />}>
            <Route path="roles" element={<Roles />} />
            <Route path="*" element={<Fallback />} />
          </Route>
        </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
