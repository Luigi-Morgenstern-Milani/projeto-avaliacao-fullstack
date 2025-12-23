package com.avaliacao.demo.usuario.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthenticationDTO(

        @NotBlank String email,
        @NotBlank String senha
) {
}
