import OutputView from "../views/OutputView.js";

class InputHandler {
  static async readWithRetry(readFn, getFn) {
    while (true) {
      try {
        const input = await readFn();

        getFn(input);
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }
}

export default InputHandler;
