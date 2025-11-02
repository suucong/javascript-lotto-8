import OutputView from "../views/OutputView.js";

class InputHandler {
  static async readWithRetry(readFn, validateFn) {
    while (true) {
      try {
        const input = await readFn();

        return validateFn(input);
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }
}

export default InputHandler;
