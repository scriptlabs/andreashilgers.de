const dictionaries = {
  de: () => import("../dictionaries/de.json").then((m) => m.default || m),
  en: () => import("../dictionaries/en.json").then((m) => m.default || m),
};

export const getDictionary = async (locale: keyof typeof dictionaries) => {
  return dictionaries[locale]();
};
