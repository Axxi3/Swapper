import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'

const token = localStorage.getItem('token');

let updatedMenuItems = [
  {
    name: 'Wishlist',
    href: '/wishlist',
  },
];

if (!token) {
  updatedMenuItems.push(
    {
      name: 'Sign in',
      href: '/sign-in',
    },
    {
      name: 'Sign up',
      href: '/sign-up',
    }
  );
} else {
  updatedMenuItems.push(
    {
      name: 'Profile',
      href: '/profile',
    },
    {
      name: 'Chats',
      href: '/chats',
    }
  );
}

const menuItems = updatedMenuItems;

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
    }
  return (
 
    <nav className="z-50 sticky">
        <div className="w-full bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <Link
            to={"/"}>
            <div className="inline-flex items-center space-x-2">
             
              <span className="font-bold text-2xl">Book<span className='text-[#987284]'>Swap</span></span>
            </div>
            </Link>
            <div className="hidden lg:block">
              <ul className="ml-12 inline-flex space-x-8">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                    >
                      {item.name}
                    
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex grow justify-end">
              <input
                className="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Serach"
              ></input>
            </div>
          
            <div className="ml-2 lg:hidden">
              <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
            </div>
            {isMenuOpen && (
              <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-5 pb-6 pt-5">
                    <div className="flex items-center justify-end">
                     
                      <div className="-mr-2">
                        <button
                          type="button"
                          onClick={toggleMenu}
                          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          <span className="sr-only">Close menu</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid gap-y-4">
                        {menuItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                          >
                            <span className="ml-3 text-base font-medium text-gray-900">
                              {item.name}
                            </span>
                            <span>
                              <ChevronRight className="ml-3 h-4 w-4" />
                            </span>
                          </a>
                        ))}
                      </nav>
                    </div>
                  
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
       
      </nav>
  
  );
}
