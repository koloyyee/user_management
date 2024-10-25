
/**
 * Definition of an User 
 */
interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  role?: "user" | "admin"
};



