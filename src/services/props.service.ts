import AuhtApi from '@/services/auth/auth.service';
import RestaurantApi from '@/services/restaurant/restaurant.service';
import UserApi from '@/services/user/user.service';

class Api {
  static Auth = AuhtApi;
  static Restaurant = RestaurantApi;
  static User = UserApi;
}

export default Api;
