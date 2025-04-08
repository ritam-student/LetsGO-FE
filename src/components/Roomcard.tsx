
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link, useNavigate } from "react-router-dom";
import { ThumbsUp } from 'lucide-react';

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

interface data{
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
    reviews: {_id:string}[]
}


interface roomData{
    data : data,
}



function Roomcard({data}: roomData){
    const navigate = useNavigate();
    
    return <>
    <Link to={`/roomdetails/${data._id}`}  className="h-[440px] md:w-[310px] lg:w-[340px] w-[300px] hover:scale-105  mt-5 rounded-xl  relative p-[2px]  ">
                <div className=" absolute inset-0 rounded-xl  bg-[#FEA47F] ">

                    
                    


                    <Swiper
                        slidesPerView={1} // Default for small screens
                        spaceBetween={30}
                        pagination={{
                        clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper relative h-[70%] w-full rounded-xl"
                        >
                            {
                                data.roomsImageUrls.map((url, i) => {
                                    return <SwiperSlide key={i} className="absolute inset-0">
                                        <div>
                                            <div className="absolute inset-0 z-0 rounded-xl" style={{backgroundImage: `url(${url})`, backgroundSize: 'cover' , backgroundPosition: 'center'}}></div>
                                            <div className="absolute z-30 right-6 top-4 bg-white px-2 py-1 rounded-xl  text-black font-semibold ">{data.type}</div>
                                            <div></div>
                                            <div className="absolute z-30 bottom-4 left-3 bg-gray-100 hover:scale-105 rounded-md  h-[70px] w-[80px] flex items-center justify-center  ">
                                                <div onClick={() => navigate(`/userdetails/${data?.owner._id}`)} className="rounded-[50%] border-2 border-black h-13 w-13 relative overflow-hidden cursor-pointer">
                                                    <div style={{backgroundImage: `url(${data.owner.userDetails.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'></div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                })
                            }
                    </Swiper>


                    <div className="h-30% rounded-xl w-full relative px-3 py-4">
                        <div className="flex items-center justify-between text-xl font-semibold  text-black">
                            <div>{data.state} , {data.country}</div>
                            <div className="flex items-center justify-between gap-1"> <ThumbsUp size={'20px'} />{data.likes.length}</div>
                        </div>

                        <div className="flex  items-center justify-start  text-slate-900">
                            <div>{data.area} , {data.pincode}</div>
                        </div>

                        <div className="flex items-center justify-start text-slate-900">
                            <div>Host <span className='text-md font-semibold'>{data.owner.name}</span></div>
                        </div>

                        <div className="flex items-center justify-start text-xl text-black font-medium">
                            {data.price} per month
                        </div>

                    </div>
                </div>
                
            </Link >
    </>
}


export default Roomcard;