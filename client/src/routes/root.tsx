import { Link, Outlet } from "react-router-dom";
import { logout } from "../api/auth";

export default function Root () {

	return (

		<>
		<nav> 
			<ul>
				<li> <Link to="/"> Home </Link></li>
				<li> <button type="button" onClick={async () => await logout()} > Logout </button></li>
			</ul>
		</nav>	
		<main>
			<Outlet />
		</main>
		</>
	);
}