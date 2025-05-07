import { Outlet } from "react-router-dom"

const ProfilePage = () => {
  return (
    <div>
        <Outlet />
        <h1>this is a profil page </h1>      
    </div>
  )
}
export default ProfilePage
