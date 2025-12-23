package com.avaliacao.demo.usuario.controller;

import com.avaliacao.demo.usuario.dto.LoginRequestDto;
import com.avaliacao.demo.usuario.dto.LoginResponseDto;
import com.avaliacao.demo.usuario.dto.UsuarioDto;
import com.avaliacao.demo.usuario.service.AuthService;
import com.avaliacao.demo.usuario.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final UsuarioService usuarioService;

    public AuthController(AuthService authService,
                          UsuarioService usuarioService) {
        this.authService = authService;
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(
            @RequestBody LoginRequestDto dto
    ) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(
            @RequestBody UsuarioDto dto
    ) {
        usuarioService.registrar(dto);
        return ResponseEntity.status(201).build();
    }
}
