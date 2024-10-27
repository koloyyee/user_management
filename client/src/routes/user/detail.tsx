import { useEffect, useState } from "react";
import { Params, useLoaderData, useNavigate } from "react-router-dom";
import { findByOid } from "../../api/user";
import { IUser } from "../../model/user";
import { FormBody } from "./form-body";

export async function loader({ params }: { params: Params }) {
	const oid = params.oid as string;
	// const res = await findByOid(oid) as { user: IUser, message: string };
	// if (!res.user) {
	// 	return null;
	// }
	// const user = res.user;
	return { oid };
}

export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	console.log(Object.fromEntries(formData));
	// update
	return null;

}


export default function UserDetail() {
	const navigate = useNavigate();

	const [user, setUser] = useState<IUser | null>(null);
	const [isLoading, setLoading] = useState<boolean>(true);
	// const { user } = useLoaderData() as { user: IUser };
	const { oid } = useLoaderData() as { oid: string };

	useEffect(() => {
		(async () => {
			setLoading(true)
			try {
				const data = await findByOid(oid);
				setUser(data.user);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		})();
	}, [])


	return (
		<>
			{isLoading ?
				<h3 className="loading spin"> Loading </h3> :
				<div>
					<FormBody user={user} />
					<button className="form-btn" type="button" onClick={() => navigate("/")}> back </button>
				</div>


			}
		</>
	);
}