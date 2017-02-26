package com.ready2die.repository;

import com.ready2die.domain.Preferences;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Preferences entity.
 */
@SuppressWarnings("unused")
public interface PreferencesRepository extends JpaRepository<Preferences,Long> {

}
