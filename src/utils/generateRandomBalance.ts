export function generateRandomBalance() {
  const balanceOptions = [
    { value: 0, probability: 10 },
    { value: 500, probability: 40 },
    { value: 1000, probability: 30 },
    { value: 5000, probability: 20 },
    { value: 10000, probability: 15 },
    { value: 50000, probability: 8 },
    { value: 100000, probability: 4 },
    { value: 500000, probability: 2 },
    { value: 1000000, probability: 1 },
  ]

  const totalProbability = balanceOptions.reduce((sum, option) => sum + option.probability, 0)
  const randomValue = Math.random() * totalProbability

  let cumulativeWeight = 0

  const selectedOption = balanceOptions.find((option) => {
    cumulativeWeight += option.probability
    return randomValue <= cumulativeWeight
  })

  if (selectedOption) {
    return selectedOption.value
  }

  const randomIndex = Math.floor(Math.random() * balanceOptions.length)
  return balanceOptions[randomIndex].value
}
