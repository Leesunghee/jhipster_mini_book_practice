package com.ready2die.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Blood_pressure.
 */
@Entity
@Table(name = "blood_pressure")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Blood_pressure implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "timestamp")
    private ZonedDateTime timestamp;

    @Column(name = "systolic")
    private String systolic;

    @Column(name = "diastolic")
    private Integer diastolic;

    @ManyToOne
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }

    public Blood_pressure timestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getSystolic() {
        return systolic;
    }

    public Blood_pressure systolic(String systolic) {
        this.systolic = systolic;
        return this;
    }

    public void setSystolic(String systolic) {
        this.systolic = systolic;
    }

    public Integer getDiastolic() {
        return diastolic;
    }

    public Blood_pressure diastolic(Integer diastolic) {
        this.diastolic = diastolic;
        return this;
    }

    public void setDiastolic(Integer diastolic) {
        this.diastolic = diastolic;
    }

    public User getUser() {
        return user;
    }

    public Blood_pressure user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Blood_pressure blood_pressure = (Blood_pressure) o;
        if (blood_pressure.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, blood_pressure.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Blood_pressure{" +
            "id=" + id +
            ", timestamp='" + timestamp + "'" +
            ", systolic='" + systolic + "'" +
            ", diastolic='" + diastolic + "'" +
            '}';
    }
}
