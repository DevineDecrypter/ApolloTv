import {
  ITitleLanguageOptions,
  SourceVideoOptions,
  TitleLanguageOptions,
} from '../@types';
import sanitizer from 'sanitize-html';

export const getTitle = (
  title: string | ITitleLanguageOptions,
  preferedLanguage?: TitleLanguageOptions,
): string | undefined => {
  if (typeof title === 'string') return title;
  if (!title) return undefined;

  if (preferedLanguage)
    return (
      Object.entries(title).find(
        ([key]: any) => key === preferedLanguage,
      )?.[1] ?? undefined
    );

  return (
    title.english ??
    title.native ??
    title?.romaji ??
    title.userPreferred ??
    undefined
  );
};

export const textSanitizer = (textWithHTML: string): string => {
  return sanitizer(textWithHTML, {
    allowedTags: [],
  });
};

export const epochTime = (time: number) => {
  let options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-GB', options).format(new Date(time)); // returns DD/MM/YYYY
};

// returns a new object with the values at each key mapped using mapFn(value)
export const objectMap = (object: any, mapFn: Function) => {
  return Object.keys(object).reduce(function (result: any, key: string) {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
};

export const sortQualities = (
  qualities: SourceVideoOptions[],
): SourceVideoOptions[] => {
  qualities.sort((a, b) => {
    const qualityPattern = /(\d+)p/;
    const qualityA = parseInt(qualityPattern.exec(a.quality)?.[1] || '0');
    const qualityB = parseInt(qualityPattern.exec(b.quality)?.[1] || '0');

    // Compare the qualities in descending order
    return qualityB - qualityA;
  });

  return qualities;
};
