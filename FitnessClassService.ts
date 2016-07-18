import { NlFirebaseService, BaseModel } from "./BaseService";


export class FitnessClassModel implements BaseModel {
  public id: string;

  constructor(public name: string, public description: string) {}
}

export class FitnessClassService extends NlFirebaseService<FitnessClassModel> {
  protected get path() {
    return "/classes";
  };

  constructor(app, registry) {
    super(app, registry, FitnessClassModel);
  }
}
