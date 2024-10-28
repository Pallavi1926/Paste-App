import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../Reducer/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';

const ViewPaste = () => {

  

  const {id} = useParams();

  const allPaste = useSelector((state) => state.paste.pastes);

  const paste = allPaste.filter((p) => p._id === id)[0];


  return (
    <div className='text-black min-h-screen min-w-screen px-10 pb-10 pt-3'>
      <div className='flex flex-row gap-2 justify-between w-full'>
      <input 
      type="text" 
      placeholder='Title'
      className='bg-tranparent border pl-2 p-1.5 w-full rounded-lg outline-none '
      value={paste.title}
      disabled
      />
      
      </div>
      
      <div className='bg-white border min-h-screen w-full mt-3 p-1 rounded-sm'>
      <div className='flex flex-row gap-1 p-1.5'>
        <div className='h-4 w-4 rounded-full bg-pink-400'></div>
        <div className='h-4 w-4 rounded-full bg-yellow-200'></div>
        <div className='h-4 w-4 rounded-full bg-green-500'></div>
      </div>
      <div>
      <textarea 
      className='bg-white w-full border mt-1.5 resize-none outline-none p-2' 
      placeholder='1 Write Your Content Here....' 
      rows={28}
      value={paste.content}
      disabled
      >
      </textarea>
      </div>
      </div>
    </div>
  )
}

export default ViewPaste

