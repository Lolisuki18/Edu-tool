import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/components/layout'
import { 
  HomePage, 
  NotFoundPage, 
  JiraToSrsPage, 
  GithubReportPage, 
  ProfilePage,
  LoginPage,
  ManageUsersPage
} from '@/pages'
import { ProtectedRoute } from '@/components/common/ProtectedRoute'
import { ROUTES } from '@/constants'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        
        {/* Protected routes with layout */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.JIRA_TO_SRS} element={<JiraToSrsPage />} />
          <Route path={ROUTES.GITHUB_REPORT} element={<GithubReportPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          
          {/* Admin & Teacher only */}
          <Route 
            path={ROUTES.MANAGE_USERS} 
            element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <ManageUsersPage />
              </ProtectedRoute>
            } 
          />
        </Route>
        
        {/* 404 - outside protected routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
