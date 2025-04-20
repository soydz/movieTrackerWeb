package com.soydz.persistence.entity;

import com.soydz.persistence.entity.enums.PermissionEnum;
import jakarta.persistence.*;

@Entity
@Table(name = "permissions")
public class PermissionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "permission_name", nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private PermissionEnum permissionName;


    public PermissionEntity() {}

    public PermissionEntity(Long id, PermissionEnum permissionName) {
        this.id = id;
        this.permissionName = permissionName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PermissionEnum getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(PermissionEnum permissionName) {
        this.permissionName = permissionName;
    }
}
