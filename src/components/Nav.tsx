import {  Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {fadeIn} from "../utils/motion.ts"







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
  


interface nav{
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    isLoggedIn: boolean
}

const menue: {to : string, value : string}[] = [
    {"to" : "/hostel" , "value" : "Hostel"},
    {"to" : "/apartment" , "value" : "Apartment"},
    {"to" : "/mess" , "value" : "Mess"},
    {"to" : "/pg" , "value" : "PG"}
]

function Navbar({user , setUser, isLoggedIn , setIsLoggedIn} : nav){


    const [dropDownOpen , setDropDownOpen] = useState(false);
    const [activeLink , setActiveLink] = useState(() => {
        const savedLink = localStorage.getItem("activeLink");
        return savedLink ? savedLink : "/";
    });

    const handleSetActiveLink = (link: string) => {
        setActiveLink(link);
        localStorage.setItem("activeLink", link);
    };


    function signout(){
        setDropDownOpen(false);
        Swal.fire({
            title: "Are you Sure ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "blue",
            cancelButtonColor: "gray",
            confirmButtonText: "Yes, Sign out!",
        }).then((result) => {
            if(result.isConfirmed){
                localStorage.removeItem('token');
                localStorage.removeItem('userImgUrl');
                localStorage.removeItem('sellerToken');
                setIsLoggedIn(false);
                setUser(null);
                Swal.fire({
                    title: "sucess",
                    text : "Sign out Sucessfully...",
                    icon: "success",
                    confirmButtonText: "OK"
                });
            }
        })
    }

    

    return (
        <>
        <div className="flex items-center justify-between bg-[#fab1a0] w-full px-4 md:px-6 lg:px-8 py-3">
            {/**  left part   */}
            <motion.div variants={fadeIn('up' , 0.4)}
            initial='hidden'
            whileInView={"show"}
            viewport={{once: true}}
            className="text-black font-bold text-5xl  outline-none ">
                <Link to={"/"} onClick={() => handleSetActiveLink("/")}>LetsGO</Link>
            </motion.div>
            
            {/**  middle part   */}
            <div className="hidden md:block">
                <div className="text-2xl gap-9 flex items-center justify-between">
                {
                    menue.map((data , index) => {
                        return <motion.div variants={fadeIn('down' , 0.4 * (index+1))}
                        initial='hidden'
                        whileInView={"show"}
                        viewport={{once: true}}
                        ><Link to={data.to} key={index}  
                        onClick={() =>  handleSetActiveLink(data.value)}
                        className={`relative font-bold after:bottom-0 after:absolute after:left-0 after:h-0.5  after:w-0 hover:after:w-full after:bg-slate-900 after:transition-all ${activeLink === data.value ? "text-black after:w-full" : "text-[#6D214F] hover:after:bg-slate-900 hover:text-black " } `} >
                        {data.value}
                        </Link></motion.div>
                    } )
                }
                </div>
            </div>

            {/**   right part   */}

                {/**   large screen   */}
            <div className="hidden lg:block">
                {
                    isLoggedIn ? 
                    <div className="flex items-center justify-between gap-5 text-xl">
                        <div className="rounded-full border-2 border-[#F97F51] overflow-hidden  h-10 w-10 relative cursor-pointer">
                            <div style={{backgroundImage: `url(${localStorage.getItem('userImgUrl')})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'></div>
                        </div>
                        <motion.div variants={fadeIn('left' , 0.4)}
                        initial='hidden'
                        whileInView={"show"}
                        viewport={{once: true}}
                        ><button className="bg-pink-800 text-white rounded-2xl  font-bold  cursor-pointer hover:bg-slate-950 hover:scale-105 px-3 py-2"
                        onClick={signout}
                        >Sign out</button></motion.div>
                    </div>
                    : 
                    <div className="flex items-center justify-between gap-5 text-xl">
                        <motion.div
                        variants={fadeIn('right' , 1.6)}
                        initial='hidden'
                        whileInView={"show"}
                        viewport={{once: true}}
                        >
                            <Link to={"/signup"} className="bg-pink-800 text-white rounded-2xl  font-bold  cursor-pointer hover:bg-slate-950 hover:scale-105 px-3 py-2"
                        >Sign up</Link>
                        </motion.div>

                        <motion.div
                        variants={fadeIn('left' , 2)}
                        initial='hidden'
                        whileInView={"show"}
                        viewport={{once: true}}
                        >
                            <Link to={"/signin"} className="bg-pink-800 text-white rounded-2xl  font-bold  cursor-pointer hover:bg-slate-950 hover:scale-105 px-3 py-2"
                        >Sign in</Link></motion.div>
                    </div>
                }
            </div>
                
                {/**   mobile or medium  device   */}
            <div className="text-white block lg:hidden ">
                <div className="flex items-center justify-between gap-3">
                    {
                        isLoggedIn && 
                        <div className="rounded-full border-2 border-[#F97F51]  overflow-hidden  h-8  w-8 relative cursor-pointer">
                            <div style={{backgroundImage: `url(${user?.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'></div>
                        </div>
                    }
                    {
                        dropDownOpen ? 
                        <X  onClick={() => setDropDownOpen(s => !s)} className=' hover:border-2 rounded-md text-black  hover:border-black cursor-pointer transition-all'/>
                        :
                        <Menu  className="cursor-pointer hover:border-2 size-8 hover:border-black text-black rounded-md transition-all" onClick={() => setDropDownOpen(s => !s)} />
                    }
                </div>
            </div>
        </div>

        {
            dropDownOpen && 
            <div className="">
                {/** mobile device  */}
                <div className="block md:hidden transition-all">
                    <div className="relative w-full flex flex-col items-center justify-between  bg-[#FEA47F] text-black text-xl font-semibold gap-3">
                        <div className="w-full flex flex-col py-2 px-4">
                            
                            
                            {
                                menue.map((data , i) => (
                                    <Link key={i} to={data.to} onClick={() => setDropDownOpen(s => !s)}  className=" hover:border-b-2 hover:border-black hover:bg-[#fab1a0] py-1 px-2 rounded-xl  cursor-pointer transition-all">
                                        <motion.div
                                        variants={fadeIn('up' , 0.4 * (i+1))}
                                        initial='hidden'
                                        whileInView={"show"}
                                        viewport={{once: true}}
                                        ><button>{data.value}</button></motion.div>
                                    </Link>
                                ))
                            }

                            {
                                isLoggedIn ? 
                                <div>
                                    <div onClick={signout}
                                    className=" hover:border-b-2 hover:border-black hover:bg-[#fab1a0] py-1 px-2 cursor-pointer rounded-xl transition-all">
                                        <motion.div
                                        variants={fadeIn('up' , 1.6)}
                                        initial='hidden'
                                        whileInView={"show"}
                                        viewport={{once: true}}
                                        ><button>Sign out</button></motion.div>
                                    </div>
                                </div>
                                :
                                <div className="flex flex-col">
                                    <Link to={"/signup"} className=" hover:border-b-2 hover:border-black hover:bg-[#fab1a0] py-1 px-2 cursor-pointer rounded-xl transition-all">
                                        <motion.div
                                        variants={fadeIn('up' , 1.6)}
                                        initial='hidden'
                                        whileInView={"show"}
                                        viewport={{once: true}}
                                        ><button>Sign up</button></motion.div>
                                    </Link>
                                    <Link to={"/signin"} className=" hover:border-b-2 hover:border-black hover:bg-[#fab1a0] py-1 px-2  cursor-pointer rounded-xl transition-all">
                                        <motion.div
                                        variants={fadeIn('up' , 2)}
                                        initial='hidden'
                                        whileInView={"show"}
                                        viewport={{once: true}}
                                        ><button >Sign in</button></motion.div>
                                    </Link>
                                </div>
                            }

                        </div>
                    </div>
                </div>
                
                {/**  medium device   */}
                <div className="hidden md:block lg:hidden transition-all  ">
                    <div className="relative w-full flex flex-col items-center justify-between  bg-[#FEA47F] text-black gap-3 text-xl font-semibold">
                        <div className="w-full flex flex-col py-2 px-4">
                            
                            
                            {
                                isLoggedIn ?
                                <div>
                                    <div onClick={signout}
                                    className=" hover:border-b-2 hover:border-black hover:bg-[#fab1a0] py-1 px-2 rounded-xl cursor-pointer transition-all">
                                        <motion.div
                                        variants={fadeIn('up' , 0.6)}
                                        initial='hidden'
                                        whileInView={"show"}
                                        viewport={{once: true}}
                                        ><button>Sign out</button></motion.div>
                                    </div>
                                </div>
                                :
                                <div className="flex flex-col">
                                    <Link  to={"/signup"} className=" hover:border-b-2 hover:border-black hover:bg-[#fab1a0] rounded-xl py-1 px-2  cursor-pointer transition-all">
                                        <motion.div
                                        variants={fadeIn('up' , 0.6)}
                                        initial='hidden'
                                        whileInView={"show"}
                                        viewport={{once: true}}
                                        ><button>Sign up</button></motion.div>
                                    </Link>
                                    <Link to={"/signin"} className=" hover:border-b-2 hover:border-black hover:bg-[#fab1a0] rounded-xl py-1 px-2  cursor-pointer  transition-all">
                                        <motion.div
                                        variants={fadeIn('up' , 1)}
                                        initial='hidden'
                                        whileInView={"show"}
                                        viewport={{once: true}}
                                        ><button>Sign in</button></motion.div>
                                    </Link>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Navbar;