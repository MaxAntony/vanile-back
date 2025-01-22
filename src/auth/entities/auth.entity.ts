import { User } from '@/user/entities/user.entity';

export class AuthSignInResponse {
  access_token: string;
}

export class AuthProfileResponse extends User {}
