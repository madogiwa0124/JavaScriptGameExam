export function rowColLoop(rows: number, cols: number, callback: (y: number, x: number) => void) {
  for (var y = 0; y < rows; ++y) {
    for (var x = 0; x < cols; ++x) {
      callback(y, x)
    }
  }
}
