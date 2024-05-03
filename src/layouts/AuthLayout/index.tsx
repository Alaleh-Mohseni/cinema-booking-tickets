import { Outlet, Link } from "react-router-dom";
import { AuthProvider } from "../../contexts/authContext";
import { FaAngleLeft } from "react-icons/fa6";
import Logo from "../../assets/images/Logo.png";

function AuthLayout() {
  return (
    <AuthProvider>
      <div className="bg-gray-900">
        <div className="absolute top-7 left-7">
          <Link to="/" className="text-white bg-gray-800 p-4 rounded-lg flex">
            بازگشت به صفحه اصلی
            <FaAngleLeft className="mr-2" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-gray-800 text-white border border-gray-700 rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0 relative">
            <img src={Logo} className="mr-3 h-[70px] absolute -top-11 right-[47%] translate-x-[50%]" alt="Cinema Logo" />
            <div className="py-6 px-12 space-y-4 md:space-y-6 sm:py-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}

export default AuthLayout