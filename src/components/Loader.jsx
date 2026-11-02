import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center h-50">
            <RotatingLines
                visible={true}
                width="60"
                strokeColor="#3b82f6"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />
            <span className="text-slate-800 text-lg font-medium mt-2">
                Please wait...
            </span>
        </div>
    )
}

export default Loader;