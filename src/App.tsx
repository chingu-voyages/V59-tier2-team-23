import { BrowserRouter, Routes, Route } from "react-router";
import { Layout, Home, Roles, Fallback } from "./pages";
import type { JSX } from "react";
import { ProtectedRoute } from "./components";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* all pages will be rendered within <Page/> to ensure header/footer consistency */}
          <Route index element={<Home />} /> {/* home page is the index page */}
          <Route path="home" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="roles" element={<Roles />} />
            <Route path="*" element={<Fallback />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
