
/**
 * Definition of an User 
 */
interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  role?: "regular_user" | "admin"
};



