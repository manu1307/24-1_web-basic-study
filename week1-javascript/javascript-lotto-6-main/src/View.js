import { MissionUtils } from "@woowacourse/mission-utils";

export default class View {
  constructor() {}

  printMessage(message) {
    MissionUtils.Console.print(message);
  }

  printMyTickets(tickets) {
    for (const ticket of tickets) {
      ticket.printTicketNumbers();
    }
  }

  printResult(result, lotteryResultTable) {
    this.printMessage("당첨 통계");
    this.printMessage("---------");

    Object.keys(result).forEach((key) => {
      if (key < 3) return;
      const formattedPrice = lotteryResultTable[key].toLocaleString("en-US");
      this.printMessage(this.resultMessage(key, formattedPrice, result[key]));
    });
  }

  resultMessage(key, formattedPrice, count) {
    if (key === "5.5") {
      return `5개 일치, 보너스 볼 일치 (${formattedPrice}원) - ${count}개`;
    }
    return `${key}개 일치 (${formattedPrice}원) - ${count}개`;
  }

  printRevenueRate(revenueRate) {
    this.printMessage(`총 수익률은 ${revenueRate}%입니다.`);
  }
}
