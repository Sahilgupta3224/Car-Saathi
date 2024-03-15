import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

function Footer (){
  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Car-Saathi.Com</h1>
        <p className='py-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit ullam iste repellat consequatur libero reiciendis, blanditiis accusantium.</p>
        <div className='flex justify-between md:w-[75%] my-6'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
            <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-around mt-6'>
    <div>
        <h6 className='font-medium text-zinc-800'>About</h6>
        <ul>
            <li className='py-2 text-sm'>How it Works ?</li>
            <li className='py-2 text-sm'>About Us</li>
            <li className='py-2 text-sm'>Help Center</li>
            <li className='py-2 text-sm'>We are Hiring!</li>
        </ul>
    </div>
    <div>
        <h6 className='font-medium text-zinc-800'>Developers</h6>
        <ul>
            <li className='py-2 text-sm'>Kritarth Shrivastava</li>
            <li className='py-2 text-sm'>Sahil Gupta</li>
            <li className='py-2 text-sm'>Khanak Patwari</li>
            <li className='py-2 text-sm'>Rudra Sharma</li>
        </ul>
    </div>
      </div>
    </div>
  );
};

export default Footer;