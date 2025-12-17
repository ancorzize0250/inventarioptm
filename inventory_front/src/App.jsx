import React, { useState, useEffect } from 'react';
import ProductService from './services/ProductService';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import AppLogo from './assets/logo.jpg';
import ProductCombinationsFinder from './components/ProductCombinationsFinder';
import Modal from './components/Modal';
import MeowfactsService from './services/MeowfactsService';
import UselessFactsService from './services/UselessFactsService';

const App = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [catFacts, setCatFacts] = useState([]); 
  const [showCatFactsModal, setShowCatFactsModal] = useState(false);
  const [uselessFact, setUselessFact] = useState('');

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await ProductService.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar el inventario.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const loadCatFacts = async () => {
      const facts = await MeowfactsService.getTwoRandomCatFacts();
      setCatFacts(facts);
      setShowCatFactsModal(true); 
    };

    const loadUselessFact = async () => {
        const fact = await UselessFactsService.getDailyUselessFact();
        setUselessFact(fact);
    };

    loadProducts(); 
    loadCatFacts(); 
    loadUselessFact();
  }, []);

  const handleSave = async (productData) => {
    try {
      console.log(productData);
      if (productToEdit) {
        await ProductService.updateProduct(productToEdit.id, productData);
        setProductToEdit(null);
      } else {
        await ProductService.createProduct(productData);
      }

      await loadProducts();
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al guardar el producto.');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Estás seguro de que deseas eliminar este producto?'
    );

    if (!confirmed) return;

    try {
      await ProductService.deleteProduct(id);
      await loadProducts();
    } catch (err) {
      console.error(err);
      alert('No se pudo eliminar el producto.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 p-5 bg-white border-b-2 border-red-600 text-center">

        <div className="flex items-center justify-center gap-3 mb-1">
          <img
            src={AppLogo}
            alt="Logo de Inventario PTM"
            className="w-10 h-10"
          />
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Inventario PTM
          </h1>
        </div>

        <p className="text-gray-600 text-sm">
          Plataforma para la administración de productos
        </p>
      </header>

        {loading && (
          <p className="text-center text-red-800 font-semibold mb-6">
            Cargando inventario...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 font-medium mb-6">
            {error}
          </p>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProductForm
              onSave={handleSave}
              dataProducto={productToEdit}
              onCancel={() => setProductToEdit(null)}
            />
          </div>

          <ProductCombinationsFinder />

          <div className="lg:col-span-2">
            {products.length > 0 ? (
              <ProductList
                products={products}
                onEdit={setProductToEdit}
                onDelete={handleDelete}
              />
            ) : (
              !loading && (
                <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-semibold text-gray-700">
                    Inventario vacío
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Agrega tu primer producto usando el formulario.
                  </p>
                </div>
              )
            )}
          </div>
        </main>

        {uselessFact && (
          <footer className="mt-4 text-center">
            <p className="text-sm text-gray-600"><strong>Dato inutil del día:</strong> {uselessFact}</p>
          </footer>
        )}

        {showCatFactsModal && catFacts.length > 0 && (
          <Modal title="Sabías que..." onClose={() => setShowCatFactsModal(false)}>
            {catFacts.map((fact, index) => (
              <p key={index} className="text-lg leading-relaxed italic">
                " {fact} "
              </p>
            ))}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default App;
