function toAmount(amount) {
    try {
        amount = parseFloat(amount || 0).toFixed(2)
        let num = amount.toString();
        let int = num.split('.')[0];
        let rat = num.split('.')[1];
        let l = int.length;
        let newInt = '';

        for (let i = 0; i < l; i++) {
            if (i % 3 == 0 && i != 0) {
                newInt = '.' + newInt;
            }
            newInt = int[l - i - 1] + newInt;
        }

        return newInt + (rat ? ',' + rat : '');
    } catch (err) {
        console.log(`HATA: ${err}. Konum: toAmount()`)
        return 0
    }


}

export { toAmount };