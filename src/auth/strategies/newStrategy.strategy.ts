import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwksClient from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        const client = jwksClient({
          jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
        });

        const decodedHeader = JSON.parse(Buffer.from(rawJwtToken.split('.')[0], 'base64').toString());
        const kid = decodedHeader.kid;

        console.log('Decoded Header:', decodedHeader);
        console.log('Key ID:', kid);

        client.getSigningKey(kid, (err, key) => {
            if (err) {
              console.error('Error getting signing key:', err);
              return done(err);
            }
            const signingKey = key.getPublicKey();
            console.log('Signing Key:', signingKey);
            done(null, signingKey);
        });
      },
    });
  }

  async validate(payload: any) {
    console.log('Validating payload:', payload);
    return { userId: payload.sub, username: payload.email };
    console.log("validate");
    return { userId: payload.sub, username: payload.username };
  }
}
