import "../styles/Backdrop.css";

const Backdrop = ({ image }) => {
    return (
        <div className="flex absolute left-2/3 -translate-x-1/2 -top-20 w-[60rem] h-[40rem] -rotate-12">
            <div
                className="w-full h-full backdrop-art"
                style={{
                    backgroundImage: `url(${image})`
                }}
            ></div>
            <div
                className="absolute w-[102%] -top-1 -left-1 h-[102%] backdrop-brightness-50 backdrop-blur-sm"
                style={{
                    background: "radial-gradient(ellipse, transparent, rgb(9 9 11) 71%)"
                }}
            ></div>
        </div>
    )
}

export default Backdrop;