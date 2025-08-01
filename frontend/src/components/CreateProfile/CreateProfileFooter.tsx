import React from 'react'

interface Props{
    onClose:() => void
}

const CreateProfileFooter:React.FC<Props> = ({onClose}) => {
  return (
    <button
        onClick={onClose}
        className="absolute top-4 right-5 text-2xl text-gray-600 hover:text-black"
    >
        ✕
    </button>
  )
}

export default CreateProfileFooter