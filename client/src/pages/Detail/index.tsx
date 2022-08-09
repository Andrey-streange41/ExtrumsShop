import React, { FC, useState } from "react";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer/index.jsx";
import Header from "../../components/Header/Header.jsx";
import { ProductImagesSlider } from "../../components/ProductImagesSlider/index.tsx";
import { NavBar } from "../../components/NavBar/index.jsx";
import ms from "./style.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import birka from "../../assets/images/birka.png";
import {
  likeCliked,
  dislikeCliked,
  removeFromFavoriteList,
  addToFavorite,
} from "../../app/slices/productsListSlice.ts";
import { CommentsList } from "./CommentsList/index.tsx";

export const Detail = () => {
  const { id } = useParams();
  const productList = useSelector((s) => s.productsList.productsList);
  const item = productList.filter((item) => item.id === id)[0];
  const dispatch = useDispatch();
  const list = useSelector((s) => s.productsList.favoriteList);

  const addToFavoriteList = () => {
    if (list.findIndex((el) => el.id === item.id) >= 0) {
      dispatch(removeFromFavoriteList({ ...item, isFavor: false }));
      return;
    }
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element.title === item.title) return;
    }

    localStorage.setItem("favorList", JSON.stringify([...list, item]));
    dispatch(addToFavorite({ ...item, isFavor: true }));
  };

  const removeFromFavorite = () => {
    let buffer = JSON.parse(localStorage.getItem("favorList"));
    buffer = buffer.filter((i) => i.title !== item.title);
    localStorage.setItem("favorList", JSON.stringify(buffer));
    dispatch(removeFromFavoriteList(item));
  };

  return (
    <>
      <section className={ms.container}>
        <Header />
        <section className={ms.container__field}>
          <NavBar />
          <section className={ms.container__field__content}>
            <section className={ms.container__field__content__row1}>
              <section className={ms.container__field__content__row1__galery}>
                <section
                  className={ms.container__field__content__row1__galery__swiper}
                >
                  <ProductImagesSlider images={item.productImages} />
                </section>
              </section>
              <section className={ms.container__field__content__row1__cardInfo}>
                <section
                  className={ms.container__field__content__row1__cardInfo__UI}
                >
                  {item.userComunication.map((el, index) => (
                    <section
                      key={index}
                      className={
                        ms.container__field__content__row1__cardInfo__UI__item
                      }
                    >
                      <img
                        onClick={
                          el.name === "like"
                            ? () => {
                                dispatch(likeCliked(item.id));
                              }
                            : el.name === "dislike"
                            ? () => dispatch(dislikeCliked(item.id))
                            : el.name === "favorite" &&
                              list.findIndex((el) => el.id === item.id) >= 0
                            ? removeFromFavorite
                            : el.name === "favorite" &&
                              list.findIndex((el) => el.id === item.id) < 0
                            ? addToFavoriteList
                            : () => {}
                        }
                        src={
                          el.name === "like" && el.isActive
                            ? el.img2
                            : el.name === "like" && !el.isActive
                            ? el.img
                            : el.name === "dislike" && el.isActive
                            ? el.img
                            : el.name === "dislike" && !el.isActive
                            ? el.img2
                            : el.name === "favorite" &&
                              list.findIndex((el) => el.id === item.id) < 0
                            ? el.img2
                            : el.name === "favorite" &&
                              list.findIndex((el) => el.id === item.id) >= 0
                            ? el.img
                            : el.img
                        }
                        alt="UI.png"
                      />
                      <span>{el.amount}</span>
                    </section>
                  ))}
                </section>
                <h2
                  className={
                    ms.container__field__content__row1__cardInfo__title
                  }
                >
                  {item.title}
                </h2>
                <section
                  className={
                    ms.container__field__content__row1__cardInfo__addInfo
                  }
                >
                  {item.characteristics.cardInfo.map((el) => (
                    <section
                      key={Math.random()}
                      className={
                        ms.container__field__content__row1__cardInfo__addInfo__descr
                      }
                    >
                      <span
                        className={
                          ms.container__field__content__row1__cardInfo__addInfo__descr__design
                        }
                      >
                        {el.name}
                      </span>
                      <span
                        className={
                          ms.container__field__content__row1__cardInfo__addInfo__descr__text
                        }
                      >
                        {el.info}
                      </span>
                    </section>
                  ))}
                </section>
                <section
                  className={
                    ms.container__field__content__row1__cardInfo__price
                  }
                >
                  <img src={birka} alt="birka.png" />
                  <span>${item.price}</span>
                </section>
              </section>
            </section>
            <section className={ms.container__field__content__row2}>
              <Menu item={item} />
            </section>
          </section>
        </section>
      </section>
      <Footer />
    </>
  );
};

