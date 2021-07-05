import {
  CurrentUserController,
  UserAddReadingListController,
} from "../Controller/UserController";

const UserAddReading = {
  handler: UserAddReadingListController,
};

const CurrentUser = {
  handler: CurrentUserController,
};

export { CurrentUser, UserAddReading };
