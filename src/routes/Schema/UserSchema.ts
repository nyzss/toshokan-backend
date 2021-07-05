import {
  CurrentUserController,
  UserAddReadingListController,
} from "../Controller/UserController";

const CurrentUser = {
  handler: CurrentUserController,
};

const UserAddReading = {
  handler: UserAddReadingListController,
};

export { CurrentUser, UserAddReading };
