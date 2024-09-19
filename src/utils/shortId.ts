import ShortUniqueId from 'short-unique-id';

export const generateShortUrl = () => {
  const uid = new ShortUniqueId({ length: 5 });
  return uid.rnd();
};
