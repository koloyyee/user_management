import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { delByOid } from "../../api/user";
import { IUser } from "../../model/user";
import "./form-body.css";

export function FormBody({ user = null }: { user: IUser | null }) {

	const isUpdate = user ? true : false;
	const [edit, setEdit] = useState<boolean>(!user);

	function toggleEdit() {
		setEdit(!edit);
	}
	async function deleteUser(oid: string | undefined) {
		if (!oid) return;
		if (window.confirm("Are you sure you want to delete this user?")) {
			const res = await delByOid(oid)
			console.log(res)
			if(res.result.acknowledged) {
				return redirect("/");
			} else {
				console.error(res.message);
				return null;
			}
		}
	}
	return (
		<>
			{isUpdate && user ?
				<div>
					<button className="form-btn" id="edit_toggle_btn" type="button" onClick={() => toggleEdit()}>edit user</button>
					<button className="form-btn" id="delete_btn" type="button" onClick={async () => await deleteUser(user._id)}> Delete User</button>
				</div>
				:
				<></>
			}
			<Form method="POST" className="form_body">
				<div className="form-row">
					<label htmlFor="email"> Email</label>
					<input defaultValue={user?.email ?? ""} type="email" name="email" disabled={!edit} />
				</div>

				<div className="form-row">
					<label htmlFor="firstName"> First Name </label>
					<input defaultValue={user?.firstName} type="text" id="firstName" name="firstName" disabled={!edit} />
				</div>

				<div className="form-row">
					<label htmlFor="lastName"> Last Name </label>
					<input defaultValue={user?.lastName} type="text" id="lastName" name="lastName" disabled={!edit} />
				</div>
				{isUpdate ?
					<div className="form-row">
						<input defaultValue={user?._id} id="email" type="hidden" name="_id" />
						<input defaultValue={user?.lastName} type="hidden" id="password" name="password" />
					</div>
					:
					<div className="form-row">
						<label htmlFor="password"> Password </label>
						<input defaultValue={user?.password} type="password" id="password" name="password" disabled={!edit} />
					</div>
				}

				<button type="submit" disabled={!edit}> {isUpdate ? "Update" : "Create"} user </button>
			</Form>

		</>
	);
}