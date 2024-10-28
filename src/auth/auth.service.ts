import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// User interface (replace with actual user model in a real app)
interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  // Simulated user data (use a real database in production)
  private users: User[] = [
    { userId: 1, username: 'testuser', password: 'password' },
  ];

  constructor(private readonly jwtService: JwtService) {}

  // Validate user credentials
  async validateUser(username: string, password: string): Promise<User | null> {
    // Find the user (replace this with a real database query)
    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      // Return user object if credentials are valid
      return user;
    }

    // Return null if credentials are invalid
    return null;
  }

  // Generate JWT token for a user
  async login(user: User) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Example of a method to handle registration (add new users)
  async register(username: string, password: string): Promise<User> {
    // Add a new user (in a real app, save to a database)
    const newUser: User = {
      userId: this.users.length + 1,
      username,
      password,
    };
    this.users.push(newUser);
    return newUser;
  }
}
