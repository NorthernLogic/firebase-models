import { registerService } from "./BaseService";
import { FitnessClassService, FitnessClassModel } from "./FitnessClassService";
import { ReservationService, ReservationModel } from "./ReservationService";
import { UserService, UserModel } from "./UserService";

const fitnessService = registerService(FitnessClassService);
const reservationService = registerService(ReservationService);
const userService = registerService(UserService);
