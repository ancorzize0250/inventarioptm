import React from 'react';

const ProductList = ({ products = [], onEdit, onDelete }) => {

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      onDelete(id);
    }
  };

  let totalValue = 0;
  let mostValuable = null;
  let highestValue = 0;

  products.forEach(p => {
    const value = p.precio * p.cantidadStock;
    totalValue += value;

    if (value > highestValue) {
      highestValue = value;
      mostValuable = p;
    }
  });

  return (
    <div className="bg-white p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Inventario</h2>

      {products.length === 0 && (
        <p className="text-gray-500">No hay productos.</p>
      )}

      {products.length > 0 && (
        <>
          <p className="text-sm mb-2">
            Valor total del inventario: <strong>${totalValue.toFixed(2)}</strong>
          </p>

          {mostValuable && (
            <p className="text-sm mb-4">
              Producto con mayor valor: <strong>{mostValuable.nombre}</strong>
              {' '}(${highestValue.toFixed(2)})
            </p>
          )}

          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Precio</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Valor</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {products.map(product => {
                const value = product.precio * product.cantidadStock;
                const lowStock = product.cantidadStock < 10;
                const isTop = product.id === mostValuable?.id;

                return (
                  <tr
                    key={product.id}
                    className={isTop ? 'bg-yellow-100' : ''}
                  >
                    <td className="border p-2">{product.id}</td>
                    <td className="border p-2">{product.nombre}</td>
                    <td className="border p-2">
                      ${product.precio.toFixed(2)}
                    </td>
                    <td className="border p-2">
                      {product.cantidadStock}
                      {lowStock && (
                        <span className="text-red-600 text-xs"> (bajo)</span>
                      )}
                    </td>
                    <td className="border p-2">
                      ${value.toFixed(2)}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="mr-2 text-blue-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <p className="mt-3 text-sm">
            Total de productos: {products.length}
          </p>
        </>
      )}
    </div>
  );
};

export default ProductList;
