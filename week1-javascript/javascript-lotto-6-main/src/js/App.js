import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto";
import Model from "./Model.js";
import View from "./View.js";

class App {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  async play() {
    await this.inputPurchaseAmount();
    this.view.printMyTickets(this.model.getTickets());
    await this.inputWinningNumbers();
    await this.inputBonusNumber();
    this.view.printResult(
      this.model.getResult(),
      this.model.getLotteryResultTable()
    );
    this.view.printRevenueRate(this.model.getRevenueRate());
  }

  async inputPurchaseAmount() {
    const input = await MissionUtils.Console.readLineAsync(
      "숫자를 입력하세요:"
    );
    const setInputResult = this.model.setPurchaseAmount(input);
    if (setInputResult === "fail") {
      this.view.printMessage("[ERROR] 숫자가 잘못된 형식입니다.");
      await this.inputPurchaseAmount();
    }
    this.view.printMessage(
      `${this.model.getPurchaseAmount()}개를 구매했습니다.`
    );
  }

  async inputWinningNumbers() {
    const winningNumbers = await MissionUtils.Console.readLineAsync(
      "당첨 번호를 입력해 주세요."
    );
    this.model.setWinningTicket(new Lotto(winningNumbers.split(",")));
  }

  async inputBonusNumber() {
    const bonusNumber = await MissionUtils.Console.readLineAsync(
      "보너스 번호를 입력해 주세요."
    );
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error("[ERROR] 보너스 번호는 1부터 45까지의 숫자여야 합니다.");
    }
    this.model.setBonusNumber(bonusNumber);
  }
}

export default App;
