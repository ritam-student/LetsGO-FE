import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { lazy, Suspense, useState } from "react"
import 'swiper/swiper-bundle.css';
import '../node_modules/swiper/modules/pagination-element.min.css';
import '../node_modules/swiper/modules/zoom.css';
import '../node_modules/swiper/modules/navigation.css';




import Navbar from "./components/Nav";
import Hero from "./components/Hero";
const Hostel = lazy(() => import("./components/Hostel"));
const Mess = lazy(() => import("./components/Mess"));
const PG = lazy(() => import("./components/Pg"));
const Apartment = lazy(() => import("./components/Apartment"));
const Home = lazy(() => import("./components/Home"));
const Signup = lazy(() => import("./components/Signup"));
const Signin = lazy(() => import("./components/Signin"));
const ForgetPassword = lazy(() => import("./components/ForgetPassword"));
const RoomDetails = lazy(() => import("./components/RoomDetails"));
const HostForm = lazy(() => import("./components/HostForm"));
const CreateNewRoom = lazy(() => import("./components/CreateNewRoom"));
const NewReview = lazy(() => import("./components/NewReview"));
const NotFound = lazy (() => import("./components/NotFound"));


import Loader from "./components/Loader"
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";





interface User{
  _id: string,
  userName: string,
  email: string,
  password: string,
  country: string,
  state: string | undefined,
  area: string | undefined,
  city: string,
  pincode: string | undefined,
  saved: string[] | null ,
  likes: string[] | null ,
  dislikes: string[] | null ,
  bookedRooms: string[] | null,
  imageUrl: string
}



function App() {


  /*
  const [showSignupPage , setShowSignupPage ] = useState(false);
  const [showSigninPage , setShowSigninPage ] = useState(false);
  const [showForgetPasswordPage , setShowForgetPasswordPage ] = useState(false);
  */
  const [isLoggedIn , setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token? true : false;
  });
  const [user , setUser] = useState<User | null>(null);

  return (
    /**
    <div className="">
    <div className='h-[600px] md:h-[570px] lg:h-[730px] relative '>
      <div style={{backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80)', backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'>
        <div className='absolute inset-0 bg-black h-auto'></div>
      </div>
      
      
      <BrowserRouter>
        <div className="absolute z-20  px-4 md:px-6 lg:px-8  w-full pt-6 pb-2 text-2xl font-sans ">
          <Navbar setShowSignupPage={setShowSignupPage} setShowSigninPage={setShowSigninPage}  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>

        <div className=" absolute  w-full ">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/newhost" element={<HostForm/>}></Route>
            <Route path="/newroom" element={<CreateRoomForm/>}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/hostel" element={<Hostel />}></Route>
            <Route path="/mess" element={<Mess  />}></Route>
            <Route path="/pg" element={<PG />}></Route>
            <Route path="/apartment" element={<Apartment />}></Route>
            <Route path="/roomdetails/:id" element={<RoomDetails/>}></Route>
          </Routes>
        </div>

        {
          showSignupPage && 
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-md w-full h-full  text-white ">
            <div className="flex justify-center items-center w-full h-full  ">
              <Signup setShowSignupPage={setShowSignupPage} setShowSigninPage={setShowSigninPage} />
            </div>
          </div>
        }

        {
          showSigninPage && 
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md w-full h-full  text-white ">
            <div className="flex justify-center items-center w-full h-full  ">
              <Signin setShowSigninPage={setShowSigninPage} setShowSignupPage={setShowSignupPage} setShowForgetPasswordPage={setShowForgetPasswordPage} setIsLoggedIn={setIsLoggedIn} />
            </div>
          </div>
        }


        {
          showForgetPasswordPage && 
          <div className="absolute z-50 bg-black/50 backdrop-blur-md w-full h-full  text-white ">
            <div className="flex justify-center items-center w-full h-full  ">
              <ForgetPassword setShowSigninPage={setShowSigninPage} setShowForgetPasswordPage={setShowForgetPasswordPage}  />
            </div>
          </div>
        }

        
      </BrowserRouter>
    </div>
    </div>
     */


    <div className="">
      <BrowserRouter>
        <Suspense fallback={<Loader />} >
        <Routes>
          
          <Route path="/" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/pg" element={<PG/>}></Route>
            <Route path="/hostel" element={<Hostel/>}></Route>
            <Route path="/mess" element={<Mess/>}></Route>
            <Route path="/apartment" element={<Apartment/>}></Route>
          </Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin  setIsLoggedIn={setIsLoggedIn}  setUser={setUser}/>}></Route>
          <Route path="/roomdetails/:id" element={<RoomDetails/>}></Route>
          <Route path="/newhost" element={<HostForm/>}></Route>
          <Route path="/newroom" element={<CreateNewRoom/>}></Route>
          <Route path="/forgetPassword" element={<ForgetPassword/>}></Route>
          <Route path="/createnewroom" element={<CreateNewRoom/>}></Route>
          <Route path="/newreview/:id" element={<NewReview/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}



interface Layout{
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  isLoggedIn: boolean,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

function Layout({isLoggedIn , setIsLoggedIn , user , setUser}: Layout){

  return <>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
    <Hero/>
    <ErrorBoundary>
      <Outlet/>
    </ErrorBoundary>
    <Footer />
  </>
}




export default App
