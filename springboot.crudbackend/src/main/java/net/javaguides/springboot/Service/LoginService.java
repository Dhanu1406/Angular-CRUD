package net.javaguides.springboot.Service;
import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguides.springboot.model.Login;
import net.javaguides.springboot.repository.LoginRepository;


@Service
public class LoginService {
	
	@Autowired
	private LoginRepository loginRepository;
	
	public boolean login(Login login) {
		Long id =(long)1;
	 Optional<Login> stdlog=loginRepository.findById(id);
		
		
	 if (stdlog.isPresent()) {
	        if (stdlog.get().getEmail().equals(login.getEmail()) && stdlog.get().getPassword().equals(login.getPassword())) {
	            return true;
	        } else {
	            return false; 
	        }
	    } else {
	        return false; 
	    }

	}
}


