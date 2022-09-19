import React,{ useRef, useEffect } from 'react';

import { Container, NavbarBrand } from "reactstrap";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import "../../styles/header.css";
import { useSelector, useDispatch} from "react-redux";

import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";

const nav__links = [
    {
      display: "Home",
      path: "/home",
    },
    {
      display: "Foods",
      path: "/foods",
    },
    {
      display: "Cart",
      path: "/cart",
    },
    {
      display: "Contact",
      path: "/contact",
    },
  ];


const Header = () => {
    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const dispatch = useDispatch();

    const toggleCart = () => {
      dispatch(cartUiActions.toggle());
    };


    const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

    useEffect(() => {
      window.addEventListener("scroll", () => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80 ) {
          headerRef.current.classList.add("header__shrink");
        } else {
          headerRef.current.classList.remove("header__shrink");
        }
      });
  
      return () => window.removeEventListener("scroll",()=>{});
    }, []);


    return <header className="header" ref={headerRef}>
    <Container>
      <div className="nav__wrapper d-flex align-items-center justify-content-between">

        {/* Logo Part */}
        <div className="logo">
        <NavbarBrand href="/"> <img src={logo} alt="logo" /> </NavbarBrand> 
          <h5>DIU FOOD</h5>
        </div>


        {/* Menu Part */}
        <div className="navigation" ref={menuRef} >
          <div className="menu d-flex align-items-center gap-5">
            {nav__links.map((item, index) => ( 
               
              <NavLink
              onClick={toggleMenu}
                to={item.path}
                key={index}
                className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
              >
                {item.display}
              </NavLink>

            ))}
          </div>
        </div>

        {/*nav right icons part*/}
        <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i class="ri-shopping-basket-line"></i>
              <span className="cart__badge"> {totalQuantity} </span>
            </span>

            <span className="user">
              <Link to="/login">
                <i class="ri-user-line"></i>
              </Link>
            </span>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
        </div>
    </div>

    </Container>
    </header>
};

export default Header;