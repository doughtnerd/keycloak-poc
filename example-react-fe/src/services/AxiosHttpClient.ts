import { Axios, AxiosRequestConfig } from "axios";
import { KeycloakInstance } from "keycloak-js";
import { IHttpClient } from './http-client.interface';


export class AxiosHttpClient implements IHttpClient {
  
  private axios;

  constructor(private baseUrl: string, private auth: KeycloakInstance) {
    this.axios = new Axios({baseURL: baseUrl});

    this.axios.interceptors.request.use((config: AxiosRequestConfig<any>) => {
        config.headers = {
          Authorization: `Bearer ${this.auth.token ?? ''}`,
          'Accept': 'application/json'
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
  }
  
  public get<T>(url: string): Promise<T> {
    return this.axios.get(url).then(response => JSON.parse(response.data));
  }
}