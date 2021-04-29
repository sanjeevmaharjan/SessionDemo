package com.session.demo.util;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.ECDSASigner;
import com.nimbusds.jose.crypto.ECDSAVerifier;
import com.nimbusds.jose.jwk.Curve;
import com.nimbusds.jose.jwk.ECKey;
import com.nimbusds.jose.jwk.gen.ECKeyGenerator;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.session.demo.entity.UserEntity;

import java.text.ParseException;
import java.util.Date;

public class JwtUtil {
    // Expire after one day
    private static final long TOKEN_LIFETIME = 24 * 60 * 60 * 1000;
    private static final String ISSUER = "https://localhost:8080";

    private static final JWSSigner signer;
    private static final ECKey ecJwk;
    private static final ECKey ecPublicJwk;

    static {
        try {
            ecJwk = new ECKeyGenerator(Curve.P_256)
                    .keyID("test")
                    .generate();
            ecPublicJwk = ecJwk.toPublicJWK();
            signer = new ECDSASigner(ecJwk);
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }

    }

    public static SignedJWT parseToken(String s) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(s);
            if (new Date().before(signedJWT.getJWTClaimsSet().getExpirationTime())) {
                JWSVerifier verifier = new ECDSAVerifier(ecPublicJwk);
                signedJWT.verify(verifier);

                return signedJWT;
            }
        } catch (ParseException | JOSEException e) {
            e.printStackTrace();
        }

        return null;
    }

    public static String generateToken(UserEntity userEntity) {
        try {
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(userEntity.getUsername())
                    .issuer("http://localhost:8080")
                    .expirationTime(new Date(System.currentTimeMillis() + TOKEN_LIFETIME))
                    .build();

            SignedJWT signedJWT = new SignedJWT(
                    new JWSHeader.Builder(JWSAlgorithm.ES256)
                            .keyID(ecJwk.getKeyID())
                            .build(),
                    claimsSet
            );

            signedJWT.sign(signer);

            return signedJWT.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

}
