import { useState } from "react";
import { Form } from "react-router-dom";
import { delByOid } from "../../api/user";
import { IUser } from "../../model/user";

export function FormBody({ user = null }: { user: IUser | null }) {

	const isUpdate = user ? true : false;
	const [edit, setEdit] = useState<boolean>(!user);

	function toggleEdit() {
		setEdit(!edit);
	}
	return (
		<>
			{isUpdate && user ?
				<>
					<button type="button" onClick={() => toggleEdit()}>edit user</button>
					<button type="button" onClick={async () => {
						if (user._id) {
							await delByOid(user._id)
						}
					}}> Delete User</button>
				</>
				:
				<></>
			}
			<Form method="POST">
				<input defaultValue={user?.email ?? ""} type="text" name="email" disabled={!edit} />
				<input defaultValue={user?.firstName} type="text" name="firstName" disabled={!edit} />
				<input defaultValue={user?.lastName} type="text" name="lastName" disabled={!edit} />
				<button type="submit" disabled={!edit}> {isUpdate ? "Update" : "Create"} user </button>
			</Form>

		</>
	);
}