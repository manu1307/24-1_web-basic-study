import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto";

export default class Model {
  constructor() {
    this.tickets = [];
    this.winningTicket = [];
    this.bonusNumber = 0;
    this.result = { 3: 0, 4: 0, 5: 0, 5.5: 0, 6: 0 };
    this.purchaseAmount = 0;
    this.lotteryResultTable = {
      3: 5000,
      4: 50000,
      5: 1500000,
      5.5: 30000000,
      6: 2000000000,
    };
    this.revenueRate = 0;
  }

  setPurchaseAmount(purchaseAmount) {
    if (!Number(purchaseAmount) || Number(purchaseAmount) % 1000 !== 0) {
      return "fail";
    }
    this.purchaseAmount = Number(purchaseAmount) / 1000;
    this.setTickets(this.purchaseAmount);
    return "success";
  }

  setTickets(ticketCount) {
    for (let i = 0; i < ticketCount; i++) {
      const pickedNumbers = MissionUtils.Random.pickUniqueNumbersInRange(
        1,
        45,
        6
      );
      const sortedPickedNumbers = pickedNumbers.sort((a, b) => a - b);
      this.tickets = [...this.tickets, new Lotto(sortedPickedNumbers)];
    }
  }

  setWinningTicket(winningTicket) {
    this.winningTicket = winningTicket;
  }

  setBonusNumber(bonusNumber) {
    this.bonusNumber = bonusNumber;
    this.setResult();
  }

  setResult() {
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
    this.setRevenueRate();
  }

  setRevenueRate() {
    const totalPrize = Object.keys(this.result).reduce((acc, key) => {
      if (key < 3) return acc;
      return (
        acc + Number(this.lotteryResultTable[key]) * Number(this.result[key])
      );
    }, 0);
    this.revenueRate = (
      (totalPrize / (this.purchaseAmount * 1000)) *
      100
    ).toFixed(1);
  }

  getPurchaseAmount() {
    return this.purchaseAmount;
  }

  getTickets() {
    return this.tickets;
  }

  getWinningTicket() {
    return this.winningTicket;
  }

  getBonusNumber() {
    return this.bonusNumber;
  }

  getResult() {
    return this.result;
  }

  getLotteryResultTable() {
    return this.lotteryResultTable;
  }

  getRevenueRate() {
    return this.revenueRate;
  }
}
