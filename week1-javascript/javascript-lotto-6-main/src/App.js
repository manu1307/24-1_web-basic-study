import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto";

class App {
  constructor() {
    this.purchaseAmount = 0;
    this.tickets = [];
    this.winningTicket = {};
    this.bonusNumber = 0;
    this.result = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 5.5: 0, 6: 0 };
    this.lotteryResultTable = {
      3: 5000,
      4: 50000,
      5: 1500000,
      5.5: 30000000,
      6: 2000000000,
    };
  }

  async play() {
    await this.getPurchaseAmount();
    this.printLotteryNumbers(this.purchaseAmount);
    await this.getWinningNumbers();
    await this.getBonusNumber();
    await this.checkCorrectNumbers();
    this.printResult();
  }

  async getPurchaseAmount() {
    const purchasePrice = await MissionUtils.Console.readLineAsync(
      "구입금액을 입력해 주세요."
    );
    const parsedPrice = Number(purchasePrice);
    MissionUtils.Console.print(parsedPrice);
    if (isNaN(purchasePrice)) {
      throw new Error("[ERROR] 숫자가 잘못된 형식입니다.");
    }
    if (purchasePrice % 1000 !== 0) {
      throw new Error("[ERROR] 로또 구입 금액은 1000원 단위여야 합니다.");
    }
    this.purchaseAmount = purchasePrice / 1000;
    MissionUtils.Console.print(`${this.purchaseAmount}개를 구매했습니다.`);
  }

  printLotteryNumbers(ticketCount) {
    for (let i = 0; i < ticketCount; i++) {
      const pickedNumbers = MissionUtils.Random.pickUniqueNumbersInRange(
        1,
        45,
        6
      );
      const sortedPickedNumbers = pickedNumbers.sort((a, b) => a - b);
      const lottoTicket = new Lotto(sortedPickedNumbers);
      this.tickets.push(lottoTicket);
      lottoTicket.printTicket();
    }
  }

  async getWinningNumbers() {
    const winningNumbers = await MissionUtils.Console.readLineAsync(
      "당첨 번호를 입력해 주세요."
    );

    const winningLottoTicket = new Lotto(winningNumbers.split(","));
    this.winningTicket = winningLottoTicket;
  }

  async getBonusNumber() {
    const bonusNumber = await MissionUtils.Console.readLineAsync(
      "보너스 번호를 입력해 주세요."
    );
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error("[ERROR] 보너스 번호는 1부터 45까지의 숫자여야 합니다.");
    }
    this.bonusNumber = bonusNumber;
    // MissionUtils.Console.print(`보너스 번호는 ${this.bonusNumber}입니다.`);
  }

  async checkCorrectNumbers() {
    this.tickets.forEach((ticket) => {
      const correctCount = ticket.checkResult(
        ticket,
        this.winningTicket,
        this.bonusNumber
      );
      this.result[correctCount] = this.result[correctCount]
        ? this.result[correctCount] + 1
        : 1;
    });
  }

  printResult() {
    MissionUtils.Console.print("당첨 통계");
    MissionUtils.Console.print("---------");

    Object.keys(this.result).forEach((key) => {
      if (key < 3) return;
      if (key === "5.5") {
        MissionUtils.Console.print(
          `5개 일치, 보너스 볼 일치 (${this.lotteryResultTable[
            key
          ].toLocaleString("en-US")}원) - ${this.result[key]}개`
        );
        return;
      }
      MissionUtils.Console.print(
        `${key}개 일치 (${this.lotteryResultTable[key].toLocaleString(
          "en-US"
        )}원) - ${this.result[key]}개`
      );
    });
    MissionUtils.Console.print(
      `총 수익률은 ${this.calculateRevenueRate()}%입니다.`
    );
  }

  calculateRevenueRate() {
    const totalPrize = Object.keys(this.result).reduce((acc, key) => {
      if (key < 3) return acc;
      return (
        acc + Number(this.lotteryResultTable[key]) * Number(this.result[key])
      );
    }, 0);
    return ((totalPrize / (this.purchaseAmount * 1000)) * 100).toFixed(2);
  }
}

export default App;
