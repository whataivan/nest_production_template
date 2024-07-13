/**
 * Serialization options interface
 */
export interface ISerializationOptions {
  /**
   * Flag of non exposed fields forbiddance:
   * if its true, non exposed fields will be omit in server response
   */
  forbidNonExposed: boolean;
}
