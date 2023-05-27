import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  // constructor() { }

  login() {
    return "hello from login service";
  }

  signup() {
    return "hello from signup service";
  }
}