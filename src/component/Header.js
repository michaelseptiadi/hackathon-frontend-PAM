import React from "react"
import pam from "../image/pam.png"

function Header() {
    return (
        <div className="header">
            <img src={pam} alt="pam" className="logo" />
            <h1>Smartwater Hackathon</h1>
        </div>
    )
}

export default Header
