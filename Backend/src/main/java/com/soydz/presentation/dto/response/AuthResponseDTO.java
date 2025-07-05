package com.soydz.presentation.dto.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"username", "message", "jwt", "status"})
public record AuthResponseDTO(
        Long userId,
        String username,
        String message,
        String jwt,
        boolean status
) {
}
