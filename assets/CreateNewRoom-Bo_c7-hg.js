import{r as l,u as Le,j as e,X as De,b as o}from"./index-CvtE0vql.js";import{a as S}from"./index-t--hEgTQ.js";import{I as Fe}from"./indian-rupee-B6B6Ra3S.js";import"./react-DJG_os-6.js";import"./swiper-B7pBPPGb.js";function Ge(){const xe="ritam-backend",me="LetsGO",fe="https://api.cloudinary.com/v1_1/ritam-backend/image/upload",pe="https://letsgo-be.onrender.com",[O,he]=l.useState(!1),[k,ge]=l.useState(!1),[E,we]=l.useState(!1),[I,be]=l.useState(!1),[ye,u]=l.useState(!1),[A,ve]=l.useState([]),[B,je]=l.useState([]),C=Le(),x=l.useRef(null),m=l.useRef(null),f=l.useRef(null),p=l.useRef(null),h=l.useRef(null),g=l.useRef(null),d=l.useRef(null),w=l.useRef(null),b=l.useRef(null),y=l.useRef(null),v=l.useRef(null);function Ne(){he(t=>!t)}function Re(){ge(t=>!t)}function ke(){be(t=>!t)}function Se(){we(t=>!t)}function Oe(t){if(t.target.files){const r=Array.from(t.target.files);ve(n=>[...n,...r]);const j=r.map(n=>URL.createObjectURL(n));je(n=>[...n,...j])}}function P(){const t=localStorage.getItem("activeLink");C(!t||t==="/"?"/":`/${t}`)}async function Ee(){var j,n,T,U,$,L,D,F,K,_,H,W,M,G,X,q,z,J,Q,V,Y,Z,ee,te,le,se,re,ae,oe,ne,ce,ie,de,ue;const t=A.map(i=>{const s=new FormData;return s.append("file",i),s.append("upload_preset",`${me}`),s.append("cloud_name",`${xe}`),s});u(!0);const r=[];try{for(const i of t){const s=await S.post(`${fe}`,i);console.log("Response:",s),console.log("Uploaded Image URL:",s.data.secure_url),r.push(s.data.secure_url)}console.log("All Uploaded Image URLs:",r),console.log("is ac : ",k)}catch(i){u(!1),console.log("Error:",i),o.fire({icon:"error",title:"Oops...",text:"Error while uploading images, Please try again later...",confirmButtonText:"Ok"});return}if(((j=x.current)==null?void 0:j.value)===void 0||x.current.value==="")(n=x.current)==null||n.focus();else if(((T=m.current)==null?void 0:T.value)===void 0||m.current.value==="")(U=m.current)==null||U.focus();else if((($=h.current)==null?void 0:$.value)===void 0||h.current.value==="")(L=h.current)==null||L.focus();else if(((D=p.current)==null?void 0:D.value)===void 0||p.current.value==="")(F=p.current)==null||F.focus();else if(((K=y.current)==null?void 0:K.value)===void 0||y.current.value==="")(_=y.current)==null||_.focus();else if(((H=v.current)==null?void 0:H.value)===void 0||v.current.value==="")(W=v.current)==null||W.focus();else if(((M=w.current)==null?void 0:M.value)===void 0||w.current.value==="")(G=w.current)==null||G.focus();else if(((X=b.current)==null?void 0:X.value)===void 0||b.current.value==="")(q=b.current)==null||q.focus();else if(((z=g.current)==null?void 0:z.value)===void 0||g.current.value==="")(J=g.current)==null||J.focus();else if(((Q=f.current)==null?void 0:Q.value)===void 0||f.current.value==="")(V=f.current)==null||V.focus();else if(((Y=d.current)==null?void 0:Y.value)===void 0||d.current.value==="")(Z=d.current)==null||Z.focus();else if(!A)o.fire({icon:"error",title:"Oops...",text:"Please upload an image...",confirmButtonText:"Ok"});else{const i=(ee=x.current)==null?void 0:ee.value,s=(te=m.current)==null?void 0:te.value,Ie=(le=f.current)==null?void 0:le.value,Ae=(se=p.current)==null?void 0:se.value,Be=(re=h.current)==null?void 0:re.value,Ce=(ae=g.current)==null?void 0:ae.value;let c=(oe=d.current)==null?void 0:oe.value;const Pe=(ne=w.current)==null?void 0:ne.value,Te=(ce=b.current)==null?void 0:ce.value,Ue=(ie=y.current)==null?void 0:ie.value,$e=(de=v.current)==null?void 0:de.value;c=c.charAt(0).toUpperCase()+c.slice(1).toLowerCase(),c!=="Apartment"&&c!=="Pg"&&c!=="Mess"&&c!=="Hostel"&&(o.fire({icon:"warning",title:"Oops...",text:"type should be either Apartment or Pg or Mess or Hostel...",confirmButtonText:"Ok"}),(ue=d.current)==null||ue.focus());try{let N;try{N=await S.post(`${pe}/api/v1/room/newroom`,{email:i,houseName:s,description:Ie,address:Ae,price:Be,country:Ce,type:c,city:Pe,state:Te,area:Ue,pincode:$e,images:r,isAc:k,isKitchen:O,isSingleBed:I,isWifi:E},{headers:{sellerToken:localStorage.getItem("sellerToken")}})}catch(a){if(u(R=>!R),S.isAxiosError(a)&&a.response){const R=a.response.status;R===401?(o.fire({icon:"error",title:"Oops...",text:"Become a seller to add rooms....",confirmButtonText:"Ok"}),console.log("Become a seller to add rooms.")):R===404?(o.fire({icon:"error",title:"Oops...",text:"Seller not found....",confirmButtonText:"Ok"}),console.log("Become a seller to add rooms.")):(o.fire({icon:"error",title:"Oops...",text:"Failed to create room. Please try again later.....",confirmButtonText:"Ok"}),console.log("Failed to create room. Please try again later.")),console.error("Error response: ",a.response.data)}else o.fire({icon:"error",title:"Oops...",text:"Something went wrong. Please try again later.....",confirmButtonText:"Ok"}),console.error("Unexpected error: ",a);return}console.log(N.data),u(a=>!a),o.fire({title:"sucess",text:"Room created Sucessfully...",icon:"success",timer:3e3,confirmButtonText:"OK"}),P()}catch(N){o.fire({icon:"error",title:"Oops...",text:"Something went wrong. Please try again later.....",confirmButtonText:"Ok"}),u(a=>!a),console.log("error is : "+N)}}}return e.jsx(e.Fragment,{children:e.jsx("div",{className:"bg-[#fab1a0] flex items-center justify-center w-full h-auto px-4 md:px-6 lg:px-8 py-15",children:e.jsxs("div",{className:"text-black relative  w-full flex flex-col items-center justify-center",children:[e.jsx(De,{className:"absolute right-3 -top-5 hover:border-2 hover:border-gray-200 hover:rounded-md cursor-pointer",onClick:P}),e.jsx("h2",{className:"text-4xl text-black  font-bold  text-center  ",children:"Add New Room"}),e.jsxs("div",{className:"flex flex-col items-start w-full   text-black text-lg font-medium gap-6",children:[e.jsxs("div",{className:"flex items-start justify-between flex-col md:flex-row w-full mt-20 lg:px-4",children:[e.jsxs("div",{className:"flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ",children:[e.jsxs("p",{children:["Email Id : ",e.jsx("span",{className:"text-red-400 ml-2 text-xl",children:"*"})]}),e.jsx("input",{type:"text",ref:x,placeholder:"Enter your Email Id",className:"border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400"})]}),e.jsxs("div",{className:"flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ",children:[e.jsxs("p",{children:["House name : ",e.jsx("span",{className:"text-red-400 ml-2 text-xl",children:"*"})]}),e.jsx("input",{type:"text",ref:m,placeholder:"Enter house name",className:"border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400"})]}),e.jsxs("div",{className:"relative flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ",children:[e.jsxs("p",{children:["Price: ",e.jsx("span",{className:"text-red-400 ml-2 text-xl",children:"*"})," ",e.jsx("span",{className:"text-sm absolute left-1 bottom-2 text-white",children:e.jsx(Fe,{})})]}),e.jsx("input",{type:"text",ref:h,placeholder:"Enter house price in INR",className:"border-2 border-gray-400 px-7  py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400"})]})]}),e.jsxs("div",{className:"flex items-start justify-between flex-col md:flex-row w-full mt-6 lg:px-4",children:[e.jsxs("div",{className:"flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ",children:[e.jsxs("p",{children:["Address : ",e.jsx("span",{className:"text-red-400 ml-2 text-xl",children:"*"})]}),e.jsx("input",{type:"text",ref:p,placeholder:"Enter house address",className:"border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400"})]}),e.jsxs("div",{className:"flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ",children:[e.jsxs("p",{children:["Area : ",e.jsx("span",{className:"text-red-400 ml-2 text-xl",children:"*"})]}),e.jsx("input",{type:"text",ref:y,placeholder:"Enter area",className:"border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400"})]}),e.jsxs("div",{className:"relative flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ",children:[e.jsxs("p",{children:["Pincode : ",e.jsx("span",{className:"text-red-400 ml-2 text-xl",children:"*"})]}),e.jsx("input",{type:"text",ref:v,placeholder:"Enter pincode",className:"border-2 border-gray-400 px-7  py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400"})]})]}),e.jsxs("div",{className:"flex items-start justify-between flex-col md:flex-row w-full mt-6 lg:px-4",children:[e.jsxs("div",{className:"flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ",children:[e.jsxs("p",{children:["City : ",e.jsx("span",{className:"text-red-400 ml-2 text-xl",children:"*"})]}),e.jsx("input",{type:"text",ref:w,placeholder:"Enter city name",className:"border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400"})]}),e.jsxs("div",{className:"flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ",children:[e.jsxs("p",{children:["State : ",e.jsx("span",{className:"text-red-400 ml-2 text-xl",children:"*"})]}),e.jsx("input",{type:"text",ref:b,placeholder:"Enter state name",className:"border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400"})]}),e.jsxs("div",{className:"relative flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ",children:[e.jsxs("p",{children:["Country : ",e.jsx("span",{className:"text-red-400 ml-2 text-xl",children:"*"})]}),e.jsx("input",{type:"text",ref:g,placeholder:"Enter Country name",className:"border-2 border-gray-400 px-7  py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400"})]})]}),e.jsxs("div",{className:"flex items-start justify-between   w-full mt-6 lg:px-4",children:[e.jsx("div",{className:"flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ",children:e.jsxs("label",{className:`text-lg md:text-xl lg:text-2xl ${I?"text-black":"line-through text-slate-800"} `,children:[e.jsx("input",{type:"checkbox",onChange:ke,id:"1",className:"w-4 md:w-5 lg:w-6  h-4 md:h-5 lg:h-6  accent-blue-500 cursor-pointer mr-3"}),"Single Bed"]})}),e.jsx("div",{className:"flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ",children:e.jsxs("label",{className:`text-lg md:text-xl lg:text-2xl ${E?"text-black":"line-through text-slate-800"} `,children:[e.jsx("input",{type:"checkbox",onChange:Se,id:"2",className:"w-4 md:w-5 lg:w-6  h-4 md:h-5 lg:h-6  accent-blue-500 cursor-pointer mr-3"}),"Wi-Fi available"]})}),e.jsx("div",{className:"flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ",children:e.jsxs("label",{className:`text-lg md:text-xl lg:text-2xl ${k?"text-black":"line-through text-slate-800"} `,children:[e.jsx("input",{type:"checkbox",onChange:Re,id:"3",className:"w-4 md:w-5 lg:w-6  h-4 md:h-5 lg:h-6  accent-blue-500 cursor-pointer mr-3"}),"AC available"]})}),e.jsx("div",{className:"flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ",children:e.jsxs("label",{className:`text-lg md:text-xl lg:text-2xl ${O?"text-black":"line-through text-slate-800"} `,children:[e.jsx("input",{type:"checkbox",onChange:Ne,id:"4",className:"w-4 md:w-5 lg:w-6  h-4 md:h-5 lg:h-6  accent-blue-500 cursor-pointer mr-3"}),"Kitchen available"]})})]}),e.jsxs("div",{className:"w-full mt-6 flex flex-col items-start gap-4",children:[e.jsxs("p",{children:["Description :",e.jsx("span",{className:"text-red-400 ml-2 text-xl",children:"*"})]}),e.jsx("textarea",{ref:f,placeholder:"Description",className:"border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full  shadow-md shadow-gray-400"})]}),e.jsxs("div",{className:"w-full mt-6 flex flex-col items-start gap-4",children:[e.jsxs("p",{children:["Type :",e.jsx("span",{className:"text-red-400 ml-2 text-xl",children:"*"})]}),e.jsx("input",{type:"text",ref:d,placeholder:"Mess or Hostel or PG or Apartment",className:"border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-white w-full md:w-1/2 lg:w-1/3 shadow-md shadow-gray-400"})]}),e.jsxs("div",{className:"w-full",children:[e.jsxs("p",{children:["Upload some Images : ",e.jsx("span",{className:"text-red-400 ml-2 text-xl",children:"*"})]}),B&&e.jsx("div",{className:"flex items-start flex-wrap gap-1  w-auto",children:B.map((t,r)=>e.jsx("img",{src:t,alt:`Preview ${r}`,className:"max-w-[100px]  my-[5px] rounded-xl "},r))}),e.jsx("input",{type:"file",multiple:!0,accept:"images/*",onChange:Oe,className:"rounded-xl  shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4  cursor-pointer"})]}),e.jsx("div",{className:"w-full flex items-center justify-center",children:e.jsx("button",{onClick:Ee,className:"bg-black hover:bg-slate-900 text-white px-10 md:px-20 lg:px-30 py-1 text-xl font-semibold transition-all hover:scale-105 cursor-pointer rounded-xl shad",children:ye?"Submiting...":"Submit"})})]})]})})})}export{Ge as default};
