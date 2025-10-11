import AuhtApi from '@/services/auth/auth.service';
import PaymentApi from '@/services/payment/payment.service';
import RestaurantApi from '@/services/restaurant/restaurant.service';
import UserApi from '@/services/user/user.service';

class Api {
  static Auth = AuhtApi;
  static Restaurant = RestaurantApi;
  static User = UserApi;
  static Payment = PaymentApi;
}

export default Api;
