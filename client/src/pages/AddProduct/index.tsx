import React, { ChangeEvent, FC, MouseEventHandler, useEffect, useState } from 'react';
import ms from './style.module.scss';
import Header from '../../components/Header/Header.jsx';
import { NavBar } from '../../components/NavBar/index.jsx';
import { Footer } from '../../components/Footer/index.jsx';
import selectImg from '../../assets/images/selectImg.png';
import { SelectedImagesList } from '../../components/SelectedImagesList/index.tsx';
import { Input } from '../../components/UI/Input/Input.tsx';
import { ListView } from '../../components/UI/ListView/index.tsx';
import { modalItems } from '../../localDB/index.ts';
import { SelectedCharacteristicsList } from '../../components/SelectedCharacteristicList/index.tsx';
import { Button } from '../../components/UI/Button/index.tsx';
import {addProduct} from '../../http/productApi.ts';

export const AddProduct: FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [categories] = useState<string[]>(modalItems.map(el => el.title));
  const [activeCategory, setActiveCategory] = useState<string>("Select");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("Select");
  const [selectedCharacteristicsList, setCharacteristicsList] = useState([]);
  const [characteristick, setCharacteristick] = useState({ name: '', info: '' });
  const [productInfo,setProductInfo] = useState({title:'',price:0,discription:''});
 
  useEffect(() => {
    setSubCategories(modalItems.find(el => el.title === activeCategory)?.items.map(el => el.category));
    setActiveSubCategory('Select')
  }, [activeCategory])

  const handleClickListView = (e: MouseEvent) => {
    if (categories.includes(e.target.innerHTML)) {
      setActiveCategory(e.target.innerHTML);
    }
    else {
      setActiveSubCategory(e.target.innerHTML);
    }
  }
  const addCharacteristic = () => {
      setCharacteristicsList([...selectedCharacteristicsList, characteristick]);
  }
  const setCharacteristic = (e:ChangeEvent<HTMLInputElement>)=>{
    setCharacteristick({...characteristick,[e.target.name]:e.target.value});
  }
  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setProductInfo({...productInfo, [e.target.name]:e.target.value});
  }

  const handleSelectFile = (e) =>{
    setImages([...images,e.target.files[0]]);
  }
  const removeImage = (e,target) => {
      setImages(images.filter(el=>el.name !== target.name));
  }
  const sendData = () =>{
      addProduct();
      
  }

  return (
    <>
      <section className={ms.container}>
        <Header />
        <section className={ms.container__field}>
          <NavBar />
          <section className={ms.container__field__content}>
            <h1>Add Product</h1>
            <section className={ms.container__field__content__row}>
              <section className={ms.container__field__content__row__col}>
                <h2>Add Images</h2>
                <section className={ms.container__field__content__row__col__imgArea}>
                  <img src={selectImg} />
                  <span>Select Files...</span>
                  <input onChange={handleSelectFile} type="file" />
                </section>
                <SelectedImagesList removeItem={removeImage} images={images} />
              </section>
              <section className={ms.container__field__content__row__col}>
                <section className={ms.container__field__content__row__col__inputs}>
                  <Input name={'title'} value={productInfo.title} handleChange={handleChange} label={'Product Name'} />
                  <Input name={'price'} value={productInfo.price} handleChange={handleChange} label={'Price'} />
                  <ListView selectedItem={activeCategory} onClick={handleClickListView} list={categories} />
                  <ListView selectedItem={activeSubCategory} onClick={handleClickListView} list={subCategories} />
                  <span className={ms.container__field__content__row__col__inputs__descriptionLabel}>Desription</span>
                  <textarea onChange={handleChange} 
                  name={'discription'} 
                  value={productInfo.discription} 
                  maxLength={420} 

                  className={ms.container__field__content__row__col__inputs__detail}>
                  </textarea>
                  <span className={ms.container__field__content__row__col__inputs__descriptionLabel}>Characteristics</span>
                  <section className={ms.container__field__content__row__col__inputs__characteristics}>
                    <span>Name:</span> <input value={characteristick.name} name='name' type="text" onChange={setCharacteristic}/> 
                    <span>Value:</span> <input value={characteristick.info} name='info' type="text"  onChange={setCharacteristic}/>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className={ms.container__field__content__row__col__inputs__characteristics__addButton}
                      onClick={addCharacteristic}
                    >
                      <path fill="#000000" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                  </section>
                  <SelectedCharacteristicsList list={selectedCharacteristicsList} />

                </section>

              </section>
            </section>
            <Button handleSubmit={sendData} text={'Publish product'} />
          </section>
        </section>
      </section>
      <Footer />
    </>
  )
}


