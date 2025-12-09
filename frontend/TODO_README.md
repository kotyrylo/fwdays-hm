# Todo List Application

A full-featured todo list application with CRUD operations built with React.

## Features

### CRUD Operations
- **Create**: Add new todos with the input form
- **Read**: View all todos in a clean, organized list
- **Update**: Edit todo text inline or mark as complete/incomplete
- **Delete**: Remove todos from the list

### Additional Features
- **Real-time Statistics**: Shows total, completed, and pending todos
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Graceful error messages for API failures
- **Loading States**: Visual feedback during API operations
- **Mock API**: Fallback to local mock data when external API is unavailable

## API Integration

The application is configured to work with:
- **Primary API**: `http://example.com/todo`
- **Fallback**: Local mock API service with sample data

### API Endpoints
- `GET /todo` - Fetch all todos
- `POST /todo` - Create new todo
- `PUT /todo/:id` - Update todo
- `DELETE /todo/:id` - Delete todo

### Data Structure
```javascript
{
  id: number,
  text: string,
  completed: boolean
}
```

## Usage

1. Navigate to `/todo` in the application
2. Add new todos using the input field
3. Click checkboxes to mark todos as complete
4. Use Edit button to modify todo text
5. Use Delete button to remove todos
6. View statistics at the bottom of the list

## Styling

The todo page features:
- Clean, modern UI with Tailwind-inspired styling
- Hover effects and smooth transitions
- Color-coded states (completed vs pending)
- Mobile-responsive layout
- Accessible form controls

## Error Handling

- Network errors are displayed to the user
- Mock API provides fallback functionality
- Form validation prevents empty todos
- Loading states prevent duplicate operations
