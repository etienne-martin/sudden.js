export const mapRouteParams = (
  route: string,
  callback: (match: string) => string
) => {
  return (
    route
      // Split the string by token
      .split(/(\[.*?])/g)
      // Remove empty strings
      .filter(str => str)
      // Detect params and convert them
      .map(chunk => {
        const match = /\[(.*?)]/g.exec(chunk);

        if (match) return callback(match[1]);

        return chunk;
      })
      .join("")
  );
};
