export interface IDate {
  month: string;
  year: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export interface IComment {
  owner: string;
  avatar: string;
  message: string;
  date: IDate;
}


export interface ICharct{
  name:string,
  info:string
}



export interface ICharacteristics {
  list:ICharct[],
  subList:ICharct[],
  cardInfo:ICharct[],
}

export interface IUserInterfaceItem{
  amount:number,
  img:string,
  name:string,
  img2:string,
  isActive:boolean
}

export interface IPurpose{
  name:string;
  isActive:boolean;
}

export interface IProduct {
  characteristics: ICharacteristics
  fullInfo:string,
  productImages:string[];
  id:string;
  isFavor:boolean,
  priceDynamic: {};
  comments: IComment[];
  category: string,
  subCategory: string,
  img: string,
  title: string,
  design:string,
  price: number,
  discount:boolean,
  userComunication:IUserInterfaceItem[],
  purpose:IPurpose[]

}
