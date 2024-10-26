
export class UserCRUDException extends Error { 
	constructor(msg: string) {
		super(msg);
	}
}