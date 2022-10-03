import { Api } from "../components/Constants";

function Lists(address, skip, top, filter) {
    try {
        if (filter)
            filter = `&$filter=${filter}`
        switch (address) {
            case 'TransportCards':
                return (
                    Api.link +
                    '/odata/TransportCards' +
                    '?$select=Oid,SenderName,DocumentDate,TotalPackingQuantity' +
                    '&$expand=TransportWaybill($select=declarationNumber)' +
                    filter +
                    '&$skip=' + skip +
                    '&$top=' + top +
                    '&$count=true'
                )
            case 'TransportPaymentDirectives':
                filter = filter.replace(',', ' and ').replace('startTime', 'Date').replace('endTime', 'Date')
                return (
                    Api.link +
                    '/odata/TransportPaymentDirectives' +
                    '?$orderby=Date' +
                    '&$expand=CurrencyType($select=Name)' +
                    filter +
                    '&$skip=' + skip +
                    '&$top=' + top +
                    '&$count=true'
                )
            case 'FinancialTrxes':
                return (
                    Api.link +
                    '/odata/FinancialTrxes' +
                    '?$expand=CustomerSupplier(' +
                    (
                        '$expand=DefaultCurrencyType($select=Name);' +
                        '$select=DefaultCurrencyType)'
                    ) +
                    '&$orderby=TrxDate' +
                    '&$select=TrxDate,LineDescription,SubType,Oid,Amount,IsCancelled' +
                    filter +
                    '&$skip=' + skip +
                    '&$top=' + top +
                    '&$count=true'
                )
            default:
                console.log("HATA: Doğru bir adres girmediniz. Konum: Lists()");
                return ''
        }
    } catch (err) {
        console.log(`HATA: ${err}. Konum: Lists()/cath()`)
        return ''
    }

}

function Totals(address, filter) {
    try {
        switch (address) {
            case 'TransportCards':
                if (filter)
                    filter = `filter(${filter})/`
                return (
                    Api.link +
                    '/odata/TransportCards' +
                    '?$apply=' +
                    (
                        filter +
                        'aggregate(' +
                        (
                            'TotalPackingQuantity with sum as Packing, ' +
                            'TotalWeight with sum as Weight, ' +
                            'CalculatedTotalVolume with sum as Volume)'
                        )
                    )
                )
            case 'TransportPaymentDirectives':
                if (filter)
                    filter = filter.replace(' ge ', '=').replace(' le ', '=')
                else
                    filter = 'startTime=2022-01-01,endTime=2022-12-31'
                console.log("merhaba: ", filter)
                return (
                    Api.link +
                    '/odata/TransportPaymentDirectives/TotalAmountByStatuses(' + filter + ')'
                )
            case 'FinancialTrxes':
                if (filter)
                    filter = `filter(${filter})/`
                return (
                    Api.link +
                    '/odata/FinancialTrxes' +
                    '?$apply=' +
                    (
                        filter +
                        'aggregate(' +
                        (
                            'Debit with sum as Debit, ' +
                            'Credit with sum as Credit, ' +
                            'Amount with sum as Amount)'
                        )
                    )
                )
            default:
                console.log("HATA: Doğru bir adres girmediniz. Konum: Totals()");
                return ''
        }
    } catch (err) {
        console.log(`HATA: ${err}. Konum: Totals()/cath()`)
        return ''
    }
}

export { Lists, Totals }