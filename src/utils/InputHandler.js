import OutputView from "../views/OutputView.js";

class InputHandler {
  #outputView;

  constructor(outputView) {
    this.#outputView = outputView;
  }

  async readWithRetry(readFn, getFn) {
    while (true) {
      try {
        const input = await readFn();

        return getFn(input);
      } catch (error) {
        this.#outputView.printError(error.message);
      }
    }
  }
}

export default InputHandler;
