
import { useRef, useState } from "react";
import RoomCardsSection from "./RoomCardsSection";
import axios from "axios";
import Roomcard from "./Roomcard";
import Swal from "sweetalert2";





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





function Hostel(){

    const api = import.meta.env.VITE_API_URL;
    const [roomDetails , setRoomDetails] = useState<data[] | null>(null);
    const timer = useRef(0);
    const searchRef = useRef<HTMLInputElement>(null);
    const [isLoading , setIsLoading] = useState(false);

    async function mainFun(val: string){
        
        try{
            const res = await axios.get(`${api}/api/v1/room/searchFromHostel?query=${val}`);
            
            setRoomDetails(res.data.data);
            setIsLoading(false);
            
        }catch(error){
            setIsLoading(false);
            if (axios.isAxiosError(error) && error.response){
                const status = error.response.status;
                if(status === 404){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops',
                        text: 'Something went wrong...',
                        confirmButtonText: 'OK',
                        timer: 3000
                    })
                }
            }
            
        }
    }

    async function search(){
        setIsLoading(true);
        const val = searchRef.current?.value;
        try{
            const res = await axios.get(`${api}/api/v1/room/searchFromHostel?query=${val}`);
            
            setRoomDetails(res.data.data);
            setIsLoading(false);
            
        }catch(error){
            setIsLoading(false);
            if (axios.isAxiosError(error) && error.response){
                const status = error.response.status;
                if(status === 404){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops',
                        text: 'Something went wrong...',
                        confirmButtonText: 'OK',
                        timer: 3000
                    })
                }
            }
            
        }
    }
    
    function onChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            
            const val = e.target.value;
            if (val === ""){
                setRoomDetails(null);
                return;
            }
            setIsLoading(true);
            mainFun(val);
        }, 1000);
    }

    return <>
        <div className="w-full h-auto min-h-screen pb-6 px-4 md:px-6 lg:px-8 bg-[#fab1a0]">
            <div className="flex items-center  justify-center pt-25  md:gap-2 gap-4 flex-col md:flex-row ">
                <input type="text" ref={searchRef} onChange={onChangeInput} placeholder="search by country or state or area name"  className="bg-white hover:border-2 hover:border-black  w-[90vw] md:w-[70vw] lg:w-[55vw] rounded-2xl text-sm md:text-lg lg:text-xl outline-none focus:border-2 focus:border-black text-black py-3 px-4"/>
                <button onClick={search} className="text-black bg-[#FEA47F] text-xl border-2 border-black hover:border-[#FEA47F]  px-4 py-3 rounded-2xl cursor-pointer hover:bg-slate-950 hover:text-white font-semibold transition-colors">Search</button>
            </div>

            <div className=" w-full h-auto text-black py-4 mt-20  ">
                {
                    isLoading? 
                    <div className="text-black text-xl font-semibold text-center">Loading Rooms details...</div>
                    :
                    <div>
                        {
                            ( roomDetails === null)?
                            <RoomCardsSection path={'/hostel'}  />
                            :
                            <div className=" flex md:flex-row flex-col flex-wrap  items-center justify-evenly gap-6">
                                {
                                    roomDetails.length === 0 ?
                                    <div className="text-black text-xl font-semibold">No such Rooms available</div>
                                    :
                                    roomDetails.map((room ) => {
                                        return <Roomcard key={room._id} data={room}/>
                                    })
                                }
                            </div>
                            
                        }
                        
                    </div>
                }
            </div>
        </div>
    </>
}

export default Hostel;