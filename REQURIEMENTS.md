# Task: Blog Post Generator with Angular and NestJS

## Objective:

Create an Angular and NestJS application where users can generate a blog post using OpenAI, based on user input and a JSON file upload. The project should be deployed to a public Git repository.

## Tech Stack:

- Frontend: Angular
- Backend: NestJS
- Integration: OpenAI API

## Features:

### Frontend (Angular):

- Form Fields:
  - Blog Description (input field)
  - Blog Length (dropdown selection)
  - Blog Structure (options such as list format, interview style, etc.)
  - JSON File Upload (to upload company details)
- Submit Button: On form submission, send data and the uploaded file to the NestJS backend.

### Backend (NestJS):

- File Handling: Parse the uploaded JSON file.
- OpenAI API Integration: Send user input and JSON data to OpenAI to generate a blog post.
- Response: Return the generated blog post to the frontend either in full or streamed.

## Frontend:

- Display Blog Post: Render the generated blog post in HTML format.
- Error Handling: Provide user feedback in case of errors.

## Requirements:

- Form Validation: All fields should be required.
- File Validation: Ensure the uploaded file is valid JSON.
- Error Handling: Provide graceful error messages for any issues that occur.

## Bonus Points:

- Stream the response from the backend in real-time as the blog post is generated.
- Use basic styling (e.g., Bootstrap) for a clean interface.

## Delivery:

- The code for both frontend and backend should be deployed to a public Git repository.
- Include documentation for how to run the project locally.
