import { NlFirebaseService, BaseModel } from "./BaseService";


export class UserModel implements BaseModel {
  public id: string;

  constructor(public name: string) {}
}

export class UserService extends NlFirebaseService<UserModel> {
  protected get path() {
    return "/users";
  };

  constructor(app, registry) {
    super(app, registry, UserModel);
  }
}
