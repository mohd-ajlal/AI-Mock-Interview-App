"use client";
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Reac, { useEffect } from 'react'

function Header() {

  const path = usePathname();
  const menuItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'How It Works?', href: '/dashboard/how' },
    { name: 'Contact Us', href: '/dashboard/contactus' },
  ];

  useEffect(()=>{
    
  },[])

  return ( 
    <div className='flex p-4 items-center justify-between shadow-md bg-gray-100 text-black'>
      <Image 
        src={'/logo.svg'}
        alt="Logo"
        width={50}
        height={50}
      />
      <ul className="hidden md:flex gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.name} // Add a unique key prop
            href={item.href}
            // onClick={() => console.log('Clicked')}
          >
            <li
              key={item.name} // Add a unique key prop
              className={`px-4 py-2 transition-colors duration-300 rounded-lg cursor-pointer 
                ${path === item.href ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 hover:text-white'}`}
            >
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header 