import { environment } from "@/environments/environment";
import { IVehicle, IVehicleForm } from "@/interfaces";
import axios from "axios";
import BaseRepository from "./BaseRepository";

class VehicleRepository extends BaseRepository<IVehicle, IVehicleForm> {
  private readonly BASE_URL = environment.SERVER_BASE_URL + "/vehicles/";

  public create(item: IVehicleForm): Promise<IVehicle> {
    return new Promise((resolve, reject) => {
      axios
        .post(this.BASE_URL, item)
        .then((res) => {
          resolve(res.data);
        })
        .catch(reject);
    });
  }
  public update(id: string, item: IVehicle): Promise<IVehicle> {
    return new Promise((resolve, reject) => {
      axios
        .put(this.BASE_URL + id, item)
        .then((res) => {
          resolve(res.data);
        })
        .catch(reject);
    });
  }

  public fetchAll(params?: any): Promise<IVehicle[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.BASE_URL)
        .then((res) => {
          resolve(res.data);
        })
        .catch(reject);
    });
  }

  public fetchOne(id: string): Promise<IVehicle> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.BASE_URL + id)
        .then((res) => {
          resolve(res.data);
        })
        .catch(reject);
    });
  }
}

export default new VehicleRepository();
