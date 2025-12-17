package producto.crud_backend_ptm.controller;

import org.springframework.web.bind.annotation.*;
import producto.crud_backend_ptm.dto.ApiResponse;
import producto.crud_backend_ptm.dto.ProductCombinationDTO;
import producto.crud_backend_ptm.service.ProductService;
import org.springframework.http.ResponseEntity;
import java.math.BigDecimal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/information")
public class InformationController {

    private final ProductService productService;

    public InformationController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/inventory-value")
    public ResponseEntity<ApiResponse<BigDecimal>> obtenerValorTotalInventario() {

        BigDecimal valorTotal = productService.getTotalInventoryValue();

        return ResponseEntity.ok(
                new ApiResponse<>("valor total del inventario obtenido correctamente", valorTotal)
        );
    }

    @GetMapping("/product-combinations")
    public ResponseEntity<ApiResponse<List<ProductCombinationDTO>>> obtenerCombinaciones(
            @RequestParam BigDecimal maxValue) {

        List<ProductCombinationDTO> result =
                productService.getCombinations(maxValue);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        "combinacion de productos calculado correctamente",result
                )
        );
    }
}

