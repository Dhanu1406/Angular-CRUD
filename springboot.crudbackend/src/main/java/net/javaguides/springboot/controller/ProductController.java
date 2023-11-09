package net.javaguides.springboot.controller;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;

import net.javaguides.springboot.model.Product;

import net.javaguides.springboot.repository.ProductRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/")
public class ProductController {
    
	@Autowired
	private ProductRepository productRepository;
	
	@GetMapping("/product")
	public List<Product> getAllProducts(){
		return productRepository.findAll();
	}
	
	@PostMapping("/product")
	 public Product postProduct(@RequestBody Product product) {
        return  productRepository.save(product);
        
    }
	@GetMapping("/employees/{id}")
	public  ResponseEntity<Product> getProductById(@PathVariable Long id) {
		Product product=productRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Product not exist with id:" +id));
		return ResponseEntity.ok(product);
	}
	
	
	
	@PutMapping("/product/{id}")
	public ResponseEntity<Product> updateEmployee(@PathVariable Long id,@RequestBody Product productDetails){
		Product product=productRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Product not exist with id:" +id));
		product.setProductName(productDetails.getProductName());
		product.setCategory(productDetails.getCategory());
		product.setFreshness(productDetails.getFreshness());
		product.setPrice(productDetails.getPrice());
		product.setComment(productDetails.getComment());
		
		
		Product updatedProduct = productRepository.save(product);
		return ResponseEntity.ok(updatedProduct);
		
	}
	
	@DeleteMapping("/product/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		Product product=productRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Product not exist with id:" +id));
		productRepository.delete(product);
		Map<String, Boolean> response=new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	
	
	
}
