import { screen } from "electron";

export const getDimensions = () => {
  // Get the primary display's dimensions
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Calculate the dimensions based on the golden ratio
  const ratio = (1 + Math.sqrt(5)) / 2;
  const windowWidth = Math.round((0.75 * width) / ratio);
  const windowHeight = Math.round(windowWidth / ratio);

  // Calculate the position to be closer to the top
  const x = Math.round((width - windowWidth) / 2);
  const y = Math.round(height * 0.1);

  return { x, y, windowWidth, windowHeight };
};
