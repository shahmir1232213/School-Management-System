import React from 'react';
import { adminLinks } from '../data/list';
import { Link } from 'react-router-dom';

const SideBar: React.FC = () => {
  return (
    <div className=" p-4 h-screen bg-[#055266] text-white h-full" style={{ width: '15vw' }}>
    <img
      className="ml-6 rounded-full border-2 border-white w-28 h-32"
      src="/images/logo.jpg"
      alt="Logo"
    />
      <nav className='mt-24'>
        {
          adminLinks.map((obj,index)=>{
            return(
              <>
               <p className='mb-1'>{obj.title}</p>
                {obj.links.map((link,index2)=>{
                  return(
                  <Link to={link.path}>
                    <div key={link.name} className="p-3 hover:bg-[#2695a9]  font-bold">
                      {link.icon && <link.icon className="inline-block mr-2 text-lg" />}
                      {link.name}
                    </div>
                  </Link>
                  )
                })}
              </>
            )
          })
        }
      </nav>
      <button onClick={()=>{}}></button>
    </div>
  );
};

export default SideBar;
