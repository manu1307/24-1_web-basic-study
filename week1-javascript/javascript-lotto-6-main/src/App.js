import Lotto from "./Lotto";

class App {
  constructor() {
    this.lotto = new Lotto();
  }

  async play() {
    this.lotto.getPurchaseAmount();
    this.lotto.printLotteryNumbers();
    this.lotto.getWinningNumbers();
    this.lotto.getBonusNumber();
    this.lotto.checkCorrectNumbers();
    this.lotto.printResult();
  }
}

export default App;
