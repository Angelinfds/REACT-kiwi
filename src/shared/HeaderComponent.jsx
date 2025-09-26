import React from 'react'
import { NavLink } from 'react-router'
import styles from './Header.module.css'


const HeaderComponent = ({title}) => {
  
  return (
    <div>
        <h1 className={styles.title}>{title}</h1>
        <nav>
        <NavLink className={({ isActive }) => isActive ? styles.active : styles.inactive} to="/">Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? styles.active : styles.inactive} to="/about">About</NavLink>
        </nav>
    </div>
  )
}



export default HeaderComponent