const Menu = ({ item }) => {
  const [menuItems, setItems] = useState([
    {
      isActive: true,
      text: "Description",
      modal: <FullInfo item={item} />,
    },
    {
      isActive: false,
      text: "Characteristics",
      modal: <Characteristics item={item} />,
    },
    {
      isActive: false,
      text: `Comments (${item.comments.length})`,
      modal: <CommentsList item ={item}/>,
    },
    {
      isActive: false,
      text: "Price dynamics",
      modal: <ViewsChart item={item}/>,
    },
  ]);

  return (
    <>
      <ul className={ms.container__field__content__row2__menu}>
        {menuItems.map((el, index) => (
          <li
            key={index}
            className={el.isActive ? ms.active : ""}
            onClick={() => {
              let tmp = [...menuItems];
              for (let i = 0; i < tmp.length; i++) {
                const element = tmp[i];
                element.isActive = false;
              }
              tmp[index].isActive = true;
              setItems(tmp);
            }}
          >
            {el.text}
          </li>
        ))}
      </ul>
      {menuItems[menuItems.findIndex((el) => el.isActive)].modal}
    </>
  );
};

const FullInfo = ({ item }) => {
  return (
    <>
      <p className={ms.container__field__content__row2__textInfo}>
        {item.fullInfo}
      </p>
    </>
  );
};

const Characteristics = ({ item }) => {
  return (
    <>
      <section className={ms.container__field__content__row2__characteristics}>
        <section
          className={
            ms.container__field__content__row2__characteristics__leftMenu
          }
        >
          {item.characteristics.list.map((item) => (
            <section
              key={Math.random()}
              className={
                ms.container__field__content__row2__characteristics__leftMenu__row
              }
            >
              <span>{item.name}</span>
              <span>{item.info}</span>
            </section>
          ))}
        </section>
        <section
          className={
            ms.container__field__content__row2__characteristics__rightMenu
          }
        >
          {item.characteristics.subList.map((item) => (
            <section
              key={Math.random()}
              className={
                ms.container__field__content__row2__characteristics__leftMenu__row
              }
            >
              <span>{item.name}</span>
              <span>{item.info}</span>
            </section>
          ))}
        </section>
      </section>
    </>
  );
};



const ViewsChart =  ({item}) => {

   const [data,setData] = useState ([
    ["Month", "views"],
    ["January", Math.random() * (100000 -0) + 0],
    ["February", Math.random() * (100000 -0) + 0],
    ["March", Math.random() * (100000 -0) + 0],
    ["Appril", Math.random() * (100000 -0) + 0],
    ["May", Math.random() * (100000 -0) + 0],
    ["June", Math.random() * (100000 -0) + 0],
    ["July", Math.random() * (100000 -0) + 0],
  ]);

  const options = {
    title: "Views",
    curveType: "function",
    legend: { position: "bottom" },
  };
  return (
      <Chart chartType={"LineChart"}
        width={"100%"}
        height={"400px"}
        data={data}
        options={options}
      />
  );
}