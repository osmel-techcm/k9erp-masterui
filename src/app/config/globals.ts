import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable()
export class Globals {
  readonly apiUrl: string = environment.apiUrl;
  readonly apiUrlWebSocket: string = environment.apiUrlWebSocket;
  readonly keyStoreLogin = "authMasterDataToken";
  readonly keyStoreAuth = "authMasterData";
  dateServer: Date;
}
