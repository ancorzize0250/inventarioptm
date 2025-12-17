import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSave, dataProducto, onCancel }) => {
    const parametrosIniciales = {
        nombre: '',
        descripcion: '',
        precio: '',
        cantidadStock: ''
    };

    const [formData, setFormData] = useState(parametrosIniciales);

    const mapProductoToForm = (producto) => ({
        nombre: producto?.nombre ?? '',
        descripcion: producto?.descripcion ?? '',
        precio: producto?.precio ? String(producto.precio) : '',
        cantidadStock: producto?.cantidadStock ? String(producto.cantidadStock) : ''
    });

    useEffect(() => {
        setFormData(
            dataProducto ? mapProductoToForm(dataProducto) : parametrosIniciales
        );
    }, [dataProducto]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    console.log(dataProducto);
    const handleSubmit = (e) => {
        e.preventDefault();

        const productos = {
        ...formData,
        precio: parseFloat(formData.precio),
        cantidadStock: parseInt(formData.cantidadStock, 10)
        };
        console.log(productos);
        onSave(productos);

        setFormData(parametrosIniciales);
    };

    return (
        <div className="bg-white p-4 border rounded shadow-md"> 
            <h2 className="text-lg font-bold mb-2">{dataProducto ? 'Editar Producto' : 'Registrar Producto'}</h2>
            <form onSubmit={handleSubmit}>
                
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre del producto"
                    required
                    className="p-3 border w-full rounded-lg shadow-sm focus:ring-red-500  focus:border-red-500"
                />
                
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción producto"
                    required
                    rows="3"
                    className="p-3 border shadow-sm  w-full focus:ring-red-500  duration-[10000ms] rounded-lg focus:border-red-500"
                />

                <div className="grid gap-4 grid-cols-2">

                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        placeholder="Precio"
                        required
                        step="0.01"
                        className="p-3 border shadow-sm rounded-lg  focus:border-red-500  focus:ring-red-500 border-gray-300"
                    />

                    <input
                        type="number"
                        name="cantidadStock"
                        value={formData.cantidadStock}
                        onChange={handleChange}
                        placeholder="Stock"
                        required
                        className="p-3 border shadow-sm focus:ring-red-500 rounded-lg focus:border-red-500 duration-[10000ms]"
                    />

                </div>

                <div className="pt-4 flex justify-end space-x-2">
                    {dataProducto && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="border px-6 py-2 text-gray-700 font-semibold rounded-lg transition duration-[10000ms] hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        type="submit"
                        className="bg-red-600 text-white font-bold px-8 py-2 rounded-lg shadow-md transition duration-[10000ms] hover:bg-indigo-700"
                    >
                        {dataProducto ? 'Guardar' : 'Agregar a inventario'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;