package com.ready2die.web.rest;

import com.ready2die.DemoApp;

import com.ready2die.domain.Blood_pressure;
import com.ready2die.repository.Blood_pressureRepository;
import com.ready2die.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.ready2die.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Blood_pressureResource REST controller.
 *
 * @see Blood_pressureResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoApp.class)
public class Blood_pressureResourceIntTest {

    private static final ZonedDateTime DEFAULT_TIMESTAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIMESTAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_SYSTOLIC = "AAAAAAAAAA";
    private static final String UPDATED_SYSTOLIC = "BBBBBBBBBB";

    private static final Integer DEFAULT_DIASTOLIC = 1;
    private static final Integer UPDATED_DIASTOLIC = 2;

    @Autowired
    private Blood_pressureRepository blood_pressureRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBlood_pressureMockMvc;

    private Blood_pressure blood_pressure;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
            Blood_pressureResource blood_pressureResource = new Blood_pressureResource(blood_pressureRepository);
        this.restBlood_pressureMockMvc = MockMvcBuilders.standaloneSetup(blood_pressureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Blood_pressure createEntity(EntityManager em) {
        Blood_pressure blood_pressure = new Blood_pressure()
                .timestamp(DEFAULT_TIMESTAMP)
                .systolic(DEFAULT_SYSTOLIC)
                .diastolic(DEFAULT_DIASTOLIC);
        return blood_pressure;
    }

    @Before
    public void initTest() {
        blood_pressure = createEntity(em);
    }

    @Test
    @Transactional
    public void createBlood_pressure() throws Exception {
        int databaseSizeBeforeCreate = blood_pressureRepository.findAll().size();

        // Create the Blood_pressure

        restBlood_pressureMockMvc.perform(post("/api/blood-pressures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blood_pressure)))
            .andExpect(status().isCreated());

        // Validate the Blood_pressure in the database
        List<Blood_pressure> blood_pressureList = blood_pressureRepository.findAll();
        assertThat(blood_pressureList).hasSize(databaseSizeBeforeCreate + 1);
        Blood_pressure testBlood_pressure = blood_pressureList.get(blood_pressureList.size() - 1);
        assertThat(testBlood_pressure.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testBlood_pressure.getSystolic()).isEqualTo(DEFAULT_SYSTOLIC);
        assertThat(testBlood_pressure.getDiastolic()).isEqualTo(DEFAULT_DIASTOLIC);
    }

    @Test
    @Transactional
    public void createBlood_pressureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = blood_pressureRepository.findAll().size();

        // Create the Blood_pressure with an existing ID
        Blood_pressure existingBlood_pressure = new Blood_pressure();
        existingBlood_pressure.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlood_pressureMockMvc.perform(post("/api/blood-pressures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingBlood_pressure)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Blood_pressure> blood_pressureList = blood_pressureRepository.findAll();
        assertThat(blood_pressureList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBlood_pressures() throws Exception {
        // Initialize the database
        blood_pressureRepository.saveAndFlush(blood_pressure);

        // Get all the blood_pressureList
        restBlood_pressureMockMvc.perform(get("/api/blood-pressures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(blood_pressure.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(sameInstant(DEFAULT_TIMESTAMP))))
            .andExpect(jsonPath("$.[*].systolic").value(hasItem(DEFAULT_SYSTOLIC.toString())))
            .andExpect(jsonPath("$.[*].diastolic").value(hasItem(DEFAULT_DIASTOLIC)));
    }

    @Test
    @Transactional
    public void getBlood_pressure() throws Exception {
        // Initialize the database
        blood_pressureRepository.saveAndFlush(blood_pressure);

        // Get the blood_pressure
        restBlood_pressureMockMvc.perform(get("/api/blood-pressures/{id}", blood_pressure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(blood_pressure.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(sameInstant(DEFAULT_TIMESTAMP)))
            .andExpect(jsonPath("$.systolic").value(DEFAULT_SYSTOLIC.toString()))
            .andExpect(jsonPath("$.diastolic").value(DEFAULT_DIASTOLIC));
    }

    @Test
    @Transactional
    public void getNonExistingBlood_pressure() throws Exception {
        // Get the blood_pressure
        restBlood_pressureMockMvc.perform(get("/api/blood-pressures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBlood_pressure() throws Exception {
        // Initialize the database
        blood_pressureRepository.saveAndFlush(blood_pressure);
        int databaseSizeBeforeUpdate = blood_pressureRepository.findAll().size();

        // Update the blood_pressure
        Blood_pressure updatedBlood_pressure = blood_pressureRepository.findOne(blood_pressure.getId());
        updatedBlood_pressure
                .timestamp(UPDATED_TIMESTAMP)
                .systolic(UPDATED_SYSTOLIC)
                .diastolic(UPDATED_DIASTOLIC);

        restBlood_pressureMockMvc.perform(put("/api/blood-pressures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBlood_pressure)))
            .andExpect(status().isOk());

        // Validate the Blood_pressure in the database
        List<Blood_pressure> blood_pressureList = blood_pressureRepository.findAll();
        assertThat(blood_pressureList).hasSize(databaseSizeBeforeUpdate);
        Blood_pressure testBlood_pressure = blood_pressureList.get(blood_pressureList.size() - 1);
        assertThat(testBlood_pressure.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testBlood_pressure.getSystolic()).isEqualTo(UPDATED_SYSTOLIC);
        assertThat(testBlood_pressure.getDiastolic()).isEqualTo(UPDATED_DIASTOLIC);
    }

    @Test
    @Transactional
    public void updateNonExistingBlood_pressure() throws Exception {
        int databaseSizeBeforeUpdate = blood_pressureRepository.findAll().size();

        // Create the Blood_pressure

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBlood_pressureMockMvc.perform(put("/api/blood-pressures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blood_pressure)))
            .andExpect(status().isCreated());

        // Validate the Blood_pressure in the database
        List<Blood_pressure> blood_pressureList = blood_pressureRepository.findAll();
        assertThat(blood_pressureList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBlood_pressure() throws Exception {
        // Initialize the database
        blood_pressureRepository.saveAndFlush(blood_pressure);
        int databaseSizeBeforeDelete = blood_pressureRepository.findAll().size();

        // Get the blood_pressure
        restBlood_pressureMockMvc.perform(delete("/api/blood-pressures/{id}", blood_pressure.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Blood_pressure> blood_pressureList = blood_pressureRepository.findAll();
        assertThat(blood_pressureList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Blood_pressure.class);
    }
}
