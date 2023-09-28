import { prisma } from "../lib/prisma";
import { UserModelInterface } from "../models/UserModel";

export class UserService {

  
  public async createUser(userInfo: UserModelInterface) {

    try {
      const register = await prisma.user.create({
        data: {
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password
        }
      });

      return register;
    } catch (error) {
      console.log(error);
      throw error;
    }

  }

  public async deleteUser(userId: string) {
     try {
      const deletion = await prisma.user.delete({
        where: {
          id: userId
        }
      });

      return deletion;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async userExists(email: string, password: string) {

    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email,
          password
        }
      })
      return !user ? null : user;
    } catch (error) {
      console.error(error);
      return null;

    }
  }  

  public async findMany() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error(error);
      throw error;

    }
  }
}

export default UserService;
