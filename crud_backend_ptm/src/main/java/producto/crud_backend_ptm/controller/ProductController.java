package producto.crud_backend_ptm.controller;

import producto.crud_backend_ptm.model.Product;
import producto.crud_backend_ptm.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import producto.crud_backend_ptm.dto.ApiResponse;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productoService;

    @PostMapping
    public ResponseEntity<ApiResponse<Product>> crearProducto(@RequestBody Product producto) {
        Product nuevoProducto = productoService.save(producto);
        return ResponseEntity.ok(
                new ApiResponse<>("Producto guardado correctamente", nuevoProducto)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> obtenerProducto(@PathVariable Long id) {
        return productoService.getById(id)
                .map(product -> ResponseEntity.ok(
                        new ApiResponse<>("Producto encontrado", product)
                ))
                .orElse(
                        ResponseEntity.status(
                                HttpStatus.NOT_FOUND).body(new ApiResponse<>("Producto no encontrado", null))
                );
    }

    @GetMapping
    public List<Product> listarProductos() {
        return productoService.getAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> actualizarProducto(
            @PathVariable Long id,
            @RequestBody Product productoDetalles) {

        return productoService.getById(id)
                .map(productoExistente -> {

                    productoExistente.setNombre(productoDetalles.getNombre());
                    productoExistente.setDescripcion(productoDetalles.getDescripcion());
                    productoExistente.setPrecio(productoDetalles.getPrecio());
                    productoExistente.setCantidadStock(productoDetalles.getCantidadStock());

                    Product productoActualizado = productoService.save(productoExistente);

                    return ResponseEntity.ok(
                            new ApiResponse<>("Producto actualizado correctamente", productoActualizado)
                    );
                })
                .orElse(
                        ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(new ApiResponse<>("Producto no encontrado", null))
                );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> eliminarProducto(@PathVariable Long id) {
        if (!productoService.existsById(id)) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND).body(new ApiResponse<>("Producto no encontrado", null));
        }
        productoService.delete(id);
        return ResponseEntity.ok(new ApiResponse<>("Producto eliminado correctamente", null));
    }
}