import { $authHost, $host } from "./index.ts";

export const addProduct = async (product) => {
  try {
    const responce = await $authHost.post("/api/products", product);
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getProducts = async () => {
  try {
    const { data } = await $host.get("/api/products");
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const updateComunicationByProductId = async (data) => {
  try {
    const responce = await $host.put("api/products", data);
    return responce.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const addToFavorites = async(product) => {
try {
    const responce = await $authHost.post('api/products/favorites', product);
    return responce.data;
} catch (error) {
    return error;
}
}

export const removeFromFavorites = async(data) => {
    try {
        const responce = await $authHost.delete(`api/products/favorites`,{data: {
          data: data
        }});
        return responce.data;
    } catch (error) {
        alert('This option need authorization !')
        console.log(error.message);
        return error;
    }
}

export const getFavoriteList = async (userId:number)=> {
  try {
    const responce = await $host.get(`api/products/favorites/take${userId}`);
    return responce.data;
  } catch (error) {
    console.log(error.message+' FAVOR LIST GET ERROR!');
    return error;
  }
}


export const addComment = async(data)=>{
  try {
    const responce = await $host.post('api/products/comments', data);
    console.log(responce.data);
    
    return responce.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}



export const getComments = async(id)=> {
  try {
     const responce =  await $host.get(`api/products/comments/${id}`);
     return responce.data;
  }
   catch (error) {
    console.log(error.message);
    return error;
  }
}