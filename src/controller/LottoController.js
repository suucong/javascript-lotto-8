import LottoService from "../service/LottoService.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import InputHandler from "../utils/InputHandler.js";
import PurchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import WinningNumbersValidator from "../validator/WinningNumbersValidator.js";
import BonusNumberValidator from "../validator/BonusNumberValidator.js";
import { parseWinningNumbers } from "../utils/Parser.js";
import WinningLotto from "../model/WinningLotto.js";
import LottoResult from "../model/LottoResult.js";

class LottoController {
  #lottoService;
  #inputHandler;
  #outputView;

  constructor() {
    this.#lottoService = new LottoService();
    this.#outputView = new OutputView();
    this.#inputHandler = new InputHandler(this.#outputView);
  }

  async run() {
    const { lottos, purchaseAmount } = await this.#handleLottoPurchase();
    const winningLotto = await this.#handleWinningLotto();
    this.#handleResult(lottos, purchaseAmount, winningLotto);
  }

  async #handleLottoPurchase() {
    const purchaseAmount = await this.#readPurchaseAmountWithRetry();
    const lottos = this.#lottoService.generateLottos(purchaseAmount);
    this.#printLottos(lottos);

    return { lottos, purchaseAmount };
  }

  async #handleWinningLotto() {
    const winningNumbers = await this.#readWinningNumbersWithRetry();
    const bonusNumber = await this.#readBonusNumberWithRetry();

    return new WinningLotto(winningNumbers, bonusNumber);
  }

  #handleResult(lottos, purchaseAmount, winningLotto) {
    const { stats, profitRate } = this.#calculateResults(
      lottos,
      purchaseAmount,
      winningLotto
    );
    this.#printResults(stats, profitRate);
  }

  async #readPurchaseAmountWithRetry() {
    return this.#inputHandler.readWithRetry(
      InputView.readPurchaseAmount,
      (inputString) => this.#getPurchaseAmount(inputString)
    );
  }

  #getPurchaseAmount(inputString) {
    const purchaseAmount = Number(inputString.trim());
    PurchaseAmountValidator.validate(purchaseAmount);

    return purchaseAmount;
  }

  #printLottos(lottos) {
    this.#outputView.printLottos(lottos);
  }

  async #readWinningNumbersWithRetry() {
    return this.#inputHandler.readWithRetry(
      InputView.readWinningNumbers,
      (inputString) => this.#getWinningNumbers(inputString)
    );
  }

  #getWinningNumbers(inputString) {
    const winningNumbers = parseWinningNumbers(inputString);
    WinningNumbersValidator.validate(winningNumbers);

    return winningNumbers;
  }

  async #readBonusNumberWithRetry() {
    return this.#inputHandler.readWithRetry(
      InputView.readBonusNumber,
      (inputString) => this.#getBonusNumber(inputString)
    );
  }

  #getBonusNumber(inputString) {
    const bonusNumber = Number(inputString.trim());
    BonusNumberValidator.validate(bonusNumber);

    return bonusNumber;
  }

  #calculateResults(lottos, purchaseAmount, winningLotto) {
    const lottoResult = new LottoResult(lottos, winningLotto);
    const stats = lottoResult.calculateStats();
    const profitRate = lottoResult.calculateProfitRate(purchaseAmount);

    return { stats, profitRate };
  }

  #printResults(stats, profitRate) {
    this.#outputView.printResults(stats, profitRate);
  }
}

export default LottoController;
