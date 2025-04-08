import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";




function Hero(){

    const navigate = useNavigate();


    function changePage(){
        if(localStorage.getItem('token')){
            navigate('/newhost');
        }else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops !',
                text: 'Please Sign in to Become a Host...',
                confirmButtonText: 'OK',
                timer: 3000
            });
        }
    }

    return <>
    <div className="relative w-full h-auto bg-[#fab1a0] z-0">
      <div className="relative w-full h-auto z-50 py-10 bg-[#fab1a0]  text-white ">
        {
            localStorage.getItem('sellerToken') === null || localStorage.getItem('sellerToken') === "undefined" ?
            <button onClick={changePage} className=" absolute top-12  text-xl font-bold px-4 py-2  right-8  bg-black text-white rounded-2xl transition-colors cursor-pointer hover:bg-slate-900  hover:scale-105">Become a Host</button>
            :
            <Link to={'/createnewroom'} className="text-white bg-black  rounded-2xl absolute top-12 hover:bg-slate-900 text-xl font-bold px-4 py-2 cursor-pointer hover:scale-105  transition-colors backdrop-blur-xl right-8">Add new Rooms</Link>
        }

        
    </div>
    </div>
    
    </>
}


export default Hero;