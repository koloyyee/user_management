import { useEffect, useState } from "react";
import { Params, useLoaderData, useNavigate } from "react-router-dom";
import { findByOid, update } from "../../api/user";
import { IUser } from "../../model/user";
import { FormBody } from "./form-body";


let loading = false;

export async function loader({ params }: { params: Params }) {
	const oid = params.oid as string;
	return { oid };
}

export async function action({ request }: { request: Request }) {
	loading = true;
	try {
		const formData = await request.formData();
		const res = await update(formData);
		if ( res.result.acknowledged) {
			// return redirect("/users/" + formData.get("_id"));
			window.location.reload();
		}
	} finally {
		loading = false;
	}
	return null;

}


export default function UserDetail() {
	const navigate = useNavigate();

	const [user, setUser] = useState<IUser | null>(null);
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

	const [isLoading, setLoading] = useState(loading);
	useEffect(() => {
		setLoading(!isLoading)
	}, [loading])

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