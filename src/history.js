/* eslint-disable eol-last */

// npm history - lets you easily manage session history anywhere JavaScript runs. A history object abstracts away the differences in various environments and provides a minimal API that lets you manage the history stack, navigate, and persist state between sessions.

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export { history };