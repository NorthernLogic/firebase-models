import { NlFirebaseService, BaseModel } from "./BaseService";
import { FitnessClassModel, FitnessClassService } from "./FitnessClassService";
import { UserModel, UserService } from "./UserService";


export class ReservationModel implements BaseModel {
  public id: string;
  public user: UserModel;
  public class: FitnessClassModel;

  constructor(public userId: string, public classId: string) {}
}

export class ReservationService extends NlFirebaseService<ReservationModel> {

  constructor(app, registry) {
    super(app, registry, ReservationModel);
  }

  protected get path() {
    return "/reservations";
  };

  protected get serviceMap() {
    return {
      class: FitnessClassService,
      user: UserService,
    };
  };
}
