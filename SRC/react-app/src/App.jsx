import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/HomePage/HomePage';
import StudentLoginPage from './pages/StudentLoginPage/StudentLoginPage';
import ViewCalendarPage from './pages/Calendar/ViewCalendarPage/ViewCalendarPage';
import AddCalendarPage from './pages/Calendar/AddCalendarPage/AddCalendarPage';
import LaunchPage from './pages/LaunchPage/LaunchPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header/Header';
import FacultyLoginPage from './pages/FacultyLoginPage.jsx/FacultyLoginPage';
import SearchCourse from './pages/SearchCourse/SearchCourse';
import TranscriptPage from './pages/Transcript/TranscriptPage';
import CourseView from './pages/CourseView/CourseView';
import ManageStudentsPage from "./pages/ManageStudents/ManageStudentsPage";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LaunchPage />} />
          <Route path="/student-login" element={<StudentLoginPage />} />
          <Route path="/faculty-login" element={<FacultyLoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <HomePage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-calendar"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <ViewCalendarPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
                path="/course-search"
                element={
                    <ProtectedRoute>
                        <>
                            <Header />
                                <SearchCourse />
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/course-view"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Header />
                                    <CourseView />
                                </>
                            </ProtectedRoute>
                        }
                    />
          <Route
            path="/add-event"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <AddCalendarPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-students"
            element={
              <ProtectedRoute>
                <>
                  <ManageStudentsPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/transcript"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <TranscriptPage />
                </>
              </ProtectedRoute>
            }
          />

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
