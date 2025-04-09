/* eslint-disable @typescript-eslint/no-unused-vars */
// import { X } from "lucide-react";

import axios from "axios";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function HostForm(){
    const navigate =  useNavigate();
    const api = import.meta.env.VITE_API_URL;

    const nameRef = useRef<HTMLInputElement>(null);
    const YOERef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const pincodeRef = useRef<HTMLInputElement>(null);


    
    function redirect(){
        const tab = localStorage.getItem("activeLink");
        if(!tab || tab === '/'){
            navigate("/");
        }else{
            navigate(`/${tab}`);
        }
    }


    async function submitForm(){
        if(nameRef.current?.value === undefined || nameRef.current.value === ""){
            nameRef.current?.focus();
            
        }else if (YOERef.current?.value === undefined || YOERef.current.value === ""){
            YOERef.current?.focus();
            
        }else if (stateRef.current?.value === undefined || stateRef.current.value === ""){
            stateRef.current?.focus();
            
        }else if (cityRef.current?.value === undefined || cityRef.current.value === ""){
            cityRef.current?.focus();
            
        }else if (pincodeRef.current?.value === undefined || pincodeRef.current.value === ""){
            pincodeRef.current?.focus();
            
        }else{
            const name = nameRef.current.value;
            const YOE = YOERef.current.value;
            const city = cityRef.current.value;
            const state = stateRef.current.value;
            const pincode = pincodeRef.current.value;
            
            setIsLoading(true);
            const token = localStorage.getItem('token');
            if (token){
                try{
                    let res;
                    try{
                        res = await axios.post(`${api}/api/v1/seller/newseller` , {
                            name,
                            YOE,
                            city, 
                            state,
                            pincode
                        },
                        {
                            headers : {
                                'token' : localStorage.getItem('token')
                            }
                        }
                    );
    
                    
                    }catch(error){
                        setIsLoading(s => !s);
                        if (axios.isAxiosError(error) && error.response) {
                            const statusCode = error.response.status;
                            if (statusCode === 401) {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Oops...",
                                    text: "Unauthorized access. Please Sign in.....",
                                    confirmButtonText: "Ok"
                                });
                            } else if (statusCode === 420) {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Oops...",
                                    text: "Seller already exist.....",
                                    confirmButtonText: "Ok"
                                });
                            } else if (statusCode === 403) {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Oops...",
                                    text: "User not found.....",
                                    confirmButtonText: "Ok"
                                });
                            }else if (statusCode === 501) {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Oops...",
                                    text: "Sellers model is not initialized.....",
                                    confirmButtonText: "Ok"
                                });
                            } else{
                                Swal.fire({
                                    icon: 'error',
                                    title: "Oops...",
                                    text: "Failed to process your data. Please try again later....",
                                    confirmButtonText: "Ok"
                                });
                            }
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Internal error. Please try again later....",
                                confirmButtonText: "Ok"
                            });
                            
                        }
                        return; // Exit the function if an error occurs
                    }
                    
                    localStorage.setItem('sellerToken' , res.data.data);
                    setIsLoading(false);
                    Swal.fire({
                        text : "Sign in Sucessfully...",
                        icon: "success",
                        timer: 3000,
                        title: "sucess",
                        confirmButtonText: "OK"
                    });
                    redirect();
                }catch(error){
                    
                    Swal.fire({
                        icon: "error",
                        title: "Oops",
                        text: "Something went wrong , try after sometime...",
                        confirmButtonText: "OK"
                    })
                }
            }else {
                Swal.fire({
                    icon: 'warning',
                    text: 'Please sign in first....',
                    title: 'Oops',
                    confirmButtonText: 'Ok'
                });
                setIsLoading(false);
            }
            
        }
    }



    const [isLoading , setIsLoading] = useState(false);
   return <>
   <div className="h-auto py-20 bg-[#fab1a0] w-full flex items-center justify-center text-black">

        <div className=" relative w-[300px] md:w-[450px] lg:w-[520px] rounded-xl shadow-lg shadow-gray-400  px-8 py-10 flex gap-4 justify-start flex-col bg-[#FEA47F] ">
            <X  onClick={redirect}  className=" cursor-pointer absolute right-5 hover:border-2 hover:border-black rounded-md text-balck "/> 
        
            <h2 className="text-center text-2xl font-bold my-9">Become a Host</h2>
            <div className="">
            <p className="text-xl mt-3">Name : </p>
            <input type="text" ref={nameRef}  placeholder="Enter your full name" className="rounded-xl shadow-sm shadow-gray-500  text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-2 h-[40px] px-4  " />
            </div>
            <div className="">
            <p className="text-xl mt-3">Years of Experience : </p>
            <input type="text" ref={YOERef}  placeholder="Enter your years of experience" className="rounded-xl shadow-sm shadow-gray-500  text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-2 h-[40px] px-4  " />
            </div>

            <div>
                <p className="text-xl mt-3">state :</p>
                <input type="text" ref={stateRef} placeholder="Enter your state" className="rounded-xl shadow-sm shadow-gray-500  text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-2 h-[40px] px-4  " />
            </div>

            <div>
                <p className="text-xl mt-3">city :</p>
                <input type="text" ref={cityRef}  placeholder="Enter your city" className="rounded-xl shadow-sm shadow-gray-500  text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-2 h-[40px] px-4  " />
            </div>

            <div>
                <p className="text-xl mt-3">pincode :</p>
                <input type="text" ref={pincodeRef}  placeholder="Enter your pincode" className="rounded-xl shadow-sm shadow-gray-500  text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-2 h-[40px] px-4  " />
            </div>


            <button onClick={submitForm} className="bg-black hover:bg-slate-800 text-white rounded-2xl font-bold text-xl px-8 py-1 mt-[6vh] cursor-pointer">
                {
                    isLoading ? "Submitting..." : "Submit"
                }
            </button>
            
        </div>
   </div>
   </>
}


export default HostForm;