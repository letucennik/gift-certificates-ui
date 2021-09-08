import {UserRole} from './user-role.enum';

export class UserRoleUtil {
  public static toString(role: UserRole): string {
    return UserRole[role];
  }

  public static parse(role: string): UserRole {
    return UserRole[role];
  }
}