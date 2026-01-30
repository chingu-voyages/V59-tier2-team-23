import { useState, type JSX } from 'react';

type Props = {
    className?: string,
    label: String,
    layout?: "combined" | "seperate",// combined as in the button being visually connected to the children
    children: JSX.Element
} & React.HTMLAttributes<HTMLDivElement>

export default function Expandable({ className = '', children, layout = "combined", label, ...props }: Props): JSX.Element {
    const [expand, setExpand] = useState<boolean>(false);
    const handleExpand = () => {
        setExpand((e) => !e)
    }
    return (
        <div className={`  w-full`} {...props}>
            <button onClick={() => handleExpand()} className={` ${className} p-[0.8rem] h-[3.25rem] w-full items-center flex justify-between leading-none`} >
                <h2 className="text-[1.25rem]">{label}</h2>
                <span className={` ${!expand && "rotate-270"}  aspect-square h-[1.2rem] bg-[url(/src/assets/icons/triangle.svg)] bg-center bg-contain bg-no-repeat `} />
            </button>
            {expand &&
                <div className={`${layout == "seperate" && "mt-[0.25rem]"} ${layout == "combined" && "p-[0.25rem]"} ${className}`}>
                    {children}
                </div>
            }
        </div>
    );
}