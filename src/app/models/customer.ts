export class Customer {
  id: number;
  name: string;
  fien: string;
  email: string;
  phone: string;
  website: string;
  licences: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;

  constructor(){
    this.licences = 0;
  }

}
