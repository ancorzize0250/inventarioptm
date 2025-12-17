import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';
const API_INFO_URL = 'http://localhost:8080/api/information';

const ProductService = {
  // obtener listado
  getAllProducts: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // crear
  createProduct: async (productData) => {
    try {
      const response = await axios.post(API_URL, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // actualizar
  updateProduct: async (id, productData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

 //eliminar
  deleteProduct: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  },
 
  //obtenemos las combinaciones
  getProductCombinations: async (maxValue) => {
    try {
      const response = await axios.get(`${API_INFO_URL}/product-combinations?maxValue=${maxValue}`);
      return response.data.data; 
    } catch (error) {

      throw new Error(`Error de conexión o cálculo. al obtener combinacion con el valor: ${error.message}`); 
    }
  }

};


export default ProductService;