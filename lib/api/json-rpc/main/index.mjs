import films from './films.mjs';
import actions  from './actions.mjs';
import sessions from './sessions.mjs';
import users    from './users.mjs';

export default {
    ...films,
    ...actions,
    ...sessions,
    ...users
};
