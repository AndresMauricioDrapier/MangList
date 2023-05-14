export interface Payment {
  id?: number,
  idUser: string;
  name?: string,
  mail?:string,
  amount:number,
  card?: string,
  expiration?: string,
  cvv?: string,
  methodPayment: string,
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
