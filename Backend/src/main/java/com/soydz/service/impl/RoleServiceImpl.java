package com.soydz.service.impl;

import com.soydz.persistence.entity.RoleEntity;
import com.soydz.persistence.repository.RoleRepository;
import com.soydz.service.interfaces.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<RoleEntity> findRoleEntitiesByRoleNameIn(Set<String> roleNames) {
        return roleRepository.findRoleEntitiesByRoleNameIn(roleNames);
    }
}
