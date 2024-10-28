import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../Reducer/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  // To get an id
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  //to get all paste
  const allPastes = useSelector((state) => state.paste.pastes);

  //whereEver my paste id change 
  //it is used to upload title and content in home page for updation
  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((p) => p._id === pasteId)
      setTitle(paste.title)
      setDetail(paste.content)
    }

  },[pasteId])

  function createPaste() {
  const paste = {
    title: title,
    content: detail,
    _id: pasteId || Date.now().toString(36),
    createdAt: new Date().toISOString(),
  }

  if(pasteId){
    //update
    dispatch(updateToPastes(paste));
  }
  else{
    //create
    dispatch(addToPastes(paste));
  }
  
  

  //after creation or updation
  setTitle('');
  setDetail('');
  setSearchParams({});


  }

  return (
    <div className='text-black min-h-screen min-w-screen px-10 pb-10 pt-3'>
      <div className='flex flex-row gap-2 justify-between w-full'>
      <input 
      type="text" 
      placeholder='Title'
      className='bg-tranparent border pl-2 p-1.5 w-full rounded-lg outline-none '
      value={title}
      onChange={(e) => {setTitle(e.target.value)}}
      />
      <button 
      onClick={createPaste}
      className='bg-blue-500 hover:bg-blue-400 h-9 w-32 rounded-lg text-white hover:text-blue-950 tracking-tighter'
      >
      {pasteId ? "Update My Paste" : "Create My Paste"}
      </button>
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
      value={detail}
      onChange={(e) => {setDetail(e.target.value)}}
      >
      </textarea>
      </div>
      </div>
    </div>
  )
}

export default Home