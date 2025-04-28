package com.soydz.service.interfaces;

import com.soydz.persistence.entity.RoleEntity;

import java.util.List;
import java.util.Set;

public interface RoleService {
    List<RoleEntity> findRoleEntitiesByRoleNameIn(Set<String> roleNames);
}
