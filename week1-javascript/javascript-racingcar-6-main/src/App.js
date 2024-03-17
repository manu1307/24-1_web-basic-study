import { MissionUtils } from "@woowacourse/mission-utils";
class App {
  constructor() {
    this.cars = {};
    this.round = 0;
  }

  async play() {
    await this.getNames();
    await this.getRound();
    for (let i = 0; i < this.round; i++) {
      await this.playRound();
      await this.printRoundResult();
    }
    await this.printWinner();
  }

  async getNames() {
    const names = await MissionUtils.Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분)."
    );
    names.split(",").forEach((name) => {
      if (!this.validateName(name)) {
        throw new Error("[ERROR] 이름은 5자 이하만 가능합니다.");
      }
      this.cars[name] = 0;
    });
  }

  validateName(name) {
    if (name.length > 5) return false;
    return true;
  }

  async getRound() {
    const round = await MissionUtils.Console.readLineAsync(
      "시도할 회수는 몇회인가요?"
    );
    if (round <= 0) throw new Error("[ERROR] 0 이상의 숫자만 가능합니다.");
    this.round = round;
  }
  async move(name) {
    if (MissionUtils.Random.pickNumberInRange(0, 9) >= 4) {
      this.cars[name] += 1;
    }
  }

  async playRound() {
    for (const name of Object.keys(this.cars)) {
      await this.move(name);
    }
  }

  async printRoundResult() {
    for (const name of Object.keys(this.cars)) {
      MissionUtils.Console.print(`${name} : ${"-".repeat(this.cars[name])}`);
    }
  }

  async printWinner() {
    const winner = Object.keys(this.cars).filter((name) => {
      return this.cars[name] === Math.max(...Object.values(this.cars));
    });
    MissionUtils.Console.print(`최종 우승자: ${winner.join(", ")}`);
  }
}

export default App;
