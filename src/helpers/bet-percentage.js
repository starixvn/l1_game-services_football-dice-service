export function calculateBetPercentage(betCount) {
    const choices = Object.keys(betCount);

    if (!choices.some((choice) => betCount[choice])) {
        return { home: 0, draw: 0, away: 0 };
    }

    const totalBetCount = Object.values(betCount).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const home = parseInt(((betCount.home ?? 0) * 100) / totalBetCount);
    const draw = parseInt(((betCount.draw ?? 0) * 100) / totalBetCount);
    const away = 100 - home - draw;

    return { home, draw, away };
}
