
interface AppBtnArg { icon : string, isExit : boolean, onClick : React.MouseEventHandler<HTMLDivElement> }
const AppBtn : React.FC<AppBtnArg> = ({ icon, isExit, onClick }) => {
    return (
        <div onClick={onClick} data-exit={isExit} className="flex flex-shrink-0 w-10 justify-center items-center text-white/60 text-xs hover:bg-white/20 data-[exit=true]:hover:bg-red-500/40">
            <i className={icon}></i>
        </div>
    )
}

const AppBtns = () => {
    return (
        <div className="flex h-full">
            <AppBtn icon="fa-solid fa-window-minimize" isExit={false} onClick={()=>{ window.electronAPI.minimizeWindow() }} />
            <AppBtn icon="fa-solid fa-window-maximize" isExit={false} onClick={()=>{ window.electronAPI.maximizeWindow(); }} />
            <AppBtn icon="fa-solid fa-xmark" isExit={true} onClick={()=>{ window.electronAPI.closeWindow(); }} />
        </div>
    )
}

const Title = () => {
    return (
        <span className="font-teko text-white/80 font-semibold mt-1 mx-2">TuneStash</span>
    )
}

const Topbar = () => {
    return (
        <div className="w-full flex flex-shrink-0 h-8 justify-between">
            <div className="flex h-full items-center">
                <Title />
            </div>
            <div className="flex flex-1 drag-region"></div>
            <AppBtns />
        </div>
    )
}

export default Topbar;