'use client'

import Image from "next/image";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import Avatar from "react-avatar";
import {GPT} from "@/components/GPT";

export const Header = () => {
    return (
        <header>
            <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10">
                <div
                    className="
                        absolute top-0 left-0 w-full h-96 bg-gradient-to-br
                        from-pink-100 to-[#0055D1] rounded-md filter blur-3xl
                        opacity-50 -z-50
                    "
                />

                <Image
                    src="https://links.papareact.com/c2cdd5"
                    alt="Trello logo"
                    width={300}
                    height={100}
                    className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
                />

                <div className="flex items-center space-x-5 flex-1 justify-end w-full">
                    <form
                        className="
                            flex items-center space-x-5 bg-white rounded-md
                            p-2 shadow-md flex-1 md:flex-initial
                        "
                    >
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                        <input type="text" placeholder="Search" className="flex-1 outline-none"/>
                        <button type="submit" hidden>Search</button>
                    </form>


                    <Avatar name="Elon Mask" size="50" round color="#0055d1"/>
                </div>
            </div>

            <div className="p-2">
                <GPT/>
            </div>
        </header>
    );
};
