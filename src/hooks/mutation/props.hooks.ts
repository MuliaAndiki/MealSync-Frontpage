import { useAuthData } from './auth/query';
import { useRestaurantData } from './restaurant/query';
import { useUserData } from './user/query';
class DatasQuery {
  static Restaurant = useRestaurantData;
  static Auth = useAuthData;
  static User = useUserData;
}

export default DatasQuery;
