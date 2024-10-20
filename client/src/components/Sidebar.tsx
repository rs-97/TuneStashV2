import { useState, useRef } from "react";
import "../styles/SidebarElement.css";

import Example from "../assets/art.webp";

interface SidebarElemLabelArg { active : boolean, children : React.ReactNode }
const SidebarElemLabel : React.FC<SidebarElemLabelArg> = ({ active, children }) => {
    return (
        <div
            className="flex pointer-events-none scale-0 items-center justify-center absolute left-full ml-2 h-7 origin-left top-1/2 -translate-y-1/2 bg-zinc-800 text-white/80 text-sm font-medium rounded-sm data-[active=true]:scale-100 transition-transform z-30"
            data-active={active}
        >
            <span className="text-nowrap px-2">{children}</span>
        </div>
    )
}

interface SidebarElemArg { selected : boolean, text : string, onClick : React.MouseEventHandler<HTMLDivElement> }
const SidebarElem : React.FC<SidebarElemArg> = ({ selected, text, onClick }) => {
    const [showText, setShowText] = useState(false);

    return (
        <div onMouseEnter={()=>{setShowText(true)}} onMouseLeave={()=>{setShowText(false)}} className="w-full aspect-square relative p-4 hover:p-3.5 z-10 data-[selected=true]:p-3 transition-[padding] my-1" data-selected={selected}>
            <div className="w-full h-full rounded-2xl bg-zinc-950/10 relative overflow-hidden cursor-pointer" onClick={onClick}>
                <img src={Example} alt="art" className="w-full h-full absolute object-cover" />
            </div>
            <SidebarElemLabel active={showText}>{text}</SidebarElemLabel>
        </div>
    )
}

const SidebarDrop = ({position}) => {
    return (
        <div
            className="absolute w-full aspect-square rounded-tl-2xl rounded-bl-2xl bg-zinc-950 pointer-events-none sidebardropper -translate-y-0.5 transition-[top]"
            style={{ top: position }}
        ></div>
    )
}

interface SidebarArg {  }
const Sidebar : React.FC<SidebarArg> = () => {
    const [playlists, setPlaylists] = useState([{selected: true, text:"Hello"}, {selected:false, text:"Some playlist name"}, {selected:false, text:"Some really really really really really long playlist name"}]);
    const [dropPosition, setDropPosition] = useState(0);
    const sidebarRef = useRef(null);

    const clicked = (index : number) => {
        if (sidebarRef.current) {
            const elem = sidebarRef.current.children[index];
            const rect = elem.getBoundingClientRect();
            setDropPosition(rect.top);

            const newPlaylists = playlists.map((v,i)=>{v.selected=index==i;return v;});
            setPlaylists(newPlaylists);
        }
    }

    const elements = playlists.map((v, i) => {
        return <SidebarElem key={i} selected={v.selected} text={v.text} onClick={()=>{clicked(i)}} />
    })
    

    return (
        <div
            ref={sidebarRef}
            className="flex flex-col flex-shrink-0 h-full w-20 pt-1 pb-1 pl-1 z-20 relative"
        >
            {elements}
            <SidebarDrop position={dropPosition} />
        </div>
    )
}

export default Sidebar;

