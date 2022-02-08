import { Menu, Transition } from '@headlessui/react'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthProvider } from '../../api/AuthProvider'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function DropDownMenu() {
    const navigate = useNavigate()
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="bg-transparent">
                    <img src={AuthProvider.getUser().avatarURL} className="aspect-square object-cover w-12 rounded-full" alt="profile" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            <span className='text-gray-900 block px-4 py-2 text-sm'>
                                {`Signed in as\n ${AuthProvider.getUser().email}`}
                            </span>
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Account settings
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="button"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full text-left px-4 py-2 text-sm'
                                    )}
                                    onClick={() => {
                                        AuthProvider.logout().then(() => {
                                            navigate("/login")
                                        })
                                    }}
                                >
                                    Sign out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export const NavBar = () => {
    let location = useLocation()
    return (
        <nav className='p-2 w-full flex flex-row justify-between bg-orange-500 text-white items-center'>
            <Link to="/"> <h1 className='text-4xl'>የእናት ጓዳ</h1></Link>
            <div className="flex items-center gap-4">
                {location.pathname === "/cart" ? "" : <Link to="/cart" className="flex flex-row gap-1 p-1 border rounded text-lg items-center">
                    My Cart
                    <ShoppingCartIcon className='w-5 h-5' />
                </Link>}

                <DropDownMenu />
            </div>
        </nav>)
}