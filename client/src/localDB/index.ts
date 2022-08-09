import facebook from "../assets/images/facebook.png";
import youtube from "../assets/images/youtube.png";
import instagram from "../assets/images/instagram.png";
import home from "../assets/images/home2.png";
import favorite from "../assets/images/favorite.png";
import catalog from "../assets/images/catalog2.png";
import activeCategory from "../assets/images/activeCategory.png";
import activeFavorite from "../assets/images/activeFavorite.png";
import activeHome from "../assets/images/activeHome.png";
import car from "../assets/images/car.png";
import pc from "../assets/images/pc.png";
import clothing from "../assets/images/clothing.png";
import activePc from "../assets/images/activePc.png";
import dron from "../assets/images/dron.webp";
import laptop1 from "../assets/images/laptop1.jpg";
import { IProduct } from "../types/favoriteList.types";
import admin from '../assets/images/admin.png';
import adminActive from '../assets/images/adminActive.png'
import {
  INavBarSubItem,
  IModalItems,
  ILinkList,
  INavBarItem,
} from "../types/navBar.types";

import dronPos1 from "../assets/images/dronImgs/pos1.jpg";
import dronPos2 from "../assets/images/dronImgs/pos2.jpg";
import dronPos3 from "../assets/images/dronImgs/pos3.jpg";
import dronPos4 from "../assets/images/dronImgs/pos4.jpg";
import dronPos5 from "../assets/images/dronImgs/pos5.jpg";
import dronPos6 from "../assets/images/dronImgs/pos6.png";

import { samsungGalaxy_a525 } from "../assets/images/index.js";
import { bmw_x6 } from "../assets/images/index.js";
import { userCommunication } from "../assets/images/index.js";
import { laptop_hp17 } from "../assets/images/index.js";
import { polo_tshort } from "../assets/images/index.js";

export const iconsList = [
  {
    src: facebook,
    to: "https://www.facebook.com/",
  },
  {
    src: instagram,
    to: "https://www.instagram.com/",
  },
  {
    src: youtube,
    to: "https://www.youtube.com/",
  },
];

export const linkList: ILinkList[] = [
  {
    title: "Our services",
    links: [
      { text: "Product reviews", to: "/" },
      { text: "Reviews of stores", to: "/" },
    ],
  },
  {
    title: "To users",
    links: [
      { text: "FAQ for users", to: "/" },
      { text: "About the project", to: "/" },
    ],
  },
  {
    title: "Feedback",
    links: [
      { text: "For users", to: "/" },
      { text: "For online stores", to: "/" },
    ],
  },
];

export const navbarParrentList: INavBarItem[] = [
  {
    to: "/",
    text: "home",
    img: home,
    active: activeHome,
    isActive: false,
  },{
    to:"/admin",
    text:"admin",
    img:admin,
    active:adminActive,
    isActive:false
  },
  {
    to: "/favorites",
    text: "favorites",
    img: favorite,
    active: activeFavorite,
    isActive: false,
  },
  {
    to: "/catalog",
    text: "categories",
    img: catalog,
    active: activeCategory,
    isActive: false,
  },
  
];

export const modalItems: IModalItems[] = [
  {
    title: `Electronics`,
    items: [
      { category: "Laptops", isActive: false },
      { category: "Smartphones", isActive: false },
      { category: "Tablets", isActive: false },
      { category: "E-books", isActive: false },
      { category: "Drons", isActive: false },
    ],
  },
  {
    title: "Auto",
    items: [
      { category: "BMW", isActive: false },
      { category: "Mersedes", isActive: false },
      { category: "Audi", isActive: false },
      { category: "Toyota", isActive: false },
    ],
  },
  {
    title: "Clouthes",
    items: [
      { category: "Blouse", isActive: false },
      { category: "Shirt", isActive: false },
      { category: "Pants", isActive: false },
      { category: "Breeches", isActive: false },
      { category: "Leggings", isActive: false },
      { category: "Jeans", isActive: false },
    ],
  },
];

