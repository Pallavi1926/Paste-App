import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { removeFromPastes, updateToPastes } from '../Reducer/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineFileUpload, MdContentCopy } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";
import { FormatDate } from "../utlis/formatDate";




const Paste = () => {
  // value of searchBar
  const [searchTerm, setSearchTerm] = useState('');

  //to fetch all pastes
  const pastes = useSelector((state) => state.paste.pastes);
  //to get function from reducer
  const dispatch = useDispatch();

  // to filter according to searchBar data
  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleEdit(paste) {
    dispatch(updateToPastes(paste))
  }



  return (
    <div className='min-h-screen text-black bg-white pl-10 pr-10 pb-10 pt-3'>
      
      <input
      className='bg-tranparent border pl-2 p-1.5 mt-5 w-full rounded-md outline-none'
      type='search'
      placeholder='Search paste here...'
      value={searchTerm}
      onChange={(e) => {setSearchTerm(e.target.value)}}
      />
      
      <div className='border mt-3 rounded-md'>
        <div className='p-2 font-bold text-2xl'>
          All Pastes
        </div>
      <div className='p-2 border flex flex-col gap-4'>
      {
        filteredData.length > 0 &&
        filteredData.map(
          (paste) => {
            return(
              <div className='border rounded-md flex flex-row justify-between p-3 h-[130px] overflow-hidden'> 
                <div className='flex flex-col gap-2 p-0.5'>
                <div className='font-bold text-xl'>
                {paste.title}
                </div>
                <div className='text-gray-600 w-[800px]'>
                {paste.content}
                </div>
                </div>
                <div className='flex flex-col gap-4 p-2'>
                <div className='flex flex-row gap-2 justify-evenly'>
                <button 
                className='h-[26px] w-[26px] rounded-sm border border-gray-300 shadow flex justify-center items-center'>
                  <NavLink
                  to={`/?pasteId=${paste?._id}`}
                  >
                   <AiTwotoneEdit/>
                  </NavLink>
                 
                </button>
                <button
                onClick={() => handleDelete(paste?._id)} 
                className='h-[26px] w-[26px] rounded-sm border border-gray-300 shadow flex justify-center items-center'
                >
                <RiDeleteBin6Line/>
                </button>
               
                <button
                className='h-[26px] w-[26px] rounded-sm border border-gray-300 shadow flex justify-center items-center'
                >
                  <NavLink
                  to={`/pastes/${paste?._id}`}
                  >
                  <GrView/>
                  </NavLink>
                  
                </button>
                <button onClick={() => {
                  navigator.clipboard.writeText(paste?.content)
                  toast.success("Copied to Clipboard")
                }}
                className='h-[26px] w-[26px] rounded-sm border border-gray-300 shadow flex justify-center items-center'
                >
                  <MdContentCopy />
                </button>
                </div>
                <div className='flex flex-row gap-1 justify-center items-center'>
                  <CiCalendarDate/>
                  {FormatDate(paste?.createdAt)}
                </div>
                 </div> 
                </div>
                
              
            )
          }
        )
      }
      </div>
      </div>
      
    </div>
  )
}

export default Paste