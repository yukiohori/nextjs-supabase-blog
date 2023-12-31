import { render, screen } from '@testing-library/react';

import PageNotFound from '@/app/not-found';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Page Not Found page', () => {
  describe('Render method', () => {
    it('should have h1 tag', () => {
      render(<PageNotFound />);

      const heading = screen.getByRole('heading', {
        name: /Not Found/,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
