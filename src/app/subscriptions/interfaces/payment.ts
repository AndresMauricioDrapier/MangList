export interface Payment {
  id?: number,
  idUser: string;
  mailUser:string,
  method: string,
  amount:number,
  date: string,
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
