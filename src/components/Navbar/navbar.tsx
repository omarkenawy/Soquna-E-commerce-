"use client"
import React, { useContext } from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, Loader2, ShoppingCartIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { CartContext } from '../context/cartContext'
import { WishListContext } from '../context/wishListContext'
import { signOut, useSession } from 'next-auth/react'


export default function Navbar() {



    let session = useSession();
    console.log("sesion" + session);



    let { useCart, isLoading } = useContext(CartContext);
    let { isListed, wishList } = useContext(WishListContext);
    console.log("www" + wishList?.status);

    return <>

        <div className='bg-blue-800 text-white shadow font-bold sticky top-0 z-50 '>
            <nav className=' container mx-auto py-3'>
                <div className="flex justify-between items-center">
                    <div className="img">
                        <i className="fa-solid fa-cart-shopping text-2xl pe-7"></i>
                        <Link className='text-3xl' href={'/'}>SOQUNA</Link>
                    </div>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/products">Products</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/categories">Categories</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/brands">Brands</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>


                    <div className='flex'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <i className="fa-solid fa-user cursor-pointer text-xl text-white"></i>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                {session.status == "authenticated" ? <>

                                    <Link href={'/profile'}>
                                        <DropdownMenuItem>
                                            Profile
                                        </DropdownMenuItem></Link>
                                    <DropdownMenuItem>
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={() => signOut({
                                        callbackUrl: '/'
                                    })}>
                                        Log out
                                    </DropdownMenuItem>
                                </> :
                                    <>
                                        <DropdownMenuGroup>

                                            <Link href={'/login'}>
                                                <DropdownMenuItem>
                                                    Login
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={'/register'}>
                                                <DropdownMenuItem>
                                                    Register
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuGroup>
                                    </>
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {session.status == "authenticated" &&
                            <>
                                <div className="cart ps-3 relative cursor-pointer">
                                    <Link href={'/cart'}>
                                        <ShoppingCartIcon>
                                        </ShoppingCartIcon>
                                    </Link>
                                    <Badge className="h-5 min-w-5 rounded-full px-1 py-1 font-mono tabular-nums absolute text-white -top-4 -right-4">
                                        {isLoading ? <Loader2 className='animate-spin'></Loader2> :
                                            <p className=' text-xs'>{useCart?.numOfCartItems}</p>
                                        }
                                    </Badge>
                                </div>
                                <div className="wish relative cursor-pointer ps-5">
                                    <Link href={'/wishList'}>
                                        <Heart></Heart>
                                    </Link>
                                    <Badge className="h-5 min-w-5 rounded-full px-1 py-1 font-mono tabular-nums absolute text-white -top-4 -right-4">
                                        {isListed ? <Loader2 className='animate-spin'></Loader2> :
                                            <p className=' text-red-500 text-xs'>{wishList?.count}</p>
                                        }
                                    </Badge>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </nav>

        </div>

    </>
}
