import { render, screen } from '@testing-library/react';

import About from '@/app/about/page';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('About page', () => {
  describe('Render method', () => {
    it('should have h1 tag', () => {
      render(<About />);

      const heading = screen.getByRole('heading', {
        name: /Welcome to My Tech Journey/,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
