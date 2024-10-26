import { useState } from "react";
import { Params, useLoaderData, useNavigate } from "react-router-dom";
import { findByOid } from "../../api/user";
import { IUser } from "../../model/user";
import { FormBody } from "./form-body";

export async function loader({ params }: { params: Params }) {
	const oid = params.oid as string;
	const res = await findByOid(oid) as { user: IUser, message: string };
	if (!res.user) {
		return null;
	}
	const user = res.user;
	return { user };
}

export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	console.log(Object.fromEntries(formData));
	// update
	return null;
}

export default function UserDetail() {
	const navigate = useNavigate();

	const [isLoading, setLoading] = useState<boolean>(true);
	const { user } = useLoaderData() as { user: IUser };
	return (
		<>
			<FormBody user={user} />
			<button type="button" onClick={() => navigate(-1)}> back </button>
		</>
	);
}