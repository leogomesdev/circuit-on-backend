import { Injectable } from '@nestjs/common';
import * as OktaJwtVerifier from '@okta/jwt-verifier';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private oktaVerifier: any;
  private audience: string;

  constructor(configService: ConfigService) {
    this.oktaVerifier = new OktaJwtVerifier({
      issuer: configService.get<string>('okta.issuer'),
      clientId: configService.get<string>('okta.clientId'),
    });

    this.audience = configService.get<string>('okta.audience');
  }

  async validateToken(token: string): Promise<any> {
    const jwt = await this.oktaVerifier.verifyAccessToken(token, this.audience);
    return jwt;
  }
}