export const subMenu: INavBarSubItem[] = [
  {
    text: "cars",
    img: car,
    active: activeCategory,
    to: "",
    isActive: false,
    modalItems: modalItems[1],
    purpose:[
      {name:'For travel', isActive:true},
      {name:'For shipping', isActive:false},
      {name:'For racing', isActive:true},
      {name:'For party', isActive:false},
      {name:'For security', isActive:false},
    ],
    characteristics:{
      title:'Color',
      charList:[
        {name:'Red',isActive:false},
        {name:'Silver',isActive:false},
        {name:'Gold',isActive:false},
        {name:'Blue',isActive:false},
      ]
    }
  },
  {
    text: "electronics",
    img: pc,
    active: activePc,
    to: "",
    isActive: false,
    modalItems: modalItems[0],
    purpose:[
      {name:'For video', isActive:true},
      {name:'For fun', isActive:false},
      {name:'For photo', isActive:true},
      {name:'For home life', isActive:false},
      {name:'For game', isActive:false},
    ],
    characteristics:{
      title:'Сonnection method',
      charList:[
        {name:'Wireless',isActive:false},
        {name:'Wires',isActive:false},
        
      ]
    }
  },
  {
    text: "clothing",
    img: clothing,
    active: activeCategory,
    to: "",
    isActive: false,
    modalItems: modalItems[2],
    purpose:[
      {name:'For summer', isActive:true},
      {name:'For winter', isActive:false},
      {name:'For othem', isActive:true},
      {name:'For spring', isActive:false},
    ],
    characteristics:{
      title:'Color',
      charList:[
        {name:'Red',isActive:false},
        {name:'Silver',isActive:false},
        {name:'Gold',isActive:false},
        {name:'Blue',isActive:false},
      ]
    }
  },
];

