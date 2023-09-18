import {UserCircleIcon} from "@heroicons/react/20/solid";

type Props = {
    loading: boolean,
    suggestion: string
}
export const GPT = ({ loading, suggestion }: Props) => {
    return (
        <div className="flex items-center justify-center px-5 md:py-5 max-w-4xl">
            <p className="flex items-center p-5 text-sm font-light
                shadow-xl rounded-xl w-fit bg-white italic max-w-3xltext-[#0055D1]">
                <UserCircleIcon className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${loading && "animate-pulse"}`} />
                {suggestion && !loading
                    ? suggestion
                    : "GPT is summarising your tasks for the day..."}
            </p>
        </div>
    );
};
