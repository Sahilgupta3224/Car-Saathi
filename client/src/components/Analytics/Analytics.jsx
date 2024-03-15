import React from 'react'

function Analytics() {
    return (
        <>
            <div className='w-full bg-yellow-200 py-auto px-4' style={{ height: '80vh' }}>
                <div className='max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center'>
                    <img src="https://i.pinimg.com/564x/0e/e8/33/0ee83305fc7d2b3c8015cfb21d61639b.jpg" alt="/" className='w-[70%] h-[80%] mx-auto my-4 rounded-md' />
                    <div className='text-center md:text-left'>
                        <p className='text-[#00df9a] font-bold font-serif'>Lorem ipsum dolor sit.</p>
                        <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 font-serif'>Manage Data Analytics</h1>
                        <p className='text-justify pr-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugit fugiat sit quia voluptatibus corrupti itaque repellat eligendi. Quibusdam numquam esse minus ducimus corporis nulla repellendus vitae perspiciatis itaque aperiam!</p>
                        <button className='font-mono mt-3 bg-[#00df9a] hover:bg-[#407b69] w-[200px] font-medium text-black border-1 rounded-md mx-auto my-10 py-3 md:mx-0'>Find a Ride</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Analytics