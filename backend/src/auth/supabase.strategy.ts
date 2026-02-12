import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        const secret = configService.get<string>('SUPABASE_JWT_SECRET') || process.env.SUPABASE_JWT_SECRET || "c8dQbMnAENAUOV/8ujfcglilNU+UKpSdIygbytI01R4v2dtJNScOjyMi7SmV9WnV2OBRkYOomxhqUys98dn+tA==";
        console.log('[AUTH] Initializing SupabaseStrategy. Secret length:', secret?.length);

        if (!secret) {
            console.error('[AUTH] CRITICAL: JWT Secret is MISSING!');
            throw new Error('JWT Secret is missing');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payload: any) {
        return payload;
    }
}
