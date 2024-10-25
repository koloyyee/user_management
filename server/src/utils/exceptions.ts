
export class UserCRUDException extends Error { 
	constructor(method: string, msg: string) {
		super(method + msg);
	}
}