import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import ms from "./style.module.scss";
import Header from "../../components/Header/Header.jsx";
import { NavBar } from "../../components/NavBar/index.jsx";
import { Footer } from "../../components/Footer/index.jsx";
import selectImg from "../../assets/images/selectImg.png";
import { SelectedImagesList } from "../../components/SelectedImagesList/index.tsx";
import { Input } from "../../components/UI/Input/Input.tsx";
import { ListView } from "../../components/UI/ListView/index.tsx";
import { modalItems } from "../../localDB/index.ts";
import { SelectedCharacteristicsList } from "../../components/SelectedCharacteristicList/index.tsx";
import { Button } from "../../components/UI/Button/index.tsx";
import { addProduct } from "../../http/productApi.ts";
import { KeyValueInput } from "../../components/UI/KeyValueInput/index.tsx";
import { PurposeMenu } from "../../components/PurposeMenu/index.tsx";
import { PurposeList } from "../../components/PurposeList/index.tsx";

export const AddProduct: FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [tagName, setTagName] = useState<string>("");

  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [categories] = useState<string[]>(modalItems.map((el) => el.title));
  const [activeCategory, setActiveCategory] = useState<string>("Select");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("Select");
  const [selectedCharacteristicsList, setCharacteristicsList] = useState<[]>(
    []
  );

  const [characteristick, setCharacteristick] = useState({
    name: "",
    info: "",
  });
  const [purposeList, setPurposeList] = useState<string[]>([]);

  interface IProudctInfo {
    title: string;
    price: number;
    discription: string;
  }
  const [productInfo, setProductInfo] = useState<IProudctInfo>({
    title: "",
    price: 0,
    discription: "",
  });

  useEffect(() => {
    setSubCategories(
      modalItems
        .find((el) => el.title === activeCategory)
        ?.items.map((el) => el.category)
    );
    setActiveSubCategory("Select");
  }, [activeCategory]);

  const handleClickListView = (e: MouseEvent<HTMLLIElement>) => {
    if (categories.includes(e.target.innerHTML)) {
      setActiveCategory(e.target.innerHTML);
    } else {
      setActiveSubCategory(e.target.innerHTML);
    }
  };
  const addCharacteristic = (item) => {

    if (
      selectedCharacteristicsList.findIndex((el) => el.name === item.name) < 0
    )
      {setCharacteristicsList([...selectedCharacteristicsList, item]);
      setCharacteristic({name:'',info:''})}
  };
  const setCharacteristic = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacteristick({ ...characteristick, [e.target.name]: e.target.value });
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const handleSelectFile = (e) => {
    setImages([...images, e.target.files[0]]);
  };
  const removeImage = (e, target) => {
    setImages(images.filter((el) => el.name !== target.name));
  };
  const sendData = () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      const element = images[i];
      formData.append("files", element);
    }
    formData.append("categori", activeCategory);
    formData.append("subCategory", activeSubCategory);
    formData.append(
      "characteristics",
      JSON.stringify(selectedCharacteristicsList)
    );
    formData.append("productInfo", JSON.stringify(productInfo));
    formData.append("purpose", JSON.stringify(purposeList));

    addProduct(formData);
  };

  const addTag = (tag: string) => {
    if (!purposeList.includes(tag)) setPurposeList([...purposeList, tag]);
  };

  const removeTag = (tag: string) => {
    setPurposeList(purposeList.filter((el) => el !== tag));
  };

  const removeCharacter = (name: string) => {
    setCharacteristicsList(
      selectedCharacteristicsList.filter((el) => el.name !== name)
    );
  };

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
                <section
                  className={ms.container__field__content__row__col__imgArea}
                >
                  <img src={selectImg} />
                  <span>Select Files...</span>
                  <input onChange={handleSelectFile} type="file" />
                </section>
                <SelectedImagesList removeItem={removeImage} images={images} />
              </section>
              <section className={ms.container__field__content__row__col}>
                <section
                  className={ms.container__field__content__row__col__inputs}
                >
                  <Input
                    name={"title"}
                    value={productInfo.title}
                    handleChange={handleChange}
                    label={"Product Name"}
                  />
                  <Input
                    name={"price"}
                    value={productInfo.price}
                    handleChange={handleChange}
                    label={"Price"}
                  />
                  <ListView
                    label={"category"}
                    selectedItem={activeCategory}
                    onClick={handleClickListView}
                    list={categories}
                  />
                  <ListView
                    label={"Sub category"}
                    selectedItem={activeSubCategory}
                    onClick={handleClickListView}
                    list={subCategories}
                  />
                  <span
                    className={
                      ms.container__field__content__row__col__inputs__descriptionLabel
                    }
                  >
                    Desription
                  </span>
                  <textarea
                    onChange={handleChange}
                    name={"discription"}
                    value={productInfo.discription}
                    maxLength={420}
                    className={
                      ms.container__field__content__row__col__inputs__detail
                    }
                  ></textarea>
                  <span
                    className={
                      ms.container__field__content__row__col__inputs__descriptionLabel
                    }
                  >
                    Characteristics
                  </span>
                  <KeyValueInput name={characteristick.name} info={characteristick.info} add={addCharacteristic} />
                  <SelectedCharacteristicsList
                    removeCharacter={removeCharacter}
                    list={selectedCharacteristicsList}
                  />

                  <PurposeMenu
                    tagName={tagName}
                    add={addTag}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setTagName(e.target.value)
                    }
                  />
                  <PurposeList removeTag={removeTag} list={purposeList} />
                </section>
              </section>
            </section>
            <Button handleSubmit={sendData} text={"Publish product"} />
          </section>
        </section>
      </section>
      <Footer />
    </>
  );
};
