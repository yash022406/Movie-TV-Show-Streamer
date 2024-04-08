import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0,0)
    }, [location])
    
    const openSearch = () => {
      setMobileMenu(false)
      setShowSearch(true)
    }

    const openMobileMenu = () => {
      setMobileMenu(true)
      setShowSearch(false)
    }

    const searchQueryHandler = (e) => {
      if(e.key === "Enter" && query.length > 0){
        navigate(`/search/${query}`);
      }
      setTimeout(() => {
        setShowSearch(false)
      }, 1000)
    }

    const navigationHandler = (type) => {
      if(type==='Movies'){
        navigate('/explore/movie')
      } else{
        navigate('/explore/tv')
      }

    }
    const controlNavBar = () => {
      if(window.scrollY>200){
        if(window.scrollY>lastScrollY && mobileMenu){
          setShow('hide')
        }else{
          setShow('show')
        }
      }else{
        setShow('top')
      }
      setLastScrollY(window.scrollY)
    }
    useEffect(() => {
      window.addEventListener('scroll', controlNavBar)
      return () => {
        window.removeEventListener('scroll', controlNavBar)
      }
    }, [lastScrollY])

    return (
        <header className={`header ${mobileMenu?"mobileView":``} ${show}`}>
          <ContentWrapper>
            <div className="logo" onClick={() => navigate('/')}>
              <img src={logo} alt="" />
            </div>
            <ul className="menuItems" onClick={navigationHandler}>
              <li className="menuItem" >Movies</li>
              <li className="menuItem" >TV Shows</li>
              <li className="menuItem">
                <HiOutlineSearch onClick={openSearch} />
              </li>
            </ul>
            <div className="mobileMenuItems">
              <HiOutlineSearch className="cursor-pointer" onClick={openSearch} />
              {mobileMenu ? (
                <VscChromeClose onClick={()=>setMobileMenu(false)}/>

              ): (
                <SlMenu onClick={openMobileMenu} />

              )}
            </div>
          </ContentWrapper>
          {showSearch &&<div className="searchBar">
            <ContentWrapper>
              <div className="searchInp flex items-center justify-between w-full">
                <input type="text"
                placeholder='Search for a movie or tv show....'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler} />
                <VscChromeClose onClick={()=>setShowSearch(false)}/>
                {/* <button className='w-[100px] h-[50px] text-lg text-white outline-0 border-none' onKeyUp={searchQueryHandler}>Search</button> */}
              </div>
            </ContentWrapper>
          </div>}
        </header>
    );
};

export default Header;