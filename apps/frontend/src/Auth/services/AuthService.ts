import { environment } from "@/environments/environment";
import { IUser } from "@/interfaces";
import qs from "qs"
import setOrDeleteFromStorage from "@/utils/handleStorage";
import responseCamelizerAxios from "@/utils/responseCamelizerAxios";

interface IResponseToken {
  accessToken:string;
  tokenType:string;
}

interface IResponseLogin {
  user: IUser;
  token:string;
}

class AuthService {
  private readonly BASE_URL = environment.SERVER_BASE_URL ;

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

  public requestToken(document:string,password:string):Promise<IResponseToken>{
    return new Promise((resolve,reject)=>{

      const data = qs.stringify({
        username : document,
        password,
      })

      responseCamelizerAxios.post<IResponseToken>(this.BASE_URL + "/token",data,{
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      })
      .then(res => {
        const data = res.data
        this._token = data.accessToken
        resolve(data)
      }).catch(err =>{
        reject(new Error(err.message))
      })
    })
  }

  public login(
    document: string,
    password: string
  ): Promise<IResponseLogin> {
    return new Promise((resolve, reject) => {
      responseCamelizerAxios
        .post<IUser>(this.BASE_URL + "/login/", {
          document,
          password,
        })
        .then(async (res) => {
          const user = res.data;

          this.saveUser(user);
          const token = await this.requestToken(document,password)
          
          resolve({
            user,
            token: token.accessToken
          });
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
}

export default new AuthService();
