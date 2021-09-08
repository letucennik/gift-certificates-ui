import { Role } from "./role";

export class LoginResponse {
  login?: string;
  token?: string;
  role?: Role;
  userId?:number;
}