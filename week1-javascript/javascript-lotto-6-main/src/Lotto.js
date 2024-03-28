import { Console, MissionUtils } from "@woowacourse/mission-utils";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    if (new Set(numbers).size !== 6) {
      throw new Error("[ERROR] 로또 번호에 중복된 숫자가 있습니다.");
    }
  }

  // TODO: 추가 기능 구현

  printTicket() {
    MissionUtils.Console.print(`[${this.#numbers.join(", ")}]`);
  }

  checkResult(myTicket, winningTicket, bonusNumber) {
    const correctNumbers = myTicket.#numbers.filter((number) =>
      winningTicket.#numbers.includes(`${number}`)
    );
    const bonusNumberCorrect = myTicket.#numbers.includes(`${bonusNumber}`);
    const correctNumberCount = correctNumbers.length;

    if (correctNumberCount === 6) {
      return 6;
    }
    if (correctNumberCount === 5 && bonusNumberCorrect) {
      return 5.5;
    }
    return correctNumberCount;
  }
}

export default Lotto;
