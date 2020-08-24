package com.jesa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jesa.domains.MemberTitle;

@Repository
public interface MemberTitleRepository extends CrudRepository<MemberTitle, Long>{

}
