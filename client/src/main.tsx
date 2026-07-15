import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Contributors from "./pages/Contributors.tsx";
import Archive from "./pages/Archive.tsx";
import Volume from "./pages/Volume.tsx";
import MainLayout from "./MainLayout.tsx";
import Issue from "./pages/Issue.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="archive">
          <Route index element={<Archive />} />
          <Route path=":volume" element={<Volume />} />
          <Route path=":volume/:issue" element={<Issue />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);