export const tmpProductList: IProduct[] = [
  {
    characteristics: {
      list: [
        { name: "Manufacturer:", info: "Eachine" },
        { name: "Weight:", info: "96g" },
        { name: "Flight time:", info: `Up to 10 min` },
      ],
      subList: [
        { name: "Gyroscope:", info: "6-axis" },
        { name: "Control panel:", info: "2.4 GHz" },
        { name: "Transmitter:", info: `2.4 GHz` },
      ],
      cardInfo: [
        {
          name: "Eachine E58:",
          info: "Built-in 2 MP HD camera supports FPV mode. This means that cool and clear photos and videos are delivered from the first person",
        },
        { name: "Flight time:", info: `Up to 10 min` },
      ],
    },
    productImages: [dronPos1, dronPos2, dronPos3, dronPos4, dronPos5, dronPos6],
    id: "123j123",
    fullInfo: `For ease of use, there are three speed options to choose from. You can switch between them depending on your skills and preferences. 
    He is perfect for entertaining with friends, as he knows how to perform various 3D flips and tricks.`,
    isFavor: false,
    priceDynamic: {},
    comments: [
      {
        owner: "Daniil",
        avatar: require("../assets/images/avatar1.png"),
        message:
          "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date: {
          month: "Jully",
          year: 2022,
          day: 22,
          hour: 12,
          minute: 33,
          second: 33,
        },
      },
      {
        owner: "Jully",
        avatar: require("../assets/images/avatar2.png"),
        message: "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        date: {
          month: "October",
          year: 2022,
          day: 12,
          hour: 11,
          minute: 23,
          second: 33,
        },
      },
      {
        owner: "Andrii",
        avatar: require("../assets/images/avatar2.png"),
        message: "Hmm this dron loking amazing !",
        date: {
          month: "October",
          year: 2022,
          day: 12,
          hour: 11,
          minute: 23,
          second: 33,
        },
      },
    ],
    purpose:[
      {name:'For video', isActive:true},
      {name:'For fun', isActive:false},
      {name:'For photo', isActive:true},
      {name:'For home life', isActive:false},
      {name:'For work', isActive:false},
    ],
    category: "electronics",
    subCategory: "Drons",
    img: dron,
    title: "Eachine E58 quadcopter drone Wi-fi with 720P camera",
    design:
      "You can take a drone with a compact size with you everywhere and at any time of the day.",
    price: 800,

    discount: false,

    userComunication: [
      {
        amount: 930,
        img: String(userCommunication[3]),
        name: "views",
        img2: "",
        isActive: false,
      },
      {
        amount: 880,
        img: String(userCommunication[0]),
        name: "like",
        img2: String(userCommunication[4]),
        isActive: false,
      },
      {
        amount: 342,
        img: String(userCommunication[2]),
        name: "favorite",
        img2: String(userCommunication[6]),
        isActive: false,
      },
      {
        amount: 111,
        img: String(userCommunication[1]),
        name: "dislike",
        img2: String(userCommunication[5]),
        isActive: false,
      },
    ],
  },
  {
    characteristics: {
      list: [
        { name: "Number of cores:", info: "Quad core" },
        { name: "Size:", info: "17.3" },
        {
          name: "resolution:",
          info: `1920x1080 (Full HD)`,
        },
      ],
      cardInfo: [
        { name: "Model ID:", info: "AMD Ryzen 5 3500U (2.1-3.7GHz)" },
        { name: "Video card:", info: `AMD Radeon Graphics` },
      ],
      subList: [
        { name: "Type of installed memory:", info: "DDR4" },
        { name: "The amount of memory:", info: "8 GB" },
        { name: "Media type:", info: `HDD, SSD` },
      ],
    },
    productImages: [
      String(laptop_hp17[0]),
      String(laptop_hp17[1]),
      String(laptop_hp17[2]),
      String(laptop_hp17[3]),
      String(laptop_hp17[4]),
    ],
    id: "g13123",
    fullInfo: `HP HP 17-ca1067ur 17.3FHD IPS AG/AMD R5 3500U/8/1000+256F/int/DOS/Silver (22R54EA)
    17.3", FullHD (1920 x 1080), IPS, AMD Ryzen 5 3500U (2.1-3.7GHz), 8 GB, HDD - 1 TB, SSD - 256 GB, AMD Radeon Graphics, DOS, 2.49 kg, silver.`,
    isFavor: false,
    priceDynamic: {},
    comments: [
      {
        owner: "Daniil",
        avatar: require('../assets/images/avatar1.png'),
        message: "This laptop is amazing , my rating 10 balls !!",
        date: {
          month: "Jully",
          year: 2022,
          day: 22,
          hour: 12,
          minute: 33,
          second: 33,
        },
      },
    ],
    purpose:[
      {name:'For game', isActive:true},
      {name:'For fun', isActive:true},
      {name:'For photo', isActive:false},
      {name:'For home life', isActive:false},
      {name:'For work', isActive:false},
    ],
    category: "electronics",
    subCategory: "Laptops",
    img: laptop1,
    title: "Laptop HP 17-ca2017nm",
    design:
      "Dijagonala monitora u incima 17.3,Rezolucija monitora HD+ 1600x900",
    price: 1228,
    discount: false,
    userComunication: [
      {
        amount: 10,
        img: String(userCommunication[3]),
        name: "views",
        img2: "",
        isActive: false,
      },
      {
        amount: 820,
        img: String(userCommunication[0]),
        name: "like",
        img2: String(userCommunication[4]),
        isActive: false,
      },
      {
        amount: 32,
        img: String(userCommunication[2]),
        name: "favorite",
        img2: String(userCommunication[6]),
        isActive: false,
      },
      {
        amount: 21,
        img: String(userCommunication[1]),
        name: "dislike",
        img2: String(userCommunication[5]),
        isActive: false,
      },
    ],
  },
  {
    characteristics: {
      list: [
        { name: "Screen diagonal:", info: "6.5" },
        { name: "Display resolution:", info: "2400 x 1080" },
        { name: "Matrix type:", info: `Super AMOLED` },
      ],
      subList: [
        { name: "Operating memory:", info: "4 GB" },
        { name: "Built-in memory:", info: "125 GB" },
        { name: "Operating system:", info: `Android` },
      ],
      cardInfo: [
        { name: "Processor:", info: "Qualсomm Snapdragon" },
        {
          name: "The number of megapixels of the main camera:",
          info: `64 MP + 12 MP + 5 MP + 5 MP`,
        },
      ],
    },
    productImages: [
      String(samsungGalaxy_a525[0]),
      String(samsungGalaxy_a525[1]),
      String(samsungGalaxy_a525[2]),
      String(samsungGalaxy_a525[3]),
      String(samsungGalaxy_a525[4]),
      String(samsungGalaxy_a525[5]),
    ],
    fullInfo: `Screen (6.5", Super AMOLED, 2400x1080) / Qualcomm Snapdragon 720G (2 x 2.3 GHz + 6 x 1.8 GHz) 
    / main quad camera: 64 MP + 12 MP + 5 MP + 5 MP, front 32 MP / RAM 4 GB / 128 GB of built-in memory + microSD 
    (up to 1 TB)/ 3G/ LTE/ GPS/ A-GPS/ GLONASS/ BDS/ support for 2 SIM cards (Nano-SIM)/ Android 11.0 (One UI)/ 4500 mAh.`,
    id: "990124g",
    isFavor: false,
    priceDynamic: {},
    purpose:[
      {name:'For video', isActive:true},
      {name:'For fun', isActive:true},
      {name:'For photo', isActive:true},
      {name:'For home life', isActive:false},
      {name:'For work', isActive:false},
    ],
    comments: [
      {
        owner: "Daniil",
        avatar: require('../assets/images/avatar1.png'),
        message: "Very nice device, my rating 10 balls !",
        date: {
          month: "Jully",
          year: 2022,
          day: 22,
          hour: 12,
          minute: 33,
          second: 33,
        },
      },
    ],
    category: "electronics",
    subCategory: "Smartphones",
    img: require("../assets/images/samsung_galaxy_a525/slide8.webp"),
    title: "Smartphone Samsung Galaxy A52 4",
    design:
      "Several qualities of the Samsung Galaxy A52 screen are clearly visible from the first seconds",
    price: 500,
    discount: false,
    userComunication: [
      {
        amount: 630,
        img: String(userCommunication[3]),
        name: "views",
        img2: "",
        isActive: false,
      },
      {
        amount: 580,
        img: String(userCommunication[0]),
        name: "like",
        img2: String(userCommunication[4]),
        isActive: false,
      },
      {
        amount: 332,
        img: String(userCommunication[2]),
        name: "favorite",
        img2: String(userCommunication[6]),
        isActive: false,
      },
      {
        amount: 1311,
        img: String(userCommunication[1]),
        name: "dislike",
        img2: String(userCommunication[5]),
        isActive: false,
      },
    ],
  },
  {
    purpose:[
      {name:'For travel', isActive:true},
      {name:'For shipping', isActive:false},
      {name:'For racing', isActive:true},
      {name:'For party', isActive:false},
      {name:'For security', isActive:false},
    ],
    characteristics: {
      list: [
        { name: "Race:", info: "160 тис. км" },
        { name: "Engine:", info: "3 l • Gasoline" },
        {
          name: "Design:",
          info: `Is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        },
      ],
      subList: [
        { name: "Color:", info: "White metallic" },
        { name: "Transmission:", info: "Tiptronic" },
        { name: "Occasion:", info: `Full` },
      ],
      cardInfo: [
        {
          name: "Security:",
          info: "Central locking • Anti-lock braking system (ABS) • Alarm system • Stabilization system (ESP)",
        },
        {
          name: "Comfort:",
          info: `On-board computer • Heated mirrors • Heated steering wheel • Engine start from the button`,
        },
      ],
    },
    productImages: [
      String(bmw_x6[6]),
      String(bmw_x6[1]),
      String(bmw_x6[2]),
      String(bmw_x6[3]),
      String(bmw_x6[4]),
      String(bmw_x6[5]),
    ],
    fullInfo: `Europe 3.5X Drive. Official. Model series 2010 restaling, in technical pasp 2009,
    official, menu in Russian. Fully serviced, up to 170,000 in Bavaria. Maximum configuration.
    Door closers, electric trunk, all-round view, parking sensors, auto on and off high beam,
    auto-dimming mirrors, heated rear seats, four-zone climate control. On X6 there are decorations,
    supported the general appearance of the car, who is looking for not painted, please do not come to us. Two sets of wide discs
    R22 on new tires and R19 on winter tires, or R20 new wheels on completely new tires.
    I've owned the car for one hour, it's the third car in the family, before that it was in the same hands. 
    `,
    id: "1199012224g",
    isFavor: false,
    priceDynamic: {},
    comments: [
      {
        owner: "Zherebko Daniil",
        avatar: "alt.png",
        message: "Very nice device, my rating 10 balls !",
        date: {
          month: "Jully",
          year: 2022,
          day: 22,
          hour: 12,
          minute: 33,
          second: 33,
        },
      },
    ],
    category: "cars",
    subCategory: "bmw",
    img: String(bmw_x6[0]),
    title: "BMW X6",
    design:
      "Two sets of R22 wide rims on new tires and R19 on winter tires, or R20 new rims on absolutely new tires.",
    price: 22500,
    discount: false,

    userComunication: [
      {
        amount: 230,
        img: String(userCommunication[3]),
        name: "views",
        img2: String(userCommunication[3]),
        isActive: false,
      },
      {
        amount: 120,
        img: String(userCommunication[0]),
        name: "like",
        img2: String(userCommunication[4]),
        isActive: false,
      },
      {
        amount: 782,
        img: String(userCommunication[2]),
        name: "favorite",
        img2: String(userCommunication[6]),
        isActive: false,
      },
      {
        amount: 61,
        img: String(userCommunication[1]),
        name: "dislike",
        img2: String(userCommunication[5]),
        isActive: false,
      },
    ],
  },
  {
    characteristics: {
      list: [
        { name: "Our Style No:", info: "PLAU-MS60" },
        { name: "Made in:", info: "Turkey" },
        {
          name: "Cleaning:",
          info: `Machine wash`,
        },
      ],
      subList: [
        { name: "Color:", info: "White" },
        { name: "Manufacturer Style No:", info: "710871253001" },
      ],
      cardInfo: [
        { name: "Matterial:", info: "100% cotton" },
        { name: "Made in:", info: `Turkey` },
      ],
    },
    purpose:[{name:'For summer', isActive:true},
      {name:'For winter', isActive:false},
      {name:'For othem', isActive:false},
      {name:'For spring', isActive:true}],
    productImages: [
      String(polo_tshort[0]),
      String(polo_tshort[1]),
      String(polo_tshort[2]),
    ],
    fullInfo: `Europe 3.5X Drive. Official. Model series 2010 restaling, in technical pasp 2009,
    official, menu in Russian. Fully serviced, up to 170,000 in Bavaria. Maximum configuration.
    Door closers, electric trunk, all-round view, parking sensors, auto on and off high beam,
    auto-dimming mirrors, heated rear seats, four-zone climate control. On X6 there are decorations,
    supported the general appearance of the car, who is looking for not painted, please do not come to us. Two sets of wide discs
    R22 on new tires and R19 on winter tires, or R20 new wheels on completely new tires.
    I've owned the car for one hour, it's the third car in the family, before that it was in the same hands. 
    `,
    id: "11990awf12224g",
    isFavor: false,
    priceDynamic: {},
    comments: [
      {
        owner: "Zherebko Daniil",
        avatar: "alt.png",
        message: "Very nice device, my rating 10 balls !",
        date: {
          month: "Jully",
          year: 2022,
          day: 22,
          hour: 12,
          minute: 33,
          second: 33,
        },
      },
    ],
    category: "clothing",
    subCategory: "shirt",
    img: String(polo_tshort[0]),
    title: "Polo Ralph Lauren Graphic Tee in white",
    design:
      "Two sets of R22 wide rims on new tires and R19 on winter tires, or R20 new rims on absolutely new tires.",
    price: 100,
    discount: false,

    userComunication: [
      {
        amount: 130,
        img: String(userCommunication[3]),
        name: "views",
        img2: String(userCommunication[3]),
        isActive: false,
      },
      {
        amount: 1220,
        img: String(userCommunication[0]),
        name: "like",
        img2: String(userCommunication[4]),
        isActive: false,
      },
      {
        amount: 382,
        img: String(userCommunication[2]),
        name: "favorite",
        img2: String(userCommunication[6]),
        isActive: false,
      },
      {
        amount: 612,
        img: String(userCommunication[1]),
        name: "dislike",
        img2: String(userCommunication[5]),
        isActive: false,
      },
    ],
  },
];
