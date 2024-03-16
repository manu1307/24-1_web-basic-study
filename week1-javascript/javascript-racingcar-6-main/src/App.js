import { MissionUtils } from "@woowacourse/mission-utils";
class App {
  async play() {
    await this.getNames();
    await this.getRound();
  }

  async getNames() {
    const names = await MissionUtils.Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분)."
    );
    names.forEach((name) => {
      if (!this.validateName(name))
        throw new Error("[ERROR] 이름은 5자 이하만 가능합니다.");
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
  }
}

export default App;
