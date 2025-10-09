import { useAuthData } from './auth/query';
import { useRestaurantData } from './restaurant/query';
class DatasQuery {
  static Restaurant = useRestaurantData;
  static Auth = useAuthData;
}

export default DatasQuery;
