import { environment } from "@/environments/environment";
import { IUser } from "@/interfaces";
import setOrDeleteFromStorage from "@/utils/handleStorage";
import responseCamelizerAxios from "@/utils/responseCamelizerAxios";

interface ResponseLoginPoint {
  user: IUser;
  token: string;
}

class AuthService {
  private readonly BASE_URL = environment.SERVER_BASE_URL + "/users";

  constructor() {
    const _user = localStorage.getItem(environment.USER_FIELD_NAME);
    const _token = localStorage.getItem(environment.TOKEN_FIELD_NAME);
    if (_user && _token) {
      this._token = _token;
    }
  }

  private set _token(value: string) {
    this.token = value;
    setOrDeleteFromStorage(environment.TOKEN_FIELD_NAME, this.token);
  }

  get isLogged(): boolean {
    return !!this._token;
  }

  public token?: string;

  private saveUser(user: IUser) {
    setOrDeleteFromStorage(environment.USER_FIELD_NAME, JSON.stringify(user));
  }

  public getUserFromLocalStorage(): null | IUser {
    const _token = localStorage.getItem(environment.TOKEN_FIELD_NAME);
    const userString = localStorage.getItem(environment.USER_FIELD_NAME);
    if (!userString || !_token) return null;
    return JSON.parse(userString);
  }

  public login(
    document: string,
    password: string
  ): Promise<ResponseLoginPoint> {
    return new Promise((resolve, reject) => {
      responseCamelizerAxios
        .post<ResponseLoginPoint>(this.BASE_URL + "/login/", {
          document,
          password,
        })
        .then((res) => {
          const data = res.data;
          this._token = data.token;
          this.saveUser(data.user);
          resolve(data);
        })
        .catch((err) => {
          reject(new Error(err.message));
        });
    });
  }

  private deleteTokenSaved() {
    setOrDeleteFromStorage(environment.TOKEN_FIELD_NAME);
    this.token = undefined;
  }

  private deleteUserSaved() {
    setOrDeleteFromStorage(environment.USER_FIELD_NAME);
  }

  public logout() {
    this.deleteTokenSaved();
    this.deleteUserSaved();
  }

  // public onAuthChange() {}
}

export default new AuthService();
