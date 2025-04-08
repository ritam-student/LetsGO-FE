import { Link} from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer(){
    
    return <>
    <div className="w-full h-auto px-8 md:px-14 lg:px-20 py-6 text-gray-900 font-medium flex items-center justify-between  bg-[#FEA47F]">
        <div className="leading-8 tracking-wider">
            <h4 className="text-black font-semibold text-lg cursor-pointer">Support</h4>
            <ul className="text-gray-800">
                <li className="hover:text-black cursor-pointer">Help center</li>
                <li className="hover:text-black cursor-pointer">Get help with a satisfy issue</li>
                <li className="hover:text-black cursor-pointer">Report</li>
                <li className="flex items-center justify-start gap-3 mt-4 "><FaInstagram  className="hover:text-black cursor-pointer" /> <BiLogoGmail  className="hover:text-black cursor-pointer" /> <FaXTwitter className="hover:text-black cursor-pointer" /> <FaLinkedin  className="hover:text-black cursor-pointer" /></li>
            </ul>
        </div>
        <div className="leading-8 tracking-wider">
            <h4 className="text-black font-semibold text-lg cursor-pointer">Facilities</h4>
            <ul className="text-gray-800 ">
                <Link to={'/newhost'}><li className="hover:text-black cursor-pointer">Become a host</li></Link>
                <Link to={'/hostel'}><li className="hover:text-black cursor-pointer">Find Hostels</li></Link>
                <Link to={'/mess'}><li className="hover:text-black cursor-pointer">Find Mess</li></Link>
                <Link to={'/apartment'}><li className="hover:text-black cursor-pointer">Find Apartment</li></Link>
                <Link to={'/pg'}><li className="hover:text-black cursor-pointer">Find Pg</li></Link>
            </ul>
        </div>
    </div>
    
    </>
}


export default Footer;