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
  name:string,
  isActive:boolean,
  id:number,
  productId:number
}

export interface IPurpose{
  name:string;
  isActive:boolean;
}

export interface IProduct {
  avatar: string,
  category: string,
  discount:boolean,
  favorites?:IFavorites,
  full_info:string,
  id:number,
  images:string[],
  isFavor:boolean,
  price:number,
  characteristics:ICharacteristics,
  subCategory: string,
  title: string,
  comments?: IComment[];
  userComunications?:IUserInterfaceItem[],
  purpose?:IPurpose[]
}


export interface IFavorites{
  id:number;
  userId:number;
  productId:number;
}