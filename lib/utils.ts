export const getFullName = (user: any) => {
  if (!user) return '';
  if (user && user.first_name) return `${user.first_name} ${user.last_name}`;
  return user.email;
};

export const getFirstLetter = (email: string | undefined | null) => {
  if (!email) return 'A';
  return email[0];
};