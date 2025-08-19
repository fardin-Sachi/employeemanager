package tech.getarrays.employeemanager.repo;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.employeemanager.model.Employee;

import java.util.Optional;

@Transactional
public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    void deleteEmployeeById(Long id);

    Optional<Employee> findEmployeeById(Long id);
}