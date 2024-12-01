export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const generateUsers = (): User[] => {
  return [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "john@123",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "jane@secure",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174002",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      password: "michael123",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174003",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      password: "emily#pass",
    },
  ];
};

export const users = generateUsers();

export const addUser = async (user: User) => {
  users.push(user);
};

export const findUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

export const findUserById = async (id: string) => {
  return users.find((user) => user.id === id);
};
