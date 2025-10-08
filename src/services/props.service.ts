import AuhtApi from '@/services/auth/auth.service';
import RestaurantApi from '@/services/restaurant/restaurant.service';

class Api {
  static Auth = AuhtApi;
  static Restaurant = RestaurantApi;
}

export default Api;
