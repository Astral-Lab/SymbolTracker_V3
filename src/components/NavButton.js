import { Link } from 'react-router-dom';

const NavButton = ({text, color, path, opacity}) => {
    
    // function should be redefined every render, so we are fine
    // we could use useCallback, however, every page needs a new function anyways, otherwise we'll be using stale values?
    const handleClick = () => {
        /**
         * Get the selectedSymbols from localStorage.
         * This is safe, as by this stage localStorage will store the complete object with all its paths
         * Create a new object with the value of current updated to point to the next path in the paths array
         * Store the new object in localStorage, so next button can access lastest data
         */
        const selected = JSON.parse(localStorage.getItem("selectedSymbols"));
        const updatedSelected = { 
            ...selected, 
            current: text === "Next" ? selected.current < selected.paths.length - 1 ? selected.current + 1 : selected.current 
            : text === "Back" ? selected.current > -1 ? selected.current - 1 : selected.current : selected.current
        };
        localStorage.setItem("selectedSymbols", JSON.stringify(updatedSelected));
    }

    return (
        <Link to={path}>
            <div 
                className={`w-[128px] h-[64px] ${color} grid place-content-center rounded-md ${opacity}`}
                onClick={handleClick}
                >
                {text}
            </div>
        </Link>
    )
};

export default NavButton;