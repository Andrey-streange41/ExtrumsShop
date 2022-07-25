import React from 'react';
import { Footer } from '../../components/Footer';
import Header from '../../components/Header/Header.jsx';
import { NavBar } from '../../components/NavBar';
import ms from './style.module.scss';
import avatar from '../../assets/images/Avatar.png'

export const AccountInfo = () => {
  return (
    <>
    <section className={ms.container}>
         <Header />
         <section className={ms.container__field}>
         <NavBar />
         <section className={ms.container__field__content}>
            <h1>Account Setting</h1>  
            <section className={ms.container__field__content__body} >
                <section className={ms.container__field__content__body__avatar}>
                    <img src={avatar} alt="avatar.png" />
                    <section className={ms.container__field__content__body__avatar__button}>
                        Change Foto
                    </section>
                </section>
            </section>
        </section>
         </section>
    </section>
    <Footer/>
    </>
  )
}
