function Loader() {
    return <div className="flex justify-center items-center gap-4 h-screen w-full bg-[#fab1a0]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-l-2 border-black"></div>
        <p className="text-2xl font-semibold animate-pulse">Loading...</p>
  </div>
  
}


export default Loader;