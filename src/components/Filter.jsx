import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({categories}) => {
    
    const [searchParams] = useSearchParams();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    // URL is the single source of truth for the filters
    const category = searchParams.get("category") || "all";
    const sortOrder = searchParams.get("sortby") || "asc";
    const urlKeyword = searchParams.get("keyword") || "";

    // The input needs its own state so it updates on every keystroke, before the URL does
    const [searchTerm, setSearchTerm] = useState(urlKeyword);

    // Keep the input in sync when the URL changes (Back/Forward, Clear Filter)
    useEffect(() => {
        setSearchTerm(urlKeyword);
    }, [urlKeyword])

    // Debounce: only write the keyword to the URL 700ms after the user stops typing
    useEffect(()=> {
        if (searchTerm === urlKeyword) return;

        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if(searchTerm) {
                params.set("keyword", searchTerm);
            } else {
                params.delete("keyword");
            }
            navigate(`${pathname}?${params}`);
        }, 700);

        return () => {
            clearTimeout(handler);
        }
    }, [searchTerm, urlKeyword, searchParams, navigate, pathname])

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        const params = new URLSearchParams(searchParams);
        if (selectedCategory === "all") {
            params.delete("category")
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params}`);
    }

    const toggleSortOrder = () => {
        const params = new URLSearchParams(searchParams);
        params.set("sortby", sortOrder === "asc" ? "desc" : "asc");
        navigate(`${pathname}?${params}`);
    }

    const handleClearFilters = () => {
        setSearchTerm("");
        navigate({ pathname });
    }

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
           <div className="relative flex items-center 2xl:w-112.5 sm:w-105 w-full">
                <input
                    type="text"
                    placeholder="Search Product"
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}
                    className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
                    
                />
                <FiSearch className="absolute left-3 text-slate-800" size={20} />
           </div>

           <div className="flex items-center gap-4">
                <FormControl
                    variant="outlined"
                    size="small"
                    className="text-slate-800 border-slate-700 min-w-40"
                >
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                    >
                        <MenuItem value="all">All</MenuItem>
                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                
                <Tooltip title={`Sorted by price: ${sortOrder}`}>
                        <Button onClick={toggleSortOrder} variant="contained" color="primary">
                            Sort By
                            {sortOrder === "asc" ? <FiArrowUp size={20}/> : <FiArrowDown size={20}/>}
                        </Button>
                </Tooltip>    
                

                <button
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none cursor-pointer"
                >
                    <FiRefreshCw className="font-semibold" size={16}/>
                    <span className="font-semibold">Clear Filter</span>
                </button>
           </div>
        </div>
    );
}

export default Filter;
