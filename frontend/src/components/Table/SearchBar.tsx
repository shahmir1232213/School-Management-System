import React from 'react'

interface Prop{
  character:string
}

const SearchBar:React.FC<Prop> = ({character}) => {
  return (
    <div className='flex items-center w-[100%]  h-[8vh] '>
         <div className='border-2 w-32 h-[70%]  pl-3 pt-2'>Add Filter</div>
        <input className='border-2 h-[70%]  w-[100%] pl-16 ' type='text' placeholder={`Search for a ${character} by ${character} ID`}/>
    </div>
  )
}

export default SearchBar