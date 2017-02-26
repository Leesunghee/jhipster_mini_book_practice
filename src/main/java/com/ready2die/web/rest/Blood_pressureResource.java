package com.ready2die.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ready2die.domain.Blood_pressure;

import com.ready2die.repository.Blood_pressureRepository;
import com.ready2die.web.rest.util.HeaderUtil;
import com.ready2die.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Blood_pressure.
 */
@RestController
@RequestMapping("/api")
public class Blood_pressureResource {

    private final Logger log = LoggerFactory.getLogger(Blood_pressureResource.class);

    private static final String ENTITY_NAME = "blood_pressure";
        
    private final Blood_pressureRepository blood_pressureRepository;

    public Blood_pressureResource(Blood_pressureRepository blood_pressureRepository) {
        this.blood_pressureRepository = blood_pressureRepository;
    }

    /**
     * POST  /blood-pressures : Create a new blood_pressure.
     *
     * @param blood_pressure the blood_pressure to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blood_pressure, or with status 400 (Bad Request) if the blood_pressure has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/blood-pressures")
    @Timed
    public ResponseEntity<Blood_pressure> createBlood_pressure(@RequestBody Blood_pressure blood_pressure) throws URISyntaxException {
        log.debug("REST request to save Blood_pressure : {}", blood_pressure);
        if (blood_pressure.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new blood_pressure cannot already have an ID")).body(null);
        }
        Blood_pressure result = blood_pressureRepository.save(blood_pressure);
        return ResponseEntity.created(new URI("/api/blood-pressures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /blood-pressures : Updates an existing blood_pressure.
     *
     * @param blood_pressure the blood_pressure to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blood_pressure,
     * or with status 400 (Bad Request) if the blood_pressure is not valid,
     * or with status 500 (Internal Server Error) if the blood_pressure couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/blood-pressures")
    @Timed
    public ResponseEntity<Blood_pressure> updateBlood_pressure(@RequestBody Blood_pressure blood_pressure) throws URISyntaxException {
        log.debug("REST request to update Blood_pressure : {}", blood_pressure);
        if (blood_pressure.getId() == null) {
            return createBlood_pressure(blood_pressure);
        }
        Blood_pressure result = blood_pressureRepository.save(blood_pressure);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, blood_pressure.getId().toString()))
            .body(result);
    }

    /**
     * GET  /blood-pressures : get all the blood_pressures.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blood_pressures in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/blood-pressures")
    @Timed
    public ResponseEntity<List<Blood_pressure>> getAllBlood_pressures(@ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Blood_pressures");
        Page<Blood_pressure> page = blood_pressureRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/blood-pressures");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /blood-pressures/:id : get the "id" blood_pressure.
     *
     * @param id the id of the blood_pressure to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blood_pressure, or with status 404 (Not Found)
     */
    @GetMapping("/blood-pressures/{id}")
    @Timed
    public ResponseEntity<Blood_pressure> getBlood_pressure(@PathVariable Long id) {
        log.debug("REST request to get Blood_pressure : {}", id);
        Blood_pressure blood_pressure = blood_pressureRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(blood_pressure));
    }

    /**
     * DELETE  /blood-pressures/:id : delete the "id" blood_pressure.
     *
     * @param id the id of the blood_pressure to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/blood-pressures/{id}")
    @Timed
    public ResponseEntity<Void> deleteBlood_pressure(@PathVariable Long id) {
        log.debug("REST request to delete Blood_pressure : {}", id);
        blood_pressureRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
