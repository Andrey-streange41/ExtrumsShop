export interface INavBarSubItem {
  to: string;
  text: string;
  img: string;
  active: string;
  isActive: boolean;
  modalItems: IModalItems;
}

export interface IModalItems {
  title: string;
  items: IModalItem[];
}

export interface IModalItem {
  category: string;
  isActive: boolean;
}

export interface ILinks {
  text: string;
  to: string;
}

export interface ILinkList {
  title: string;
  links: ILinks[];
}

export interface INavBarItem {
  to: string;
  text: string;
  img: string;
  active: string;
  isActive: boolean;
}
