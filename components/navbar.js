import "./navbar.css"
export const Navbar=()=>{
    return(
    <header className="navheader">
    <nav>
     <div className="left">Recipe Raven
     </div>
     <div className="right">
        <ul>
            <li>Home</li>
            <li>Profile</li>
            <li>Customize Recipe</li>
            <li>Explore Recipe</li>
        </ul>
     </div>
    </nav>
    </header>
    )
}