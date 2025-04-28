package com.soydz.persistence.entity;

import com.soydz.persistence.entity.enums.RoleEnum;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "role_name", nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleEnum roleName;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "role_permission", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "permission_id"))
    private Set<PermissionEntity> permissionSet = new HashSet<>();


    public RoleEntity() {}

    public RoleEntity(Long id, RoleEnum roleName, Set<PermissionEntity> permissionSet) {
        this.id = id;
        this.roleName = roleName;
        this.permissionSet = permissionSet;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoleEnum getRoleName() {
        return roleName;
    }

    public void setRoleName(RoleEnum roleName) {
        this.roleName = roleName;
    }

    public Set<PermissionEntity> getPermissionSet() {
        return permissionSet;
    }

    public void setPermissionSet(Set<PermissionEntity> permissionSet) {
        this.permissionSet = permissionSet;
    }
}
