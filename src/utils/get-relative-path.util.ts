export const getRelativePath = (path: string) => {
  const isDevEnvironment = process.env.NODE_ENV === 'development';
  return `${isDevEnvironment ? '/records-assignment-client/' : ''}${path}`;
};
