import React from 'react'
import Avatar from '@mui/material/Avatar';


const Profile = () => {
  return (
    <div>
        <div className="flex flex-col">
            <div className='flex items-center justify-around py-8 px-8 border-2'>
            <div>
                <div>
                Username
                </div>
                <div>
                Rating
                </div>
            </div>
            <Avatar src="/broken-image.jpg" sx={{width:"200px",height:"200px"}}/> 
            
            </div>
            <div className='justify-center flex'>------------------------------------------------------------------------------------------------------------------------------</div>
        <div className='mx-64 p-4'>
            About
        </div>
        <div className='justify-center flex'>------------------------------------------------------------------------------------------------------------------------------</div>

        <div className='mx-64 p-4'>
            Reviews
        </div>
    </div>
       
    </div>
  )
}

export default Profile