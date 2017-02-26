package com.ready2die.repository;

import com.ready2die.domain.Points;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Points entity.
 */
@SuppressWarnings("unused")
public interface PointsRepository extends JpaRepository<Points,Long> {

    @Query("select points from Points points where points.user.login = ?#{principal.username}")
    List<Points> findByUserIsCurrentUser();

}
