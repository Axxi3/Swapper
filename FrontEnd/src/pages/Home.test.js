import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

describe('Home Component', () => {
  test('renders without crashing', () => {
    render(<BrowserRouter><Home /></BrowserRouter>);
    screen.debug()
  });

  test('renders the correct title', () => {
    render(<BrowserRouter><Home /></BrowserRouter>);
    const title = screen.getByText(/Welcome to BookSwap/i);
    expect(title).toBeInTheDocument();
  });


  
});