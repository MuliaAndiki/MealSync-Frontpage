import AuhtApi from '@/services/auth/auth.service';
import PaymentApi from '@/services/payment/payment.service';
import RestaurantApi from '@/services/restaurant/restaurant.service';
import UserAdminApi from '@/services/super-admin/superAdmin.service';
import UserApi from '@/services/user/user.service';
class Api {
  static Auth = AuhtApi;
  static Restaurant = RestaurantApi;
  static User = UserApi;
  static Payment = PaymentApi;
  static SuperAdmin = UserAdminApi;
}

export default Api;
