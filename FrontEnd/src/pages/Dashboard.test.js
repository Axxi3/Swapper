import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboards from './DashBoards';
import { BrowserRouter } from 'react-router-dom';

describe('Dashboards Component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        Name: 'John Doe',
        email: 'john.doe@example.com',
        products: ['product1', 'product2', 'product3'], // Sample products
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders account information after loading', async () => {
    render(<BrowserRouter><Dashboards /></BrowserRouter>);
    await waitFor(() => {
      expect(screen.getByText(/Account Information/i)).toBeInTheDocument();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    });
  });

  test('renders loader while loading account information', async () => {
    render(<BrowserRouter><Dashboards /></BrowserRouter>);
    await waitFor(() => {
      expect(screen.getByAltText('loading')).toBeInTheDocument();
    });
  });

  test('renders product table after loading products', async () => {
    render(<BrowserRouter><Dashboards /></BrowserRouter>);
    await waitFor(() => {
      expect(screen.getByTestId('product-table')).toBeInTheDocument();
      expect(screen.getAllByRole('row')).toHaveLength(4); // Header row + 3 product rows
    });
  });



});
