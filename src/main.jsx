import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Landing from './pages/Landing.jsx'
import Team from './pages/Team.jsx'
import Tournaments from './pages/Tournaments.jsx'
import Scores from './pages/Scores.jsx'
import Exit from './pages/Exit.jsx'
import Login from './pages/admin/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import EditTeam from './pages/admin/EditTeam.jsx'
import EditTournaments from './pages/admin/EditTournaments.jsx'
import Navbar from './layouts/Navbar.jsx'
import StadiumBack from './pages/StadiumBack.jsx'
import ModalProvider from './context/ModalProvider.jsx'
import Temp from './pages/Temp.jsx'
import CoachProvider from './context/CoachProvider.jsx'
import ChatBot from './layouts/ChatBot/ChatBot.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <CoachProvider>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/background' element={<StadiumBack />} />
            <Route path='/landing' element={<Landing />} />
            <Route path='/team' element={<Team />} />
            <Route path='/tournaments' element={<Tournaments />} />
            <Route
              path='/scores'
              element={
                <Suspense fallback={null}>
                  <Scores />
                </Suspense>
              }
            />
            <Route path='/login' element={<Login />} />

            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route
              path='/admin/dashboard/editTournaments'
              element={<EditTournaments />}
            />
            <Route path='/admin/dashboard/editTeam' element={<EditTeam />} />

            <Route path='/exit' element={<Exit />} />
            <Route path='/temp' element={<Temp />} />
          </Routes>
        </CoachProvider>
      </ModalProvider>

      <ChatBot />
      <Navbar />
    </BrowserRouter>
  </StrictMode>
)
