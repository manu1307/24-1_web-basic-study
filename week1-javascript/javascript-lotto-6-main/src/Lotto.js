import { Console, MissionUtils } from "@woowacourse/mission-utils";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
    this.purchaseAmount = this.getPurchaseAmount();
    this.selectedNumbers = [];
    this.winningNumbers = [];
    this.bonusNumber = 0;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  // TODO: 추가 기능 구현

  getPurchaseAmount() {
    const purchasePrice = parseInt(
      MissionUtils.Console.readLineAsync("구입금액을 입력해 주세요.")
    );
    if (purchasePrice % 1000 !== 0) {
      throw new Error("[ERROR] 로또 구입 금액은 1000원 단위여야 합니다.");
    }
    return purchasePrice / 1000;
  }

  printLotteryNumbers() {
    for (let i = 0; i < this.purchaseAmount; i++) {
      const pickedNumbers = MissionUtils.Random.pickUniqueNumbersInRange(
        1,
        45,
        6
      );
      this.selectedNumbers.push(pickedNumbers);
      Console.print(pickedNumbers);
    }
  }

  getWinningNumbers() {
    const winningNumbers =
      MissionUtils.Console.readLineAsync("당첨 번호를 입력해 주세요.");

    const winningNumbersArr = winningNumbers
      .split(",")
      .map((number) => parseInt(number));
    if (winningNumbersArr.length !== 6) {
      throw new Error("[ERROR] 당첨 번호는 6개여야 합니다.");
    }
    this.winningNumbers = winningNumbersArr;
  }

  getBonusNumber() {
    const bonusNumber = parseInt(
      MissionUtils.Console.readLineAsync("보너스 번호를 입력해 주세요.")
    );

    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error("[ERROR] 보너스 번호는 1부터 45까지의 숫자여야 합니다.");
    }

    this.bonusNumber = bonusNumber;
  }
}

export default Lotto;
