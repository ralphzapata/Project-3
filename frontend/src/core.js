import Pulse from 'pulse-framework';
import React from 'react';

Pulse.use(React);

export default new Pulse({
  data: {
    token: null,
    username: null
  }
});