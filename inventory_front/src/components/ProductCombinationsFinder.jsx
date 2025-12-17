import React, { useState } from 'react';
import ProductService from '../services/ProductService';

const ProductCombinationsFinder = () => {
  const [maxValue, setMaxValue] = useState('');
  const [combinations, setCombinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCombinations([]);

    const value = parseFloat(maxValue);

    if (isNaN(value) || value <= 0) {
      setError('Ingresa un número mayor a 0');
      return;
    }

    setLoading(true);
    try {
      const result = await ProductService.getProductCombinations(value);
      setCombinations(result);
    } catch (err) {
      setError('Error al buscar combinaciones');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="bg-white p-4 border rounded shadow-sm">
        <h3 className="text-lg font-bold mb-2">
          Buscar combinaciones de productos
        </h3>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
          <input
            type="number"
            step="0.01"
            placeholder="Valor máximo"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            className="flex-1 border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="border px-4 py-2 rounded bg-gray-100"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {error && (
          <p className="text-sm text-red-600 mb-2">
            {error}
          </p>
        )}

        {combinations.length > 0 && (
          <div className="mt-4">
            <p className="text-sm mb-2">
              Combinaciones encontradas: {combinations.length}
            </p>

            <ul className="space-y-2 max-h-56 overflow-y-auto">
              {combinations.map((c, index) => (
                <li
                  key={index}
                  className="border p-2 rounded flex justify-between"
                >
                  <span className="text-sm">
                    {c.products.join(' + ')}
                  </span>
                  <strong>
                    ${c.totalPrice.toFixed(2)}
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        )}

        {combinations.length === 0 && !loading && maxValue && !error && (
          <p className="text-sm text-gray-500 mt-3">
            No se encontraron combinaciones.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCombinationsFinder;
