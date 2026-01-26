import { BrowserRouter, Routes, Route } from "react-router"
import { Layout, Home, Roles, Fallback, Results } from "./pages"
import type { JSX } from "react"

export default function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* all pages will be rendered within <Page/> to ensure header/footer consistency */}
          <Route index element={<Home />} /> {/* home page is the index page */}
          <Route path='home' element={<Home />} />
          <Route path='roles' element={<Roles />} />
          <Route path='results' element={<Results />} />{/* temporary for testing only */}
          <Route path='*' element={<Fallback />} />
          {/*  when the requested url doesn"t exist, '*' acts as a fallback  */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
