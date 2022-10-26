package com.questionappholylox.questionapp.repos;

import com.questionappholylox.questionapp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
