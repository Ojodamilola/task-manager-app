// TaskComments.test.js

import { render, screen } from '@testing-library/react';
import TaskComments from './TaskComments';

test('renders comments correctly', () => {
  // Mocking Firebase and Firestore logic (you may need to adjust this based on your setup)
  jest.mock('../firebase', () => ({
    db: {
      collection: jest.fn(),
      query: jest.fn(),
      onSnapshot: jest.fn(),
    },
  }));

  // Mock comments data
  const comments = [
    { id: '1', text: 'Comment 1' },
    { id: '2', text: 'Comment 2' },
  ];

  // Mock useEffect to ensure it runs synchronously
  jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());

  // Render the component with mocked data
  render(<TaskComments taskId="1" />);
  
  // Check that comments are displayed in the component
  comments.forEach((comment) => {
    const commentElement = screen.getByText(comment.text);
    expect(commentElement).toBeInTheDocument();
  });
});
