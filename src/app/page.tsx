import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return <>
    <div className="text-center pt-7 h-screen pt-20">
      <h1 className="font-bold text-6xl">Welcome to SOQUNA</h1>
      <p className="pt-3 text-2xl text-blue-700">Your Online Shopping Destination</p>
      <p className="pt-3 text-2xl ">From fashion to electronics, discover everything you need at unbeatable prices. Shop smarter, faster, and easier with Soquna.</p>
      <div className="flex justify-center mt-4 gap-3">
        <Link href={'/login'}><Button className="px-12 py-8 hover:bg-blue-700 hover:text-black hover:border">Login</Button></Link>
        <Button className="px-12 py-8 bg-blue-700 text-black border hover:text-black hover:bg-white">Sign Up</Button>
      </div>
    </div>
  </>
}
