import { Roles } from "@/constants";
import { environment } from "@/environments/environment";
import { IUser } from "@/interfaces";
import responseCamelizerAxios from "@/utils/responseCamelizerAxios";
import BaseRepository from "./BaseRepository";

interface UserParams {
  role: Roles;
}

class UserRepository extends BaseRepository<IUser> {
  private readonly BASE_URL = environment.SERVER_BASE_URL + "/users/";

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
}

export default new UserRepository();
