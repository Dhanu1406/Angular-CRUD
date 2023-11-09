package net.javaguides.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login , Long> {

	

}
