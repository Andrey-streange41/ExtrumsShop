import React, { FC, useState, useEffect } from "react";
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
import { userCommunication } from "../../assets/images/index.js";
import birka from "../../assets/images/birka.png";
import { CommentsList } from "./CommentsList/index.tsx";
import {
  updateProductsThunk,
  addToFavoritesThunk,
  removeFromFavoriteListThunk,
} from "../../app/slices/productsListSlice.ts";
import { getCommentsThunk } from "../../app/slices/commentsSlice.ts";
import Loader from "../../components/Loader/index.tsx";
import { IProduct, IUserInterfaceItem } from "../../types/favoriteList.types.js";

export const Detail: FC = () => {
  const { id } = useParams();
  const productList = useSelector((s) => s.productsList.testList);
  const [item,setItem] = useState<IProduct>();
  const dispatch = useDispatch();
  const isAuth = useSelector((s) => s.user.isAuth);
  const [coms, setComs] = useState<IUserInterfaceItem[]>([]);
  const user = useSelector((s) => s.user.userData);
  const loading = useSelector((s) => s.productsList.loading);
  const error = useSelector(s=>productList.error);
  

  const handleFavoriteClick = () => {
    if (!isAuth) {
      alert("You must sign in to you account for this option !");
      return;
    }
    dispatch(
      updateProductsThunk({
        name: "favorites",
        id: item.id,
      })
    )
      .then((data) => {
        const favoriteState = data.payload
          .find((el) => el.id === item.id)
          .userComunications.find((el) => el.name === "favorites").isActive;
        if (favoriteState === true) {
          dispatch(
            addToFavoritesThunk({ productId: item.id, userId: user.id })
          );
        } else {
          dispatch(
            removeFromFavoriteListThunk({ productId: item.id, userId: user.id })
          );
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    setItem(productList.filter((item) => item.id === Number(id))[0]);
    if (loading === "idle") {
      setComs([...productList.filter((item) => item.id === Number(id))[0]?.userComunications]
       ?.sort((a, b) =>
          {return String(a.name).localeCompare(b.name)}
        )
      );
    };
  }, [item?.id, loading]);

    if(loading === 'failed')
    {
      return <h1>{error.message}</h1>
    }



  return loading === "penging" || !item ? (
   <section className={ms.loader}> 
    <Header/>
      <Loader/> 
      <h1>Loading...</h1>
   </section>
  ) : (
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
                  <ProductImagesSlider
                    images={item?.images ? JSON.parse(item?.images) : []}
                  />
                </section>
              </section>
              <section className={ms.container__field__content__row1__cardInfo}>
                <section
                  className={ms.container__field__content__row1__cardInfo__UI}
                >
                  {coms?.map((el, index) => (
                    <section
                      key={index}
                      className={
                        ms.container__field__content__row1__cardInfo__UI__item
                      }
                    >
                      <img
                        onClick={
                          el.name === "likes"
                            ? () => {
                                if (!isAuth) {
                                  alert(
                                    "You must sign in to you account for this option !"
                                  );
                                  return;
                                }
                                dispatch(
                                  updateProductsThunk({
                                    name: "likes",
                                    id: item.id,
                                  })
                                );
                              }
                            : el.name === "dislikes"
                            ? () => {
                                if (!isAuth) {
                                  alert(
                                    "You must sign in to you account for this option !"
                                  );
                                  return;
                                }
                                dispatch(
                                  updateProductsThunk({
                                    name: "dislikes",
                                    id: item.id,
                                  })
                                );
                              }
                            : el.name === "favorites"
                            ? handleFavoriteClick
                            : () => {}
                        }
                        src={
                          el.name === "likes" && el.isActive
                            ? userCommunication[4]
                            : el.name === "likes" && !el.isActive
                            ? userCommunication[0]
                            : el.name === "dislikes" && el.isActive
                            ? userCommunication[1]
                            : el.name === "dislikes" && !el.isActive
                            ? userCommunication[5]
                            : el.name === "favorites" && el.isActive
                            ? userCommunication[2]
                            : el.name === "favorites" && !el.isActive
                            ? userCommunication[6]
                            : userCommunication[3]
                        }
                        alt={"UI.png"}
                        className={
                          el.name === "likes" ||
                          el.name === "dislikes" ||
                          el.name === "favorites"
                            ? ms.scaleUp
                            : ""
                        }
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
                  {item?.title}
                </h2>
                <section
                  className={
                    ms.container__field__content__row1__cardInfo__addInfo
                  }
                >
                  {item?.characteristics?.map((el) => (
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
                  <span>${item?.price}</span>
                </section>
              </section>
            </section>
            <section className={ms.container__field__content__row2}>
              {<Menu  item={item} />}
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
      text: `Comments (${item?.comments.length})`,
      modal: <CommentsList item={item}/>,
    },
    {
      isActive: false,
      text: "Price dynamics",
      modal: <ViewsChart item={item} />,
    },
  ]);
 
  const dispatch = useDispatch();
  useEffect(()=>{
        dispatch(getCommentsThunk(item?.id));
        setItems(menuItems);
  },[item.comments,item]);

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
        {item?.full_info}
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
          {item?.characteristics?.map((item, index) => {
            if (index > 2) {
              return;
            }
            return (
              <section
                key={Math.random()}
                className={
                  ms.container__field__content__row2__characteristics__leftMenu__row
                }
              >
                <span>{item?.name}</span>
                <span>{item?.info}</span>
              </section>
            );
          })}
        </section>
        <section
          className={
            ms.container__field__content__row2__characteristics__rightMenu
          }
        >
          {item?.characteristics?.map((item, index) => {
            if (index <= 2) {
              return;
            }
            return (
              <section
                key={Math.random()}
                className={
                  ms.container__field__content__row2__characteristics__leftMenu__row
                }
              >
                <span>{item.name}</span>
                <span>{item.info}</span>
              </section>
            );
          })}
        </section>
      </section>
    </>
  );
};

const ViewsChart = ({ item }) => {
  const [data, setData] = useState([
    ["Month", "views"],
    ["January", Math.random() * (100000 - 0) + 0],
    ["February", Math.random() * (100000 - 0) + 0],
    ["March", Math.random() * (100000 - 0) + 0],
    ["Appril", Math.random() * (100000 - 0) + 0],
    ["May", Math.random() * (100000 - 0) + 0],
    ["June", Math.random() * (100000 - 0) + 0],
    ["July", Math.random() * (100000 - 0) + 0],
  ]);

  const options = {
    title: "Views",
    curveType: "function",
    legend: { position: "bottom" },
  };
  return (
    <Chart
      chartType={"LineChart"}
      width={"100%"}
      height={"400px"}
      data={data}
      options={options}
    />
  );
};
