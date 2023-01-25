import React from 'React';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import App from '../src/components/App.jsx';
import NewApplication, { reducer, ACTIONS } from '../src/components/NewApplication.jsx';
import Job from '../src/components/Job.jsx';

describe('Unit testing React components', () => {
  describe('', () => {
    let text;
    const props = {
      job: {
        job_role: 'Engineer',
        company_name: 'Google',
        email: 'careers@google.com',
        phone: '1800GOOGLE',
        contact_name: 'Sundar Pichai',
        job_link: 'google.com',
        status: 'pending',
        user_id: 1
      }
    };

    beforeAll(() => {
      text = render(<Job {...props} />);
    });

    test('Renders the passed-in text in the proper table cell', () => {
      expect(text.getByText('Google').nextSibling).toHaveTextContent('careers@google.com');
      expect(text.getByText('careers@google.com').nextSibling).toHaveTextContent('1800GOOGLE');
      // expect(text.getByText('google.com')).toHaveStyle('border-top: 2px solid grey;');
    });
  });
})