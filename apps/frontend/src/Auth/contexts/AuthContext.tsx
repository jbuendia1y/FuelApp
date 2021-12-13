import User from "@/Auth/models/User";
import AuthService from "@/Auth/services/AuthService";
import { createContext, useEffect, useState } from "react";

const defaultValues = {
  login: (document: string, password: string): Promise<void> => {
    return new Promise(() => {});
  },
  user: undefined,
  isLogged: undefined,
  logout: (): Promise<void> => {
    return new Promise(() => {});
  },
};

const AuthContext = createContext<{
  login: (document: string, password: string) => Promise<void>;
  user: undefined | User;
  isLogged: boolean | undefined;
  logout: () => Promise<void>;
}>(defaultValues);

export function AuthContextProvider(props: { children: any }) {
  const [isLogged, setIsLogged] = useState<undefined | boolean>();
  const [user, setUser] = useState<undefined | User>();
  const [token, setToken] = useState<undefined | string>();

  useEffect(() => {
    const _user = AuthService.getUserFromLocalStorage();
    if (!!AuthService.token) {
      setToken(AuthService.token);
      setIsLogged(true);
    }
    if (_user) setUser(new User(_user));
  }, []);

  const login = async (document: string, password: string) => {
    return await AuthService.login(document, password)
      .then((res) => {
        setUser(new User(res.user));
        setIsLogged(AuthService.isLogged);
        if (isLogged) setToken(AuthService.token);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const logout = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      setUser(undefined);
      setToken(undefined);
      setIsLogged(undefined);

      AuthService.logout();
    });
  };

  return (
    <AuthContext.Provider value={{ login, isLogged, user, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
