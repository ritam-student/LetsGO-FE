/* eslint-disable @typescript-eslint/no-unused-vars */
import { AirVent, Bed, CookingPot, IndianRupee, Wifi, X } from "lucide-react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Review from "./Review";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";




interface user{
  _id: string,
  userName: string,
  email: string,
  imageUrl : string,
  password: string,
  city:string,
  country: string,
  saved: {_id:string}[],
  likes: {_id:string}[],
  dislikes: {_id: string}[],
  bookedRooms: {_id:string}[],
  pincode: string,
  state: string
}


interface owner{
  _id : string,
  name: string,
  userDetails: user,
  experience: string,
  rooms: {_id:string}[]
}

interface roomData{
  _id: string,
  houseName: string,
  owner: owner,
  description: string,
  roomsImageUrls: string[],
  address: string,
  price: number,
  country: string,
  type: string,
  city : string,
  likes: {_id: string}[],
  dislikes: {_id: string}[],
  saved: {_id: string}[],
  state: string,
  area: string,
  pincode: string,
  sellerEmail: string,
  isAc: boolean,
  isSingleBed: boolean,
  isKitchen: boolean,
  freeWifi: boolean,
  reviews: review[]
}

interface review{
  _id: string,
  userDetails: user,
  roomId : roomData,
  content: string,
  ratings: string,
  name: string
}


