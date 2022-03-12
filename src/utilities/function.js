import pretty from "pretty";

export const outputFormat = (bodyRaw) => {
  const isJSON = typeof bodyRaw === "object";
  if (isJSON) return JSON.stringify(bodyRaw, null, 2);

  return pretty(bodyRaw);
};
