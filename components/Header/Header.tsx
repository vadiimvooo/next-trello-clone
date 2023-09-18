'use client'

import Image from "next/image";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import Avatar from "react-avatar";
import {GPT} from "@/components/GPT";
import {useBoardStore} from "@/store/BoardStore";
import {useEffect, useState} from "react";
import fetchSuggestion from "../../lib/fetchSuggestion";
import toastr from "toastr";

export const Header = () => {
    const [board, searchString, setSearchString] = useBoardStore((state) => [
        state.board,
        state.searchString,
        state.setSearchString
    ]);
    const [loading, setLoading] = useState<boolean>(false);
    const [suggestion, setSuggestion] = useState<string>("");

    useEffect(() => {
        if (board.columns.size === 0) return;
        setLoading(true);

        const fetchSuggestionFunc = async () => {
            try {
                const suggestion = await fetchSuggestion(board);
                setSuggestion(suggestion);
                setLoading(false);
            } catch (error) {
                const typedError = error as Error
                toastr.error(typedError.message, "Fetching error", {
                    closeButton: true,
                    progressBar: true,
                    timeOut: 3000,
                    positionClass: "toast-top-right",
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut",
                });
            }
        }


        fetchSuggestionFunc();
    }, [board])

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
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 outline-none"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                        <button type="submit" hidden>Search</button>
                    </form>


                    <Avatar name="Elon Mask" size="50" round color="#0055d1"/>
                </div>
            </div>

            <div className="p-2 flex justify-center">
                <GPT loading={loading} suggestion={suggestion}/>
            </div>
        </header>
    );
};
