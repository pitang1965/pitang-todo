export function waitAsync(
  conditionCallback: () => boolean,
  intervalMillSecond = 10,
  timeoutMillSecond = 0
) {
  // 条件が成立するまで setInterval でポーリング的なループ
  return new Promise(function (resolve, reject) {
    let loopCount = 0;
    const intervalId = setInterval(function () {
      if (
        timeoutMillSecond > 0 &&
        loopCount * intervalMillSecond > timeoutMillSecond
      ) {
        reject('timeout'); // 条件が満たされないままタイムアウトを迎えたことを示す
      }
      if (!conditionCallback()) {
        // 条件関数が falsy を返した時はループ続行
        return;
      }
      // 条件関数が truthy を返した時はループ用の interval を消去
      clearInterval(intervalId);
      // 条件関数が true を返した時は resolve 関数を実行して条件が満たされたことを示す
      resolve('success');
    }, intervalMillSecond);
  });
}