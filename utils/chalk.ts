// Simple ANSI color codes
const colorCodes = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  purple: "\x1b[34m",
  bold: "\x1b[1m",
} as const;

type ColorFunction = {
  (text: string): string;
  bold: (text: string) => string;
};

/**
 * Creates a color function that can colorize text and also has a bold method.
 * @param colorName
 * @returns
 */
const createColorFunction = (
  colorName: keyof typeof colorCodes
): ColorFunction => {
  const colorFn = ((text: string) => {
    return `${colorCodes[colorName]}${text}\x1b[0m`;
  }) as ColorFunction;

  colorFn.bold = (text: string) => {
    return `${colorCodes[colorName]}${colorCodes.bold}${text}\x1b[0m`;
  };

  return colorFn;
};

/**
 * Makes the text bold.
 * @param text
 * @returns
 */
export const bold = (text: string): string => {
  return `${colorCodes.bold}${text}\x1b[0m`;
};

export const red = createColorFunction("red");
export const green = createColorFunction("green");
export const yellow = createColorFunction("yellow");
export const purple = createColorFunction("purple");
