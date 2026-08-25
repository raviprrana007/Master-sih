import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/auth/LoginPage';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import SkillAssessment from './pages/student/SkillAssessment';
import SkillProfile from './pages/student/SkillProfile';
import SkillGapAnalysis from './pages/student/SkillGapAnalysis';
import LearningPage from './pages/student/LearningPage';
import CareerIntelligence from './pages/student/CareerIntelligence';
import InternshipsPage from './pages/student/InternshipsPage';
import JobsPage from './pages/student/JobsPage';
import ApplicationsPage from './pages/student/ApplicationsPage';
import SavedPage from './pages/student/SavedPage';
import NetworkDiscover from './pages/student/NetworkDiscover';
import MyNetwork from './pages/student/MyNetwork';
import MentorsPage from './pages/student/MentorsPage';
import MessagesPage from './pages/student/MessagesPage';
import LiveProjects from './pages/student/LiveProjects';
import WorkshopsPage from './pages/student/WorkshopsPage';
import FeedPage from './pages/student/FeedPage';
import DigitalPortfolio from './pages/student/DigitalPortfolio';

// Industry pages
import IndustryDashboard from './pages/industry/IndustryDashboard';
import CandidateDiscovery from './pages/industry/CandidateDiscovery';
import PostOpportunity from './pages/industry/PostOpportunity';
import ManageJobs from './pages/industry/ManageJobs';
import ManageInternships from './pages/industry/ManageInternships';
import IndustryApplications from './pages/industry/IndustryApplications';
import TalentNetwork from './pages/industry/TalentNetwork';
import IndustryMessages from './pages/industry/IndustryMessages';
import CompanyProfile from './pages/industry/CompanyProfile';
import RecruitmentAnalytics from './pages/industry/RecruitmentAnalytics';

// Academician pages
import AcademicianDashboard from './pages/academician/AcademicianDashboard';
import FacultyInternships from './pages/academician/FacultyInternships';
import FDPPage from './pages/academician/FDPPage';
import ConsultancyPage from './pages/academician/ConsultancyPage';
import ResearchPage from './pages/academician/ResearchPage';
import AcademicianMessages from './pages/academician/AcademicianMessages';
import AcademicianMentorship from './pages/academician/AcademicianMentorship';
import FacultyProfile from './pages/academician/FacultyProfile';

// Institution pages
import InstitutionDashboard from './pages/institution/InstitutionDashboard';
import StudentDirectory from './pages/institution/StudentDirectory';
import IndustryPartners from './pages/institution/IndustryPartners';
import PlacementAnalytics from './pages/institution/PlacementAnalytics';
import SkillAnalytics from './pages/institution/SkillAnalytics';
import TrainingPrograms from './pages/institution/TrainingPrograms';

// Shared pages
import NotificationsPage from './pages/shared/NotificationsPage';
import SettingsPage from './pages/shared/SettingsPage';

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#05070D' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 40, border: '3px solid #1e293b', borderTopColor: '#3B82F6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Loading SkillBridge...</span>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

function RoleRoutes() {
  const { currentUser } = useAuth();
  const role = currentUser?.role;

  return (
    <DashboardLayout>
      <Routes>
        {/* Shared routes */}
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Student routes */}
        {role === 'student' && (
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/skills/assessment" element={<SkillAssessment />} />
            <Route path="/skills/profile" element={<SkillProfile />} />
            <Route path="/skills/gap" element={<SkillGapAnalysis />} />
            <Route path="/skills/learning" element={<LearningPage />} />
            <Route path="/career-ai" element={<CareerIntelligence />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/network/discover" element={<NetworkDiscover />} />
            <Route path="/network/connections" element={<MyNetwork />} />
            <Route path="/network/mentors" element={<MentorsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/collaborate/projects" element={<LiveProjects />} />
            <Route path="/collaborate/workshops" element={<WorkshopsPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/portfolio" element={<DigitalPortfolio />} />
          </>
        )}

        {/* Industry routes */}
        {role === 'industry' && (
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<IndustryDashboard />} />
            <Route path="/candidates" element={<CandidateDiscovery />} />
            <Route path="/post" element={<PostOpportunity />} />
            <Route path="/jobs" element={<ManageJobs />} />
            <Route path="/internships" element={<ManageInternships />} />
            <Route path="/applications" element={<IndustryApplications />} />
            <Route path="/talent" element={<TalentNetwork />} />
            <Route path="/messages" element={<IndustryMessages />} />
            <Route path="/profile" element={<CompanyProfile />} />
            <Route path="/analytics" element={<RecruitmentAnalytics />} />
          </>
        )}

        {/* Academician routes */}
        {role === 'academician' && (
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<AcademicianDashboard />} />
            <Route path="/internships" element={<FacultyInternships />} />
            <Route path="/fdp" element={<FDPPage />} />
            <Route path="/consultancy" element={<ConsultancyPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/messages" element={<AcademicianMessages />} />
            <Route path="/mentorship" element={<AcademicianMentorship />} />
            <Route path="/profile" element={<FacultyProfile />} />
          </>
        )}

        {/* Institution routes */}
        {role === 'institution' && (
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<InstitutionDashboard />} />
            <Route path="/students" element={<StudentDirectory />} />
            <Route path="/partners" element={<IndustryPartners />} />
            <Route path="/analytics/placement" element={<PlacementAnalytics />} />
            <Route path="/analytics/skills" element={<SkillAnalytics />} />
            <Route path="/training" element={<TrainingPrograms />} />
          </>
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <RoleRoutes />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
