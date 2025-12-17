package producto.crud_backend_ptm.service;

import producto.crud_backend_ptm.dto.ProductCombinationDTO;
import producto.crud_backend_ptm.model.Product;
import producto.crud_backend_ptm.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product save(Product producto) {
        return productRepository.save(producto);
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Optional<Product> getById(Long id) {
        return productRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return productRepository.existsById(id);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public BigDecimal getTotalInventoryValue() {
        return productRepository.findAll()
                .stream()
                .map(producto ->
                        producto.getPrecio()
                                .multiply(BigDecimal.valueOf(producto.getCantidadStock()))
                )
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public List<ProductCombinationDTO> getCombinations(BigDecimal maxValue) {

        List<Product> products = productRepository.findAll();
        List<ProductCombinationDTO> result = new ArrayList<>();

        int size = products.size();

        // combinaciones de 2 productos
        for (int i = 0; i < size; i++) {
            for (int j = i + 1; j < size; j++) {

                BigDecimal total = products.get(i).getPrecio()
                        .add(products.get(j).getPrecio());

                if (total.compareTo(maxValue) <= 0) {
                    result.add(new ProductCombinationDTO(
                            List.of(
                                    products.get(i).getNombre(),
                                    products.get(j).getNombre()
                            ),
                            total
                    ));
                }
            }
        }

        // combinaciones de 3 productos
        for (int i = 0; i < size; i++) {
            for (int j = i + 1; j < size; j++) {
                for (int k = j + 1; k < size; k++) {

                    BigDecimal total = products.get(i).getPrecio()
                            .add(products.get(j).getPrecio())
                            .add(products.get(k).getPrecio());

                    if (total.compareTo(maxValue) <= 0) {
                        result.add(new ProductCombinationDTO(
                                List.of(
                                        products.get(i).getNombre(),
                                        products.get(j).getNombre(),
                                        products.get(k).getNombre()
                                ),
                                total
                        ));
                    }
                }
            }
        }

        // devolver las 5 combinaciones
        result.sort((a, b) -> b.getTotalPrice().compareTo(a.getTotalPrice()));

        return result.stream()
                .limit(5)
                .collect(Collectors.toList());
    }
}