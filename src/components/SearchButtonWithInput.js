import React, {useEffect, useState} from "react";
import {Button, IconButton, InputBase} from "@mui/material";
import {alpha, styled} from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const Search = styled("div")(({theme}) => ({
    position: "relative",
    borderRadius: 0,
    borderLeft: "1px solid rgb(167, 173, 182)",
    borderRight: "1px solid rgb(167, 173, 182)",
    backgroundColor: "white",
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    svg: {
        fontSize: "20px",
    },
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "20ch",
        },
    },
}));

const SearchButtonWithInput = ({onChange, defaultValue}) => {
    const [isInputVisible, setInputVisible] = useState(!!defaultValue);
    const [searchValue, setSearchValue] = useState(defaultValue);

    useEffect(() => {
        setSearchValue(defaultValue)
        setInputVisible(!!defaultValue)
    }, [
        defaultValue
    ])

    const toggleInput = () => {
        setInputVisible(!isInputVisible);
    };

    const handleBlur = () => {
        onChange(searchValue)
        if (!searchValue) {
            setInputVisible(false);
        }
    };

    const handleClearClick = () => {
        setSearchValue(""); // Clear the input value
        onChange('')
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onChange(searchValue)
        }
    }


    return (
        <div>
            {isInputVisible ? (
                <Search onBlur={handleBlur}>
                    <SearchIconWrapper>
                        <SearchIcon onBlur={handleBlur}/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        onKeyPress={handleKeyPress}
                        onBlur={handleBlur}
                        autoFocus
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search"
                        inputProps={{"aria-label": "search"}}
                    />
                    <IconButton
                        onBlur={handleBlur}
                        size="small"
                        aria-label="clear search"
                        onClick={handleClearClick}
                        sx={{
                            position: "absolute",
                            right: 0,
                            fontSize: "1rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            padding: "1px",
                        }}
                    >
                        <ClearIcon/>
                    </IconButton>
                </Search>
            ) : (
                <Button
                    color="inherit"
                    onClick={toggleInput}
                    sx={{borderRadius: 0}}
                    startIcon={<SearchIcon/>}
                >
                    Search
                </Button>
            )}
        </div>
    );
};

export default React.memo(SearchButtonWithInput);
