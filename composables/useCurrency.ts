export const useCurrency = (amount: any) => {
  const currency = computed(() => {
    return new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(isRef(amount) ? amount.value : amount)
  })

  return {currency}
}
