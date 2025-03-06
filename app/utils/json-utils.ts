/**
 * Formats JSON string with proper indentation
 */
export const formatJson = (json: string, spaces: number = 2): string => {
    try {
      const parsed = JSON.parse(json);
      return JSON.stringify(parsed, null, spaces);
    } catch (error) {
      return json; // Return original if it can't be parsed
    }
  };
  
  /**
   * Minifies JSON string by removing all whitespace
   */
  export const minifyJson = (json: string): string => {
    try {
      const parsed = JSON.parse(json);
      return JSON.stringify(parsed);
    } catch (error) {
      return json; // Return original if it can't be parsed
    }
  };
  
  /**
   * Validates a JSON string
   * Returns an object with isValid flag and error message if not valid
   */
  export const validateJson = (json: string): { 
    isValid: boolean; 
    error?: string 
  } => {
    if (!json.trim()) {
      return { isValid: false, error: "JSON is empty" };
    }
    
    try {
      JSON.parse(json);
      return { isValid: true };
    } catch (error) {
      if (error instanceof Error) {
        return { isValid: false, error: error.message };
      }
      return { isValid: false, error: "Invalid JSON" };
    }
  };
  