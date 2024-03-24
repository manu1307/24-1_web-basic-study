import { Console, MissionUtils } from "@woowacourse/mission-utils";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
    this.purchaseAmount = this.getPurchaseAmount();
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
      Console.print(MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6));
    }
  }
}

export default Lotto;
