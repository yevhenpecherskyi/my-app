/// <reference types="react-scripts" />

interface User {
  id: number,
  name: string,
  email: string,
  phone: string,
  position: string,
  position_id: number,
  photo: string,
}

interface Users {
  count: number,
  page: number,
  success: true,
  total_pages: number,
  total_users: number,
  users: User[];
}
