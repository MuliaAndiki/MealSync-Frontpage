import { useAuthData } from './auth/query';
import { usePaymentData } from './payment/query';
import { useRestaurantData } from './restaurant/query';
import { useUserData } from './user/query';
class DatasQuery {
  static Restaurant = useRestaurantData;
  static Auth = useAuthData;
  static User = useUserData;
  static Pay = usePaymentData;
}

export default DatasQuery;
