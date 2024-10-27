import { redirect, useNavigate } from "react-router-dom";
import { save } from "../../api/user";
import { FormBody } from "./form-body";


export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	// create
	const res = await save(formData);
	if( res.result  && res.result.acknowledged) {
		return redirect("/");
	} else {
		console.error(res.message);
		return null;
	}
}

export default function CreateUser() {
	const navigate = useNavigate();

	return (
		<>
			<FormBody user={null} />
			<button className="form-btn" type="button" onClick={() => navigate(-1)}> back </button>
		</>
	);
}