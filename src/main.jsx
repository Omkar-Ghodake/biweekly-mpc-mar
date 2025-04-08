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
import Dashboard from './pages/admin/Dashboard.jsx'
import EditTeam from './pages/admin/EditTeam.jsx'
import EditTournaments from './pages/admin/EditTournaments.jsx'
import ModalProvider from './context/ModalProvider.jsx'
import Temp from './pages/Temp.jsx'
import CoachProvider from './context/CoachProvider.jsx'
import ChatBot from './layouts/ChatBot/ChatBot.jsx'
import TournamentsProvider from './context/TournamentsProvider.jsx'
import PlayersProvider from './context/PlayersProvider.jsx'
import ToastNotification from './layouts/ToastNotification.jsx'
import ToastProvider from './context/ToastProvider.jsx'
import EditCommon from './pages/admin/EditCommon.jsx'
import Profile from './pages/admin/Profile.jsx'
import Loader from './layouts/Loader.jsx'
import LoadingProvider from './context/LoadingProvider.jsx'
import EditCoach from './pages/admin/EditCoach.jsx'
import Navbar from './layouts/Navbar/Navbar.jsx'
import TeamProvider from './context/TeamProvider.jsx'
import Credit from './pages/Credit.jsx'
import Login from './pages/admin/Login.jsx'
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard.jsx'
import Documents from './pages/admin/Documents.jsx'
import IndividualContribution from './pages/admin/documents/IndividualContribution.jsx'
import PersonalTask from './pages/admin/documents/PersonalTask.jsx'
import ProductDocs from './pages/admin/documents/ProductDocs.jsx'
import FileExplorerProvider from './context/FileExplorerProvider.jsx'
import DocumentViewer from './components/DocViewer/DocumentViewer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <LoadingProvider>
          <FileExplorerProvider>
            <ModalProvider>
              <PlayersProvider>
                <TournamentsProvider>
                  <CoachProvider>
                    <TeamProvider>
                      <Routes>
                        <Route path='/' element={<App />} />
                        {/* <Route path='/background' element={<StadiumBack />} /> */}
                        <Route path='/landing' element={<Landing />} />
                        <Route path='/team' element={<Team />} />
                        <Route path='/tournaments' element={<Tournaments />} />
                        <Route path='/credits' element={<Credit />} />
                        <Route
                          path='/scores'
                          element={
                            <Suspense fallback={null}>
                              <Scores />
                            </Suspense>
                          }
                        />
                        {/* <Route path="/login" element={<Login />} /> */}
                        <Route path='/admin/login' element={<Login />} />
                        <Route
                          path='/admin/dashboard'
                          element={<Dashboard />}
                        />
                        <Route
                          path='/admin/dashboard/editTournaments'
                          element={<EditTournaments />}
                        />
                        <Route
                          path='/admin/dashboard/editPlayers'
                          element={<EditTeam />}
                        />
                        <Route
                          path='/admin/dashboard/editTeam'
                          element={<EditCommon />}
                        />
                        <Route
                          path='/admin/dashboard/profile'
                          element={<Profile />}
                        />
                        <Route
                          path='/admin/dashboard/editCoach'
                          element={<EditCoach />}
                        />
                        <Route
                          path='/admin/dashboard/analytics-dashboard'
                          element={<AnalyticsDashboard />}
                        />
                        <Route
                          path='/admin/dashboard/documents'
                          element={<Documents />}
                        />
                        <Route
                          path='/admin/dashboard/documents/individual-contribution'
                          element={<IndividualContribution />}
                        />
                        <Route
                          path='/admin/dashboard/documents/personal-task'
                          element={<PersonalTask />}
                        />
                        <Route
                          path='/admin/dashboard/documents/product-docs'
                          element={<ProductDocs />}
                        />

                        <Route path='/exit' element={<Exit />} />
                        <Route path='/temp' element={<Temp />} />
                      </Routes>

                      <Loader />
                      <ChatBot />
                      <Navbar />
                      <ToastNotification />
                      <DocumentViewer />
                    </TeamProvider>
                  </CoachProvider>
                </TournamentsProvider>
              </PlayersProvider>
            </ModalProvider>
          </FileExplorerProvider>
        </LoadingProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
)
