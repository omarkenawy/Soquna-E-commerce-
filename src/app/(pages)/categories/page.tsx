
import Image from "next/image"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import Link from "next/link";






export default async function Categories() {

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
    const { data: categories }: { data: CategoryI[] } = await response.json();

    return <>
        <h1 className="font-bolder text-3xl m-3">Shop by Category</h1>
        <div className="flex flex-wrap mx-auto">
            {categories.map((cat) =>
                <div className="div p-5 cursor-pointer" key={cat._id}>
                    <Link href={'/categories/' + cat._id}>
                        <Card className="hover:scale-120 hover:duration-500 ">
                            <CardContent>
                                <Image alt="image" src={cat.image} width={200} height={200} ></Image>
                            </CardContent>
                            <p className="text-center border-t-2 pt-4 border-t-gray-400 text-xl">{cat.name}</p>
                        </Card>
                    </Link>
                </div>
            )}
        </div>



    </>
}
