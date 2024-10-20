import Backdrop from "./Backdrop.tsx";
import Playlist from "./Playlist.tsx";

import { ArtContext } from "../Contexts.tsx";
import { useContext } from "react";

const Content = () => {
	const art = useContext(ArtContext);
    return (
        <div className="flex flex-1 relative bg-zinc-950 overflow-hidden rounded-bl-2xl">
            <Backdrop image={art} />
			<div className="flex w-full h-full z-10 text-white justify-center">
				<Playlist />
			</div>
        </div>
    )
}

export default Content