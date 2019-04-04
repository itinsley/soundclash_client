import UserSession from './UserSession';
import jwtLib from 'jsonwebtoken';
import { getMaxListeners } from 'cluster';

const data = {email: 'jsmith@gmail.com', user_name: 'John Smith'};

it('#set - Decodes supplied JWT', () => {
  const jwt = jwtLib.sign(data, 'secret', { expiresIn: 60 });
  const session = UserSession.set(jwt);
  expect(session.email).toEqual('jsmith@gmail.com');
  expect(session.userName).toEqual('John Smith');
});

it('#get - retrieves data from local storage', () => {
  const jwt = jwtLib.sign(data, 'secret', { expiresIn: 60 });
  UserSession.set(jwt);

  const session = UserSession.get();
  expect(session.email).toEqual('jsmith@gmail.com');
  expect(session.userName).toEqual('John Smith');
});

it('#get - returns empty object if expired', () => {
  const jwt = jwtLib.sign(data, 'secret', { expiresIn: -1 });
  UserSession.set(jwt);
  expect(UserSession.get()).toEqual({});
});

it('#get - returns empty object if not set', () => {
  localStorage.clear();
  expect(UserSession.get()).toEqual({});
});

it('#clear - clears session', () => {
  UserSession.clear();
  expect(UserSession.get()).toEqual({});
});
