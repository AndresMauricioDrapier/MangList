export interface Payment {
  id: number;
  idUser: string;
  name: string,
  card: string,
  expiration: string,
  cvv: string,
}

export interface PaymentResponse {
  id: number;
  idUser: string;
  date: string;
  amount: number;
  name: string,
  mail: string,
  methodPayment: string,
}
