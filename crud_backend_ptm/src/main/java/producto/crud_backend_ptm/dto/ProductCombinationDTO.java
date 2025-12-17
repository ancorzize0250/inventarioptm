package producto.crud_backend_ptm.dto;

import java.math.BigDecimal;
import java.util.List;

public class ProductCombinationDTO {

    private List<String> products;
    private BigDecimal totalPrice;

    public ProductCombinationDTO(List<String> products, BigDecimal totalPrice) {
        this.products = products;
        this.totalPrice = totalPrice;
    }

    public List<String> getProducts() {
        return products;
    }


    public BigDecimal getTotalPrice() {
        return totalPrice;
    }
}