function RoomDetails(){

    const api = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const {id} = useParams();
    const [isLiked , setIsLiked] = useState(false);
    const [isDisliked , setIsDisliked] = useState(false);
    const [isSaved , setIsSaved] = useState(false);

    const [data, setData] = useState<roomData | null>(null);
    const [isLoading , setIsLoading] = useState(true);
    const [isError , setIsError] = useState(false);


    async function likeRoom(){
      setIsLiked(true);
      // backend request to update the data
      try{
        await axios.put(`${api}/api/v1/room/${id}/like` , {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
        cancelDislikeRoom();

      }catch(error){
        setIsLiked(false);
        Swal.fire({
          icon: 'error',
          title: "Oops",
          text: 'Sorry , unable to update the room',
          confirmButtonText: 'OK'
        });
        
      }

    }

    async function dislikeRoom(){
      setIsDisliked(true);
      // backend request to update the data
      try{
        await axios.put(`${api}/api/v1/room/${id}/dislike` , {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
        cancelLikeRoom();

      }catch(error){
        setIsDisliked(false);
        Swal.fire({
          icon: 'error',
          title: "Oops",
          text: 'Sorry , unable to update the room',
          confirmButtonText: 'OK'
        });
        
      }

    }

    async function cancelDislikeRoom(){
      setIsDisliked(false);
      // backend request to update the data
      try{
        await axios.put(`${api}/api/v1/room/${id}/undislike` , {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );

      }catch(error){
        setIsDisliked(true);
        Swal.fire({
          icon: 'error',
          title: "Oops",
          text: 'Sorry , unable to update the room',
          confirmButtonText: 'OK'
        });
        
      }
    }

    async function cancelLikeRoom(){
      setIsLiked(false);
      // backend request to update the data
      try{
        await axios.put(`${api}/api/v1/room/${id}/unlike` , {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );

      }catch(error){
        setIsLiked(true);
        Swal.fire({
          icon: 'error',
          title: "Oops",
          text: 'Sorry , unable to update the room',
          confirmButtonText: 'OK'
        });
        
      }
    }

    async function saveRoom(){
      setIsSaved(true);
      // backend request to update the data
      try{
        
        await axios.put(`${api}/api/v1/room/${id}/save` , 
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );

      }catch(error){
        setIsSaved(false);
        Swal.fire({
          icon: 'error',
          title: "Oops",
          text: 'Sorry , unable to update the room',
          confirmButtonText: 'OK'
        });
        
      }
    }

    async function cancelSaveRoom(){
      setIsSaved(false);
      // backend request to update the data
      try{
        await axios.put(`${api}/api/v1/room/${id}/unsave` , {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );

      }catch(error){
        setIsSaved(true);
        Swal.fire({
          icon: 'error',
          title: "Oops",
          text: 'Sorry , unable to update the room',
          confirmButtonText: 'OK'
        });
        
      }
    }


    function redirect(){
      const tab = localStorage.getItem("activeLink");
      if(!tab || tab === '/'){
          navigate("/");
      }else{
          navigate(`/${tab}`);
      }
      
  }

  useEffect(() => {
    console.log(id);
    if (! localStorage.getItem('token') || localStorage.getItem('token') === undefined || localStorage.getItem('token') === null ){
      Swal.fire({
        icon: 'warning',
        title: 'Sorry !',
        text: 'Please Sign in to access room details...',
        confirmButtonText: 'Ok'
      });
      redirect();
      return;
    }
    const fetchData = async () => {
        setIsLoading(true);
        try{
          let res;
          let isSaved , isLiked , isDisliked;
          try{
              res = await axios.get(`${api}/api/v1/room/roomdetails/${id}`,
                {
                  headers: {
                    token: localStorage.getItem("token")
                  }
                }
              );
              
              if (res.data.data.user.likes.length === 0){
                isLiked = false;
              } else {
                if (res.data.data.user.likes.includes(id)){
                  isLiked = true;
                } else {
                  isLiked = false ;
                } 
              }

              if (res.data.data.user.dislikes.length === 0){
                isDisliked = false;
              } else {
                if (res.data.data.user.dislikes.includes(id)){
                  isDisliked = true;
                } else {
                  isDisliked = false ;
                } 
              }

              if (res.data.data.user.saved.length === 0){
                isSaved = false;
              } else {
                if (res.data.data.user.saved.includes(id)){
                  isSaved = true;
                } else {
                  isSaved = false ;
                } 
              }

          }catch(error){
              setIsError(true);
              setIsLoading(false);
              if(axios.isAxiosError(error) && error.response){
                  const status = error.response.status;
                  if(status === 404){
                      console.log("room not found...");
                      Swal.fire({
                        icon: "error",
                        title: 'Oops !',
                        text: 'Room details not found...',
                        confirmButtonText: 'OK'
                      });
                      
                  }else if(status === 401){
                    
                      Swal.fire({
                        icon: "error",
                        title: 'Oops !',
                        text: 'Please Sign in first...',
                        confirmButtonText: 'OK'
                      });
                  }else{
                    
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops !',
                      text: 'Error while getting room details...',
                      confirmButtonText: 'OK'
                    })
                  }
              }else{
                  
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops !',
                    text: 'Internal Error',
                    confirmButtonText: 'OK'
                  });
              }
              setIsLoading(false);
              return;
        }
          setIsError(false);
          const newData = res?.data.data.roomDetails;
          setData(newData);
          
          setIsLoading(false);
          setIsLiked(isLiked);
          setIsDisliked(isDisliked);
          setIsSaved(isSaved);
        }catch(error){
          setIsError(true);
            
            setIsLoading(false);
        }
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLiked , isSaved , isDisliked]);

    return <>
    <div className="text-white left-0 right-0  px-6 md:px-14 lg:px-20 top-0 z-50 h-auto w-full relative bg-[#fab1a0] ">
        <X onClick={redirect}  className="cursor-pointer text-black absolute right-2 top-2 hover:border-2 hover:border-black rounded-md "/>
        {
          isError ? 
          <div className="w-full h-screen flex flex-col items-center justify-center text-black text-xl font-bold">
            <div className="text-black text-8xl">Sorry !</div>
            <p className="text-2xl mt-4">Error while getting Room details ...</p>
          </div>
          : 
          <>
          {
            isLoading ? 
            <>
              <div className="flex items-center justify-end pt-10  ">
                <button className="bg-gray-900 text-gray-900 px-4 py-2 rounded-xl  ">save</button>
              </div>
              

              {/**  mobile view  */}
              <div className="h-auto py-8 my-8">
              <Swiper
              slidesPerView={1} // Default for small screens
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2, // For small screens (sm)
                },
                768: {
                  slidesPerView: 3, // For medium screens (md)
                },
                1024: {
                  slidesPerView: 4, // For large screens (lg)
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
                >
                  <SwiperSlide >
                      <div className="bg-gray-900 relative rounded-md h-[300px] ">
                        
                      </div>
                  </SwiperSlide>
                </Swiper>
          
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
                  <div className="w-full md:w-1/2 ">
                      <div className="bg-gray-900 h-4 rounded-md w-1/2  "></div>
                      <div className="bg-gray-900 h-3 rounded-md w-1/3 mt-3"></div>
                      <div className="flex items-center justify-between gap-3 border-t-2 border-b-2 border-gray-900 py-2 px-2 my-8">
                          <div className="rounded-full border-2 border-gray-900 h-12 w-12 flex items-center justify-center bg-gray-900"></div>
                          <div>
                              <p className="h-4 rounded-md w-[150px] bg-gray-900"></p>
                              <p className="h-2 rounded-md w-[110px] bg-gray-900 mt-3"></p>
                          </div>
                      </div>
                  </div>
                  <div className="w-full md:w-1/2 flex items-center justify-center cursor-pointer">
                      <div className="bg-gray-800 px-10 py-6 my-4 rounded-md shadow-md shadow-gray-400">
                          <p className="text-2xl font-semibold flex items-center justify-center gap-1 h-4 w-full bg-gray-900 rounded-md  "> </p>
                          <p className="my-2 text-[22px] border-b-2 border-gray-800 pb-2 h-3 w-1/2 bg-gray-900 rounded-md "></p>
                          <ul className="flex flex-col  gap-2 justify-between mt-6">
                              <li className="flex items-center justify-start gap-2 h-2 w-1/3 bg-gray-900 rounded-md"></li>
                              <li className="flex items-center justify-start gap-2 h-2 w-1/3 bg-gray-900 rounded-md"></li>
                              <li className="flex items-center justify-start gap-2 h-2 w-1/3 bg-gray-900 rounded-md"></li>
                              <li className="flex items-center justify-start gap-2 h-2 w-1/3 bg-gray-900 rounded-md"></li>
                          </ul>
                          <div className="bg-gray-900 text-gray-900 h-5 w-full text-center text-xl px-10 py-1 rounded-md cursor-pointer mt-4  "></div>
                      </div>
                  </div>
              </div>

              

              <div className="h-auto py-8 my-8">
              <Swiper
              slidesPerView={1} // Default for small screens
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2, // For small screens (sm)
                },
                768: {
                  slidesPerView: 3, // For medium screens (md)
                },
                1024: {
                  slidesPerView: 4, // For large screens (lg)
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
                >
                  <SwiperSlide  >
                    <div className="h-auto text-white rounded-md  bg-slate-800 px-6 py-5 ">
                        <div className="flex items-center gap-2 justify-start">
                            <div className="bg-gray-900 rounded-full h-16 w-16 flex items-center justify-center"></div>
                            <div className="">
                                <p className="text-xl font-semibold text-white bg-gray-800 h-3 w-1/2 rounded-md"></p>
                                <p className="text-gray-300 bg-gray-800 h-3 w-1/2 rounded-md"></p>
                            </div>
                        </div>

                        <div className="my-4  text-[18px] h-4 w-1/2 bg-gray-900 rounded-md">
                            
                        </div>

                        <div className="text-gray-300 h-2 w-1/3 bg-gray-900 rounded-md">
                            
                        </div>
                    </div>
                  </SwiperSlide>
              </Swiper>
          
              </div>
            </>
            :
            <>
              <div className="flex items-center justify-end pt-10  ">
                {
                  isSaved ? 
                  <button onClick={cancelSaveRoom} className="bg-black text-white font-semibold px-4 py-2 rounded-xl text-xl  hover:bg-slate-800 hover:scale-110 transition-all cursor-pointer">Saved</button>
                  :
                  <button onClick={saveRoom} className="bg-black text-white font-semibold px-4 py-2 rounded-xl text-xl  hover:bg-slate-800 hover:scale-110 transition-all cursor-pointer">Save</button>
                }
              </div>
              

              {/**  mobile view  */}
              <div className="h-auto py-8 my-8">
              <Swiper
              slidesPerView={1} // Default for small screens
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2, // For small screens (sm)
                },
                768: {
                  slidesPerView: 3, // For medium screens (md)
                },
                1024: {
                  slidesPerView: 4, // For large screens (lg)
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
                >
              {
                  data?.roomsImageUrls.map((data , i) => {
                  return <SwiperSlide key={i} >
                      <div className="bg-gray-300 relative rounded-xl h-[300px] ">
                        <div style={{backgroundImage: `url(${data})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute rounded-xl z-0 inset-0'>
                          
                        </div>
                      </div>
                  </SwiperSlide>
                  })
              }
              </Swiper>
          
              </div>

              <div className="text-black flex pb-6 px-4 md:px-6 lg:px-8 items-center justify-end gap-2 text-right">
                {
                  isLiked ?
                  <AiFillLike onClick={cancelLikeRoom} size={'30px'} className="cursor-pointer"/>
                  :
                  <AiOutlineLike onClick={likeRoom} size={'30px'}  className="cursor-pointer"/>
                }
                <span className="text-2xl font-semibold">{data?.likes.length}</span>

                {
                  isDisliked ?
                  <AiFillDislike onClick={cancelDislikeRoom} size={'30px'} className="cursor-pointer"/>
                  :
                  <AiOutlineDislike onClick={dislikeRoom} size={'30px'} className="cursor-pointer"/>
                }
                <span className="text-2xl font-semibold">{data?.dislikes.length}</span>
                
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
                  <div className="w-full md:w-1/2 ">
                      <div className="text-black text-3xl font-semibold"> {data?.state} , {data?.country} </div>
                      <div className="text-gray-900 mt-1 text-xl">{data?.address} , {data?.area} , {data?.pincode}</div>
                      <div className="flex items-center justify-between gap-3 border-t-2 border-b-2 border-black py-2 px-2 my-8">
                          <div className="rounded-full border-2 border-gray-400 relative h-12 w-12 flex items-center justify-center overflow-hidden">
                            <div style={{backgroundImage: `url(${data?.owner.userDetails.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'>
                            </div>
                          </div>
                          <div className="text-black ">
                              <p className="text-2xl font-semibold text-gray-800">Hosted by <span className="text-black font-bold">{data?.owner.name}</span></p>
                              <p>{data?.owner.experience} YOE ,  <span className="text-blue-600 cursor-pointer hover:text-blue-900 hover:font-bold">{data?.sellerEmail}</span></p>
                          </div>
                      </div>
                  </div>
                  <div className="w-full md:w-1/2 flex items-center justify-center cursor-pointer hover:scale-105 ">
                      <div className="bg-white text-black px-10 py-6  rounded-md shadow-md  relative shadow-gray-400">
                          <p className="text-2xl font-bold flex items-start  gap-1  "> <IndianRupee size={"22px"} className="top-8 left-9 absolute text-bold" /> <span className="text-2xl ml-5 mt-0.5">{data?.price}/Month</span></p>
                          <p className="my-2 text-2xl font-semibold border-b-2 border-black mt-6 pb-2">Facilities :</p>
                          <ul className="flex flex-col  gap-2 justify-between mt-4">
                              <li className="flex items-center justify-start gap-2 text-xl"> <AirVent className="text-black" /> 
                                {
                                  data?.isAc ? 
                                  <p className="">AC available</p>
                                  :
                                  <p className="line-through">AC available</p>
                                }
                              </li>
                              <li className="flex items-center justify-start gap-2 text-xl">  <Bed className="text-black" />
                                {
                                  data?.isSingleBed ? 
                                  <p>Single Bed available</p>
                                  :
                                  <p className="line-through">Single Bed available</p>
                                }
                               </li>
                              <li className="flex items-center justify-start gap-2 text-xl"> <CookingPot className="text-black" />
                                {
                                  data?.isKitchen ? 
                                  <p>Kitchen available</p>
                                  :
                                  <p className="line-through">Kitchen available</p>
                                }
                               </li>
                              <li className="flex items-center justify-start gap-2 text-xl"> <Wifi className="text-black" /> 
                                {
                                  data?.freeWifi ? 
                                  <p>Free Wi-fi </p>
                                  :
                                  <p className="line-through">Free Wi-fi </p>
                                }
                              </li>
                          </ul>
                          <div className="bg-pink-600 text-white text-center text-xl px-10 py-1  rounded-md cursor-pointer mt-8 font-semibold hover:bg-red-800 ">Book</div>
                      </div>
                  </div>
              </div>

              <div>
                  <p className="text-black font-medium text-xl my-8 ">{data?.description}</p>
              </div>

              <div className="h-auto py-12 ">
              {
                data?.reviews.length === 0 ?
                <div className="w-full h-auto flex items-center justify-center">
                  <Link to={`/newreview/${id}`} className="border-b-2 border-black text-black font-bold transition-all">Add new Review</Link>
                </div>
                :
                <>
                <Swiper
                slidesPerView={1} // Default for small screens
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2, // For small screens (sm)
                  },
                  768: {
                    slidesPerView: 3, // For medium screens (md)
                  },
                  1024: {
                    slidesPerView: 4, // For large screens (lg)
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
                  >
                {
                    data?.reviews.map((review , i) => {
                    return <SwiperSlide key={i} ><Review review={review}/></SwiperSlide>
                    })
                }
                </Swiper>
                <div className="w-full h-auto flex mt-4 items-center justify-center">
                  <Link to={`/newreview/${id}`} className="border-b-2 border-black text-black font-bold transition-all">Add new Review</Link>
                </div>
                </>
              }
              
          
              </div>
            </>
          }
            
          </>
        }
    </div>
    </>
}


export default RoomDetails;