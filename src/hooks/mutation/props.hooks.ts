import { useAuthData } from './auth/query';
import { usePaymentData } from './payment/query';
import { useRestaurantData } from './restaurant/query';
import { useSuperAdminData } from './superAdmin/query';
import { useUserData } from './user/query';
class DatasQuery {
  static Auth = useAuthData;
  static Restaurant = useRestaurantData;
  static User = useUserData;
  static Pay = usePaymentData;
  static Admin = useSuperAdminData;
}

export default DatasQuery;
