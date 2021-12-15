import { v4 as uuidv4 } from 'uuid';

interface InUser {
  id?: string;
  name: string;
  login: string;
  password: string;
  
}
class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor(props:InUser) {
    this.id = uuidv4();
    this.name = props.name;
    this.login = props.login;
    this.password = props.password;
  }

/**
 * 
 * @param user - current user
 * @returns object with id, name, login this user without password
 */
  static toResponse(user: InUser): object {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User ;
