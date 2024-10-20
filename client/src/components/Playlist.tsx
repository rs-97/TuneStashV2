import { useContext } from "react"
import { AccentContext } from "../Contexts"

const Title = () => {
    return (
        <tbody>
            <tr className="flex h-8 items-center justify-evenly text-sm text-white/75 border-b border-white/10">
                <th className="w-8 overflow-hidden text-ellipsis whitespace-nowrap ">

                </th>
                <td className="w-[35%] overflow-hidden text-ellipsis whitespace-nowrap">
                    Title
                </td>
                <td className="w-[20%] overflow-hidden text-ellipsis whitespace-nowrap">
                    Artist
                </td>
                <td className="w-[20%] overflow-hidden text-ellipsis whitespace-nowrap">
                    Album
                </td>
                <td className="w-[15%] overflow-hidden text-ellipsis whitespace-nowrap">
                    Time Added
                </td>
            </tr>
        </tbody>
    )
}

const MiniPlayBtn = () => {
    return (
        <i className="fa-solid fa-play text-white/80 cursor-pointer"></i>
    )
}

const Song = () => {
    return (
        <tbody>
            <tr className="flex flex-shrink-0 h-12 items-center justify-evenly text-sm text-white/90 te hover:bg-white/5 rounded-sm first-of-type:mt-2">
                <th className="w-8 overflow-hidden text-ellipsis whitespace-nowrap ">
                    <MiniPlayBtn />
                </th>
                <td className="w-[35%] overflow-hidden text-ellipsis whitespace-nowrap pointer-events-none">
                    Dazed & Confused
                </td>
                <td className="w-[20%] overflow-hidden text-ellipsis whitespace-nowrap pointer-events-none">
                    Led Zeppelin
                </td>
                <td className="w-[20%] overflow-hidden text-ellipsis whitespace-nowrap pointer-events-none">
                    Led Zeppelin
                </td>
                <td className="w-[15%] overflow-hidden text-ellipsis whitespace-nowrap pointer-events-none">
                    10 Hours Ago
                </td>
            </tr>
        </tbody>
    )
}

export default function() {
    const accent = useContext(AccentContext)
    return (
        <div className="flex flex-col w-full items-center pt-5 max-w-[100rem]">
            <div className="flex flex-col w-full px-10"> 
                <span className="font-bold text-[2.5rem]">Playlist Name</span>
                <div className="flex w-full h-8 mt-4 items-center">
                    <div className="flex items-center h-8 w-24 justify-center rounded-md text-black text-xs font-semibold cursor-pointer select-none opacity-75 hover:opacity-100" style={{background: `rgb(${accent})`}}>Play</div>
                    <span className="text-sm font-medium ml-3.5">Spotify &#8226; 20 Songs</span>
                </div>
            </div>
            <table className="w-full px-10 flex flex-col mt-4">
                <Title />
            </table>
            <div className="flex-auto w-full h-0 overflow-y-scroll no-scrollbar items-center px-10">
                <table className="flex flex-col w-full max-h-full">

                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />

                </table>
                <div className="flex w-full h-1/6 absolute bottom-0 bg-gradient-to-t from-black/40 pointer-events-none">
                
                </div>
            </div>
        </div>
    )
}