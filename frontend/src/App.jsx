import { useState } from 'react'
import Home from './pages/Home.jsx'
import { createTheme , ThemeProvider } from '@mui/material/styles';
import NavBar from './components/NavBar.jsx';
import './style.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import Properties from './pages/Properties.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import Profile from './pages/Profile.jsx';
import Auth from './pages/Auth.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import {Toaster} from 'react-hot-toast';
import { useAuthStore } from './store/authStore.js';
import { useEffect } from 'react';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Loading from './components/Loading.jsx';
import Update from './pages/Update.jsx';
import VerifyMsg from './components/VerifyMsg.jsx';
import EditUser from './pages/EditUser.jsx';
import Accounts from './pages/Accounts.jsx';
const theme = createTheme({
  typography:{
    fontFamily:['Rubik']
  }
})
// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user.isVerified) {
      const timer = setTimeout(() => {

        setLoading(false);

      }, 1000); // الانتظار لمدة ثانيتين

      return () => clearTimeout(timer); // تنظيف المؤقت عند إلغاء التركيب
    } else {
      setLoading(false); // إذا كان المستخدم مصدقًا وموثقًا، لا تحتاج إلى الانتظار
    }
  }, [isAuthenticated, user]);

  if (loading) {
    return <Loading/>
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!user.isVerified) {
    return <Navigate to="/verifyEmail" replace />;
  }

  return children;
};
     

// Redirect authenticated users to home page
const RedirectAuth = ({children})=>{
  const {isAuthenticated} = useAuthStore();
  if(isAuthenticated ){
    return <Navigate to="/" replace />
  }
  return children
}
function App() {
  const {checkAuth  , isCheckingAuth , user , isAuthenticated} = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log("user",user)
   console.log("is?",isAuthenticated)
  return (
    <div>
      <ThemeProvider theme={theme}>

        {
         isAuthenticated == true && !user.isVerified ? <VerifyMsg/> :''
        }
      <NavBar/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/edituser/:id" element={<EditUser />} />
      <Route path="/propertyDetails/:id" element={<PropertyDetails />} />
      <Route path="/updateProperty/:propertyId" element={<Update/>} />
      <Route path="/account/:name" element={<Accounts/>} />

      <Route path="/profile/:name" element={
      <ProtectedRoute>
      <Profile/>
        </ProtectedRoute>} />

      <Route path="/auth" element={
        <RedirectAuth>
          <Auth />
        </RedirectAuth>
      } />
      <Route path="/verifyEmail" element={<VerifyEmail />} />
      <Route path="/forgotPassword" element={<RedirectAuth>
        <ForgotPassword />
      </RedirectAuth>} />
      <Route path="/resetPassword/:token" element={<RedirectAuth>
        <ResetPassword />
      </RedirectAuth>} />
      {/* Add more routes as needed */}
    </Routes>
    <Toaster />
      </ThemeProvider>

    </div>

  )
}

export default App
