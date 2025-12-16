import { Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
import SuspenseLoader from "./components/loaders/SuspenseLoader"
import { ProtectedAuthRoute } from "./routes/ProtectedAuth"
import { Toaster } from "sonner"




// Lazy loading pages
const Feed = lazy(() => import("./pages/Feed"))
const Auth = lazy(() => import("./pages/Auth"))
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"))
const Profile = lazy(() => import("./pages/Profile"))
const UsersProfile = lazy(() => import("./pages/UsersProfile"))
const EditProfile = lazy(() => import("./pages/EditProfile"))
const Notifcation = lazy(() => import("./pages/Notification"))
const CreatePost = lazy(() => import("./pages/CreatePost"))
const Settings = lazy(() => import("./pages/Settings"))
const Explore = lazy(() => import("./pages/Explore"))
const NotFound = lazy(() => import("./pages/NotFound"))




// lazy loading layout
const MainLayout = lazy(() => import("./components/layout/MainLayout"))
const AuthLayout = lazy(() => import("./components/layout/AuthLayout"))





function App() {


  return (


    <>

      <Suspense fallback={<SuspenseLoader fullScreen text="Loading..." />}>


        <Routes>


          {/* Main Layout */}
          <Route element={<ProtectedAuthRoute><MainLayout /></ProtectedAuthRoute>} >

            <Route index element={<Feed />} />

            <Route path="user-profile" element={<UsersProfile />} />

            <Route path="profile/:username" element={<Profile />} />

            <Route path="edit-profile" element={<EditProfile />} />

            <Route path="create" element={<CreatePost />} />

            <Route path="notifications" element={<Notifcation />} />

            <Route path="settings" element={<Settings />} />

            <Route path="explore" element={<Explore />} />

          </Route>


          {/* Auth Layout */}
          <Route element={<AuthLayout />} >

            <Route path="auth" element={<Auth />} />

            <Route path="forgot-password" element={<ForgotPassword />} />

          </Route>


          {/* 404 */}
          <Route path="*" element={<NotFound />} />


        </Routes>


        <Toaster />


      </Suspense>


    </>

  )
}

export default App
