import passport from 'passport';

export function authentication() {
  return passport.authenticate('bearer', { session: false });
}
