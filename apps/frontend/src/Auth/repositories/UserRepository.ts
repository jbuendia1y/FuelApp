import { Roles } from "@/constants";
import { environment } from "@/environments/environment";
import { IUser, IUserRegister } from "@/interfaces";
import responseCamelizerAxios from "@/utils/responseCamelizerAxios";
import BaseRepository from "../../repositories/BaseRepository";

interface UserParams {
  role: Roles;
}

class UserRepository extends BaseRepository<IUser, IUserRegister> {
  private readonly BASE_URL = environment.SERVER_BASE_URL + "/users/";

  create(item: IUserRegister): Promise<IUser> {
    return new Promise((resolve, reject) => {
      responseCamelizerAxios
        .post(this.BASE_URL, item)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err.message));
    });
  }

  fetchAll(params?: UserParams): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      responseCamelizerAxios
        .get(this.BASE_URL, {
          params,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err.message));
    });
  }

  fetchOne(id: number): Promise<IUser> {
      return new Promise((resolve,reject)=>{
        responseCamelizerAxios.get(this.BASE_URL + id).then(res => {
          resolve(res.data)
        }).catch(err =>{
          reject(new Error(err.message))
        })
      })
  }
}

export default new UserRepository();
