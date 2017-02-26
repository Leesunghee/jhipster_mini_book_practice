package com.ready2die.repository;

import com.ready2die.domain.Weight;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Weight entity.
 */
@SuppressWarnings("unused")
public interface WeightRepository extends JpaRepository<Weight,Long> {

    @Query("select weight from Weight weight where weight.user.login = ?#{principal.username}")
    List<Weight> findByUserIsCurrentUser();

}
