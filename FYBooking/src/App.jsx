import './App.css'
import MainProvider from './providers/MainProvider'
import StartPage from './pages/StartPage'
import MainPage from './pages/MainPage'
import AdminPage from './pages/AdminPage'

function App() {

  return (
    <MainProvider>
      <StartPage/>
      <MainPage/>
      <AdminPage/>
    </MainProvider>
  )
}

export default App
