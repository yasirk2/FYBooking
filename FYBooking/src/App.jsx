import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainProvider from "./providers/MainProvider";
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <MainProvider>
      <BrowserRouter>
        <Routes>
          <Route
          path="/"
          element={<StartPage/>}
          />
          <Route
          path="/main"
          element={<MainPage/>}
          />
          <Route
          path="/user"
          element={<UserPage/>}
          />
          <Route
          path="/admin"
          element={<AdminPage/>}
          />
        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
}

export default App;
