package producto.crud_backend_ptm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "producto.crud_backend_ptm")
public class CrudBackendPtmApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudBackendPtmApplication.class, args);
	}

}
