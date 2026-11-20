export function reserve(balance:number,count:number){if(!Number.isInteger(count)||count<1||count>20||balance<count)throw new Error('Not enough image credits.');return balance-count;}
export function settle(balance:number,alreadyPaid:boolean){return alreadyPaid?balance:balance+20;}
