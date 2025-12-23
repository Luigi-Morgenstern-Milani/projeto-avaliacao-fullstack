package com.avaliacao.demo.usuario.dto;

import jakarta.validation.constraints.NotNull;

public record LoginResponseDto(

        @NotNull
        String accessToken,

        @NotNull
        String refreshToken,

        @NotNull
        Long id,

        @NotNull
        String nome
) {
}
