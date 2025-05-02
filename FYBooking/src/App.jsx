import "./App.css";
import MainProvider from "./providers/MainProvider";
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <MainProvider>
      <StartPage />
      <MainPage />
      <UserPage />
      <AdminPage />
    </MainProvider>
  );
}

export default App;
