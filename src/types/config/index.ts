export type Category = 'makanan' | 'minuman';

export interface ProfileType {
  email: string;
  fullName: string;
}

export interface NotififType {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
}

export interface BusinesType {
  autoAcceptOrders: boolean;
  maintenanceMode: boolean;
  notifyNewOrders: boolean;
}
