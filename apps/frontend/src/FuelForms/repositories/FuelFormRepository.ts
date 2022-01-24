import { TypeId } from "@/constants";
import { environment } from "@/environments/environment";
import { IFuelForm, IFuelFormForm } from "@/interfaces";
import responseCamelizerAxios from "@/utils/responseCamelizerAxios";
import BaseRepository from "../../repositories/BaseRepository";

interface FuelFormParams {
  vehicleId?: number;
  userId?: number;
  page: number;
}

class FuelFormRepository extends BaseRepository<IFuelForm, IFuelFormForm> {
  private BASE_URL = environment.SERVER_BASE_URL + "/fuel-forms/";

  create(item: IFuelFormForm): Promise<IFuelForm> {
    return new Promise((resolve, reject) => {
      responseCamelizerAxios
        .post(this.BASE_URL, item)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err.message));
    });
  }

  fetchAll(params?: FuelFormParams): Promise<IFuelForm[]> {
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

  fetchOne(id: TypeId): Promise<IFuelForm> {
    return new Promise((resolve, reject) => {
      responseCamelizerAxios
        .get(this.BASE_URL + id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err.message));
    });
  }
}

export default new FuelFormRepository();
