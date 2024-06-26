import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: "241488948308-7719rl1iltknq0c1mnea32tbhg463ac2.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://soongitglwebp8.site/auth/google/callback",
      scope: ['email', 'profile'],
      //authorizationURL: 'https://accounts.google.com/o/oauth2/auth?prompt=select_account',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ){
    const { id, name, emails } = profile;
    //console.log(profile);
    const user = {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      email: emails[0].value,
      accessToken,
      refreshToken,
    };
    return done(null, user);
  }
}

