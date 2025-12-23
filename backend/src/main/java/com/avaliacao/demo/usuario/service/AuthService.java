package com.avaliacao.demo.usuario.service;

import com.avaliacao.demo.usuario.dto.LoginRequestDto;
import com.avaliacao.demo.usuario.dto.LoginResponseDto;
import com.avaliacao.demo.usuario.entity.Usuario;
import com.avaliacao.demo.usuario.repository.UsuarioRepository;
import com.avaliacao.demo.config.TokenService;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    private final UsuarioRepository repository;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            UsuarioRepository repository,
            TokenService tokenService,
            @Lazy AuthenticationManager authenticationManager
    ) {
        this.repository = repository;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        return repository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Usuário não encontrado"));
    }

    public LoginResponseDto login(LoginRequestDto dto) {

        var authToken = new UsernamePasswordAuthenticationToken(
                dto.email(), dto.senha()
        );

        var authentication = authenticationManager.authenticate(authToken);
        Usuario usuario = (Usuario) authentication.getPrincipal();

        String accessToken = tokenService.generateAccessToken(usuario);
        String refreshToken = tokenService.generateRefreshToken(usuario);


        return new LoginResponseDto(
                accessToken,
                refreshToken,
                usuario.getId(),
                usuario.getNome()
        );
    }
}
