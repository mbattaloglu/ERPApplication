import { Api } from "../components/Constants";

function Lists(address, skip, top, filter) {
    switch (address) {
        case 'TransportCards':
            return (
                Api.link +
                '/odata/TransportCards' +
                '?$select=Oid,SenderName,DocumentDate,TotalPackingQuantity' +
                '&$expand=TransportWaybill($select=declarationNumber)' +
                filter +
                '&$skip=' + skip +
                '&$top=' + top
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
                '&$filter=IsCancelled eq false' +
                '&$skip=' + skip +
                '&$top=' + top
            )
        default:
            console.log("HATA: Doğru bir adres girmediniz. Konum: Lists()");
            return ''
    }
}

function Totals(address, filter) {
    switch (address) {
        case 'TransportCards':
            if (filter)
                filter = `filter(${filter.slice(9, filter.length)})/`
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
    }
}

export { Lists, Totals }