export function product<T>(origins: T[], targets: T[]): [T, T][] {
  const result: [T, T][] = [];
  origins.forEach(origin => {
    targets.forEach(target => {
      result.push([origin, target]);
    })
  })
  return result
}

export function outOfDrawableRange(x: number, y: number, width: number, height: number): boolean {
  const outOfDrawableRangeX = x < 0 || x >= width;
  const outOfDrawableRangeY = y < 0 || y >= height;
  return outOfDrawableRangeX || outOfDrawableRangeY
}

export function AroundPositions(x: number, y: number): [number, number][] {
  const AroundPositionsWithSelf = product([x - 1, x, x + 1], [y - 1, y, y + 1])
  return AroundPositionsWithSelf.filter(xy => [x, y].toString() !== xy.toString())
}
