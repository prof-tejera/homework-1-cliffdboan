import fetch from "node-fetch";
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = "https://nt-cdn.s3.amazonaws.com/colors.json";

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */

// Get a JSONifyed version of the COLORS object

const fetchColors = async ({ name, hex, compName, compHex }) => {
  // Fetch the object from the URL. If it does not respond properly, throw an error
  try {
    const response = await fetch(COLORS);
    if (!response.ok) {
      throw Error("Not implemented");
    }
    const colorObj = await response.json();

    // set temporary variable that allows object to be written
    let filteredColor = colorObj;

    // using each parameter, pull out whatever color is being called for using .filter
    // force all type to lower case to prevent case sensitivity
    if (name) {
      filteredColor = filteredColor.filter((color) =>
        color.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (hex) {
      filteredColor = filteredColor.filter((color) =>
        color.hex.toLowerCase().includes(hex.toLowerCase())
        );
    }

    // to access the nested objects, use .some before setting filter parameters
    if (compName) {
      filteredColor = filteredColor.filter((color) =>
        color.comp.some(obj => obj.name.toLowerCase().includes(compName.toLowerCase())
        ));
    }

    if (compHex) {
      filteredColor = filteredColor.filter((color) =>
      color.comp.some(obj => obj.hex.toLowerCase().includes(compHex.toLowerCase())
      ));
    }

    // return the color that is called for by its test case
    return filteredColor;

    // throw an error and send a message if the test fails
  } catch (error) {
    throw Error(`Error: ${error.message}`);
  }
};

// Leave this here
export default fetchColors;
