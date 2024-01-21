# Hack Ideas

Hack Ideas is a web application that allows employees of an organization to add
and manage challenges for internal hackathons. Users can submit new ideas,
upvote existing challenges, and sort challenges based on votes count or creation
date.

## Features

- **User Authentication:** Users can log in using their employee ID.
- **Add New Challenges/Ideas:** Employees can submit new challenges with a
  title, description, and tags.
- **Fixed Pre-defined Tags:** Challenges can be categorized with fixed
  pre-defined tags like 'feature', 'tech', etc.
- **Upvoting:** Users can upvote challenges to show their interest and support.
- **Sorting:** Challenges can be sorted based on votes count or creation date.
- **Responsive Design:** The application is designed to work on various screen
  sizes.

## Tech Stack

- ReactJS, Redux Toolkit, React Router DOM
- TailwindCSS for styling
- Axios for handling HTTP requests

## Getting Started

1. **Clone & Install:**

   ```bash
   git clone https://github.com/your-username/hack-ideas.git
   cd hack-ideas
   npm install

   ```

2. **Run Json Server:**

`npx json-server -p 3005 -w Data/db.json`

3. **Run App:** `npm start`
