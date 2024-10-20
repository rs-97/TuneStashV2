import { useState, useEffect, useContext } from 'react'
import { getMostVibrantColor } from './Util.tsx';
import { AccentContext, ArtContext } from './Contexts.tsx';

import Sidebar from "./components/Sidebar.tsx";
import Playbar from './components/Playbar.tsx';
import Content from './components/Content.tsx';
import Topbar from './components/Topbar.tsx';

import Art from "./assets/sb.png";

interface MainConArg { children?: React.ReactNode; }
const MainCon : React.FC<MainConArg> = ({ children }) => {
	return (
		<div className="flex flex-col w-screen h-screen bg-black">
			<Topbar />
			<div className='flex flex-col w-full h-full bg-zinc-950 overflow-hidden'>
				{children}
			</div>
		</div>
	)
}

interface InnerConArg { children?: React.ReactNode; }
const InnerCon : React.FC<InnerConArg> = ({ children }) => {
	const accent = useContext(AccentContext);
	return (
		<div className='flex-1 flex' style={{background: `rgba(${accent}, 0.5)`}}>
			{children}
		</div>
	)
}

function App() {
	const [accent, setAccent] = useState("rgba(0,0,0,0)");

	useEffect(() => {
		getMostVibrantColor(Art)
			.then((color) => {
				if (color) {
					setAccent(color)
				}
			});
	}, []);
	
	return (
		<AccentContext.Provider value={accent}>
			<ArtContext.Provider value={Art}>
				<MainCon>
					<InnerCon>
						<Sidebar />
						<Content />
					</InnerCon>
					<Playbar />
				</MainCon>
			</ArtContext.Provider>
		</AccentContext.Provider>
	)
}

export default App
