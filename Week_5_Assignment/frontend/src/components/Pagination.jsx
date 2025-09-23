
const Pagination = ({page,setPage}) => {
  
  const pagePrev=()=>{
    setPage(prev=>prev>1 ? prev-1 :1)
  }
  const pageNext=()=>{
    setPage(prev=>prev+1)
  }
  return (
    <div className='flex justify-center mt-5'>
    <div className='flex'>
        <button className='hover:bg-gray-200 px-2 rounded' onClick={pagePrev}>&lt;</button>
        <input value={page} type="number" className='w-12 text-center bg-gray-300 rounded-sm mx-2'></input>
        <button className='hover:bg-gray-200 px-2 rounded' onClick={pageNext}>&gt;</button>
    </div>
    </div>
  )
}

export default Pagination