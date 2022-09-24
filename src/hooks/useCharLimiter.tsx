export const useCharLimiter = () => {
  return (target: string, limit: number): [boolean, number] => {
    const isLimited = target.length > limit;
    const overlap = target.length - limit;
    return [isLimited, overlap];
  };
};
