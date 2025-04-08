import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import '../../node_modules/swiper/modules/navigation.css';
import '../../node_modules/swiper/modules/pagination.css';
import '../../node_modules/swiper/modules/effect-fade.css';
import '../../node_modules/swiper/swiper.css';




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

    <div className="w-full h-[400px] bg-[#fab1a0] pt-10">
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="w-full h-[400px] relative">
                <div style={{backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80)', backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'>
                </div>
            </div>
          
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full h-[400px] relative">
            <div style={{backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'>
            </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full h-[400px] relative">
            <div style={{backgroundImage: 'url(https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9zdGVsfGVufDB8fDB8fHww)', backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'>
            </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full h-[400px] relative">
            <div style={{backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'>
            </div>
        </div>
        </SwiperSlide>
      </Swiper>
    </div>
    
    </>
}


export default Hero;