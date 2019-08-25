export const unescapeUnicode = (str: string) => {
  const r = /\\u([\d\w]{4})/gi;
  const x = str.replace(r, (match: any, grp: any) => {
    return String.fromCharCode(parseInt(grp, 16));
  });

  return unescape(x);
};
