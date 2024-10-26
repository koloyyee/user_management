import * as bcrypt from "bcrypt";



const SALT = 10;

function encode(password: string) {
	return bcrypt.hash(password, SALT);
}

function verify(inputPassword: string, encryptedPassword: string) {
	return bcrypt.compare(inputPassword, encryptedPassword);
}
export const passwordEncoder = {
	encode,
	verify
}