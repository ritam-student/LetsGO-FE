import{r,j as t}from"./index-CvtE0vql.js";import{R as h,a as g}from"./RoomCardsSection-DjMa1bni.js";import{a as l}from"./index-t--hEgTQ.js";import"./react-DJG_os-6.js";import"./swiper-B7pBPPGb.js";function k(){const i="https://letsgo-be.onrender.com",[n,c]=r.useState(null),d=r.useRef(0),u=r.useRef(null),[x,a]=r.useState(!1);async function m(s){try{const e=await l.get(`${i}/api/v1/room/searchFromMess?query=${s}`);console.log(e.data),console.log(e.data.data),c(e.data.data),a(!1)}catch(e){a(!1),l.isAxiosError(e)&&e.response&&e.response.status===404&&console.log("error")}}async function f(){var e;a(!0);const s=(e=u.current)==null?void 0:e.value;try{const o=await l.get(`${i}/api/v1/room/searchFromMess?query=${s}`);console.log(o.data),console.log(o.data.data),c(o.data.data),a(!1)}catch(o){a(!1),l.isAxiosError(o)&&o.response&&o.response.status===404&&console.log("error")}}function p(s){clearTimeout(d.current),d.current=setTimeout(()=>{console.log(s.target.value);const e=s.target.value;if(e===""){c(null);return}a(!0),m(e)},1e3)}return t.jsx(t.Fragment,{children:t.jsxs("div",{className:"w-full h-auto min-h-screen pb-6 px-4 md:px-6 lg:px-8 bg-[#fab1a0]",children:[t.jsxs("div",{className:"flex items-center  justify-center pt-25  md:gap-2 gap-4 flex-col md:flex-row ",children:[t.jsx("input",{type:"text",ref:u,onChange:p,placeholder:"search by country or state or area name",className:"bg-white hover:border-2 hover:border-black  w-[90vw] md:w-[70vw] lg:w-[55vw] rounded-2xl text-sm md:text-lg lg:text-xl outline-none focus:border-2 focus:border-black text-black py-3 px-4"}),t.jsx("button",{onClick:f,className:"text-black bg-[#FEA47F] text-xl border-2 border-black hover:border-[#FEA47F]  px-4 py-3 rounded-2xl cursor-pointer hover:bg-slate-950 hover:text-white font-semibold transition-colors",children:"Search"})]}),t.jsx("div",{className:" w-full h-auto text-black py-4 mt-20  ",children:x?t.jsx("div",{className:"text-black text-xl font-semibold text-center",children:"Loading Rooms data...."}):t.jsx("div",{children:n===null?t.jsx(h,{path:"/mess"}):t.jsx("div",{className:" flex md:flex-row flex-col flex-wrap  items-center justify-evenly gap-6",children:n.length===0?t.jsx("div",{className:"text-black text-xl font-semibold",children:"No such Rooms available"}):n.map(s=>t.jsx(g,{data:s},s._id))})})})]})})}export{k as default};
