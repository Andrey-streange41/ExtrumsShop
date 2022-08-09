import React, { FC,useState } from 'react';
import { Chart } from "react-google-charts";
import { Link } from 'react-router-dom';
import ms from './style.module.scss';
import { NavBar } from '../../components/NavBar/index.jsx';
import Header from '../../components/Header/Header.jsx';
import { Footer } from '../../components/Footer/index.jsx';
import { OutlineButton } from '../../components/UI/Button/index.tsx';
import views from '../../assets/images/views.png';
import compas from '../../assets/images/compas.png';
import store from '../../assets/images/store.png';
import { StatistickCard } from '../../components/StatistickCard/index.tsx';
import percent from '../../assets/images/percent.png';
import customers from '../../assets/images/customers.png';
import products from '../../assets/images/products.png'
import pie from '../../assets/images/chart-pie.png';
import { useSelector } from 'react-redux';


export const Admin: FC = () => {
  const statistick = [
    {
      img:views,
      title:"Views",
      amount:500,
      info:"Per Day"
    },
    {
      img:compas,
      title:"Visits",
      amount:20000,
      info:"Per minutes"
    },
    {
      img:store,
      title:"Orders",
      amount:5100,
      info:"Per Day"
    },
  ]
  const cards = [
    {
      title:"Sales",
      amount:"$500",
      info:"Total Sales Today",
      proc:55,
      color:'rgb(224, 255, 198)'
    },
    {
      title:"Profit",
      amount:"$150",
      info:"Per day ratio",
      proc:30,
      color:'#e7d3ff'
    },
    {
      title:"Orders",
      amount:'1000',
      info:"Total orders",
      proc:80,
      color:'#d3f1ff'
    },
    {
      title:"Visits",
      amount:'400',
      info:"Total Visits today",
      proc:80,
      color:'rgb(245, 199, 207)'
    }
  ]
  const revenueList = [
    {
      img:percent,
      amount:'230k',
      title:'Sales'
    },
    {
      img:customers,
      amount:'8230k',
      title:'Customers'
    },
    {
      img:products,
      amount:'230k',
      title:'Products'
    },
    {
      img:pie,
      amount:'$9745',
      title:'Revenue'
    }
  ]
 const [data]  = useState([
    ["Element", "Density", { role: "style" }],
    ["Electronic", 8.94, "#b87333"], 
    ["Cars", 10.49, "silver"], 
    ["Clouthing", 19.3, "gold"],
    ["Mebel", 21.45, "color: #e5e4e2"], 
  ]);
  const user = useSelector(s=>s.user.userData);
  const isAuth = useSelector(s=>s.user.isAuth);
  const addProduct = () => {

  }

  return (

    isAuth?
    <>
      <section className={ms.container}>
        <Header />
        <section className={ms.container__field}>
          <NavBar />
          <section className={ms.container__field__content}>
            <section className={ms.container__field__content__col1}>
              <section className={ms.container__field__content__col1__row1}>
                <section className={ms.container__field__content__col1__row1__greeting}>
                  <h1>Hello {user.firstname}</h1>
                  <span>Welcome Back !</span>
                </section>
                <Link style={{textDecoration:'none'}} to={'/admin/addProduct'}>
                  <OutlineButton  text={"Add product"} width={150} />
                </Link>
              </section>
                <ul className={ms.container__field__content__col1__statistick}>
                  {statistick.map(el=><li key={el.title} className={ms.container__field__content__col1__statistick__item +' '+ ms.col}> 
                    <div className={ms.container__field__content__col1__statistick__item__icon}>
                        <img src={el.img} alt="alt.png" />
                    </div>
                    <span className={ms.container__field__content__col1__statistick__item__title}>{el.title}</span>
                     <span className={ms.container__field__content__col1__statistick__item__amount}>{el.amount}</span>
                     <span className={ms.container__field__content__col1__statistick__item__info}>{el.info}</span>
                  </li>)}
                </ul>
                <ul className={ms.container__field__content__col1__list}>
                   { cards.map(el=><StatistickCard key={el.title} item={el}/>)}
                </ul>
            </section>
            <section className={ms.container__field__content__col2}>
              <h2>Sales Revenue</h2>
              <ul  className={ms.container__field__content__col2__list}>
                  {revenueList.map(el=><li className={ms.container__field__content__col2__list__item}> 
                    <section className={ms.container__field__content__col2__list__item__round}>
                      <img src={el.img} alt="" />
                    </section>
                    <section className={ms.container__field__content__col2__list__item__info}>
                      <span>{el.amount}</span>
                      <span>{el.title}</span>
                    </section>
                  </li>)}
              </ul>
              <h2>Statisticks</h2>
              <Chart chartType="ColumnChart"  height="400px" data={data} />
            </section>

          </section>
        </section>
      </section>
      <Footer />
    </>
    :
    <>
     <h1> Forbiden ! 403</h1>
     <img width={'100%'} src={require('../../assets/images/forbiden.jpg')} alt="" />
    </>
  )
}
