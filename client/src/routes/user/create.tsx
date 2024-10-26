import { useNavigate } from "react-router-dom";
import { FormBody } from "./form-body";


export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	console.log(Object.fromEntries(formData));
	// create
	return null;
}

export default function CreateUser() {
	const navigate = useNavigate();

	return (
		<>
			<FormBody user={null} />
			<button type="button" onClick={() => navigate(-1)}> back </button>
		</>
	);
}