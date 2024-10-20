import { useContext, useState } from "react"
import { AccentContext, ArtContext } from "../Contexts";

interface SongInfoArg { title : string, artist : string, art : string }
const SongInfo : React.FC<SongInfoArg> = ({ title, artist, art }) => {
    if ( title == undefined || title == "" || artist == undefined || artist == "") {
        return (<div className="flex flex-1 items-center"></div>)
    }
    return (
        <div className="flex flex-1 items-center">
            <div className="w-20 h-20 p-3.5">
                <div className="w-full h-full rounded-xl relative overflow-hidden">
                    <img src={art} alt="art" className="w-full h-full object-cover absolute" />
                </div>
            </div>
            <div className="flex flex-col text-white/90 text-sm font-semibold max-w-[20vw] ml-0.5">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    <span>{title}</span>
                </div>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="text-xs text-white/75">{artist}</span>
                </div>
            </div>
        </div>
    )
}

interface SongControlBtnLabelArg { active : boolean, text : string }
const SongControlBtnLabel : React.FC<SongControlBtnLabelArg> = ({ active, text }) => {
    return (
        <div data-active={active} className="flex absolute -translate-y-1/2 bottom-[5rem] py-1.5 text-white/80 text-sm font-medium rounded-sm bg-zinc-800 pointer-events-none scale-0 data-[active=true]:scale-100 transition-transform">
            <span className="text-nowrap px-2">{text}</span>
        </div>
    )
}

interface SongControlBtnArg { icon : string, fill : boolean, text : string }
const SongControlBtn : React.FC<SongControlBtnArg> = ({ icon, fill, text }) => {
    const [hitVisible, setHintVisible] = useState(false);

    return (
        <div
            className="flex h-9 data-[fill=true]:aspect-square items-center justify-center mx-2.5 rounded-full data-[fill=true]:bg-white cursor-pointer opacity-75 text-white data-[fill=true]:text-black hover:opacity-100"
            data-fill={fill}
            onMouseEnter={()=>{setHintVisible(true)}}
            onMouseLeave={()=>{setHintVisible(false)}}
        >
            <i className={icon}></i>
            <SongControlBtnLabel active={hitVisible} text={text} />
        </div>
    )
}

const SongControl = () => {
    return (
        <div className="flex flex-col h-full w-[40vw] max-w-[50rem] justify-center">
            <div className="flex p-1 justify-center">
                <SongControlBtn icon="fa-solid fa-shuffle" fill={false} text="Shuffle" />
                <SongControlBtn icon="fa-solid fa-backward" fill={false} text="Previous" />
                <SongControlBtn icon="fa-solid fa-play" fill={true} text="Play/Pause" />
                <SongControlBtn icon="fa-solid fa-forward" fill={false} text="Next" />
                <SongControlBtn icon="fa-solid fa-repeat" fill={false} text="Repeat" />
            </div>
            <div className="flex h-6 w-full">
                <div className="text-xs text-white/75 items-center flex mr-2 font-semibold">
                    <span>00:00</span>
                </div>
                <input className="flex flex-1" type="range" />
                <div className="text-xs text-white/75 items-center flex ml-2 font-semibold">
                    <span>00:00</span>
                </div>
            </div>
        </div>
    )
}

interface SongVolumeLogoArg { volume : number }
const SongVolumeLogo : React.FC<SongVolumeLogoArg> = ({ volume }) => {
    if (volume <= 0) {
        return (<i className="fa-solid fa-volume-xmark"></i>)
    } else if (volume < 30) {
        return (<i className="fa-solid fa-volume-off"></i>)
    } else if (volume < 60) {
        return (<i className="fa-solid fa-volume-low"></i>)
    }
    return (<i className="fa-solid fa-volume-high"></i>)
}

const SongActions = () => {
    const [volume, setVolume] = useState(100);

    const onChange = (e) => {
        setVolume(e.target.value);
    }

    return (
        <div className="flex flex-1 items-center justify-end">
            <div className="w-6 h-6 mr-2 text-white/75">
                <SongVolumeLogo volume={volume} />
            </div>
            <div className="flex min-w-[8rem] w-[10vw] mr-3 mb-2">
                <input className="flex flex-1" type="range" value={volume} min={0} max={100} onChange={onChange} />
            </div>
        </div>
    )
}

const Playbar = () => {
    const accent = useContext(AccentContext);
    const art = useContext(ArtContext)
    return (
        <div className="flex flex-shrink-0 w-full h-[5rem] relative">
            <div
                className="flex absolute w-full h-full"
                style={{
                    background: `linear-gradient(to right, rgba(${accent}, 0.5), rgba(${accent}, 0.1) )`
                }}
            ></div>
            <div className="flex w-full h-full z-10">
                <SongInfo artist="Led Zeppelin" title="Dazed And Confused" art={art} />
                <SongControl />
                <SongActions />
            </div>
        </div>
    )
}

export default Playbar;