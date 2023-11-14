export function moveToFront<T>(array: T[], filterFn: (element: T) => boolean): T[] {
    const matches = array.filter(filterFn);
    const nonMatches = array.filter(e => !filterFn(e));

    return matches.concat(nonMatches);
}
