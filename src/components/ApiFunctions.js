import { Api, User } from "../components/Constants";
import { Lists, Totals } from "./ApiAdresses";

/** Adresteki listeyi ister.
 * 
 * @param {String} address Gidilecek adres.*
 * @param skip Pas geçilecek veri sayısı.
 * @param top Gelecek veri sayısı.
 * @param filter Filtrelenecek metin.
 */
async function GetList(address, skip = 0, top = 0, filter = '') {
    try {
        const data = await fetch(
            (
                Lists(address, skip, top, filter)
            ),
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + User.token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .catch((err) => {
                console.log(`HATA: ${err}. Konum: GetList()/try/fetch()/catch`)
                return []
            });
        return data
    }
    catch (err) {
        console.log(`HATA: ${err}. Konum: GetList()/catch`);
        return []
    }
}

/** Adresteki toplamları ister.
 * 
 * @param {String} address Gidilecek adres.*
 * @param filter Filtrelenecek metin.
 */
async function GetTotals(address, filter = '') {
    try {
        const data = await fetch(
            (
                Totals(address, filter)
            ),
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + User.token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => res.value)
            .catch((err) => {
                console.log(`HATA: ${err}. Konum: GetTotals()/try/fetch()/catch`)
                return []
            });
        return data
    }
    catch (err) {
        console.log(`HATA: ${err}. Konum: GetTotals()/catch`);
        return []
    }

}

async function GetTransportListsDetails(oid) {
    try {
        const data = await fetch
            (
                (
                    Api.link +
                    '/odata/TransportCards/' +
                    oid +
                    '?$select=DocumentDate,ShipmentDate,SenderName,TotalPackingQuantity,TotalWeight,CalculatedTotalVolume' +
                    '&$expand=SenderBranch($select=BranchName),' +
                    'ReceiverBranch($select=BranchName),' +
                    'TransportWaybill($select=declarationNumber),' +
                    'TransportCardDetails($expand=TransportProduct($select=Name),' +
                    'TransportUnitMultiplier($select=Name);$select=PackingQuantity,Quantity,Weight,Volume),' +
                    'TransportCardIncomes($expand=CurrencyType($select=Name);$select=IncomePaymentType,Amount),' +
                    'TransportShipperPlate($select=Plate)'
                ),
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + User.token,
                        'Content-Type': 'application/json'
                    },
                }
            )
            .then(res => res.json())
            .catch((err) => {
                console.log(`HATA: ${err}. Konum: GetTransportListsDetails()/try/fetch()/catch`)
                return {}
            });
        return data
    } catch (err) {
        console.log(`HATA: ${err}. Konum: GetTransportListsDetails()/catch()`)
        return {}
    }
}

async function GetUserInfo() {
    try {
        const data = await fetch
            (
                (
                    Api.link +
                    '/odata/CustomerSuppliers?$expand=DefaultCurrencyType($select=Name)'
                ),
                {
                    headers: {
                        Authorization: 'Bearer ' + User.token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(res => res.json())
            .then(res => res.value[0])
            .catch((err) => {
                console.log(`HATA: ${err}. Konum: GetUserInfo()/try/fetch()/catch`)
                return {}
            });
        return data
    } catch (err) {
        console.log(`HATA: ${err}. Konum: GetTransportGetUserInfoListsDetails()/catch()`)
        return {}
    }
};

async function GetImage() {
    try {
        const data = await fetch
            (
                (
                    Api.link +
                    '/odata/Companies/1/GetImage()'
                ),
                {
                    headers: {
                        Authorization: 'Bearer ' + User.token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(res => res.json())
            .then(res => res.value)
            .catch((err) => {
                console.log(`HATA: ${err}. Konum: GetImage()/try/fetch()/catch`)
                return ''
            });
        return data
    } catch (err) {
        console.log(`HATA: ${err}. Konum: GetImage()/catch()`)
        return ''
    }
};

async function GetSenderNames() {
    try {
        const data = await fetch
            (
                (
                    Api.link +
                    '/odata/TransportCards?$apply=groupby((SenderName))'
                ),
                {
                    headers: {
                        Authorization: 'Bearer ' + User.token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(res => res.json())
            .then(res => res.value)
            .catch((err) => {
                console.log(`HATA: ${err}. Konum: GetSenderNames()/try/fetch()/catch`)
                return []
            });
        return data
    } catch (err) {
        console.log(`HATA: ${err}. Konum: GetSenderNames()/catch()`)
        return []
    }
};

async function GetVehicleNames() {
    try {
        const data = await fetch
            (
                (
                    Api.link +
                    '/odata/TransportWaybills?$select=declarationNumber&$orderby=declarationNumber'
                ),
                {
                    headers: {
                        Authorization: 'Bearer ' + User.token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(res => res.json())
            .then(res => res.value)
            .catch((err) => {
                console.log(`HATA: ${err}. Konum: GetVehicleNames()/try/fetch()/catch`)
                return []
            });
        return data
    } catch (err) {
        console.log(`HATA: ${err}. Konum: GetVehicleNames()/catch()`)
        return []
    }
};

async function PostPaymentDirective({ desc, amount, date, packing, check }) {
    try {
        const data = fetch
            (
                (
                    Api.link +
                    '/odata/TransportPaymentDirectives/' + User.id + '/PostCustomerTransportPaymentDirective'
                ),
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + User.token,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        Desc: desc,
                        Amount: amount || 0,
                        Date: date,
                        PackingQuantity: packing || 0,
                        TransportCheckDetailOid: check || 0
                    }),
                },
            )
            .then(res => res.json())
            .then(res => res.value)
            .catch(error => {
                console.log(`HATA: ${error}. Konum: PostPaymentDirective()/fetch()/catch()`)
                return 'İşlem başarısız!'
            });
        return data
    } catch (err) {
        console.log(`HATA: ${err}. Konum: PostPaymentDirective()/catch()`)
        return 'İşlem başarısız!'
    }
}

async function PostUploadImage({ oid, image }) {
    try {
        const data = fetch
            (
                (
                    Api.link +
                    '/odata/TransportPaymentDirectives/' + oid + '/UploadFile'
                ),
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + User.token,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        FileName: "",
                        Description: "",
                        Data: image
                    }),
                },
            )
            .then(res => res.json())
            .then(res => res.value)
            .catch(error => {
                console.log(`HATA: ${error}. Konum: PostUploadImage()/fetch()/catch()`)
                return 'İşlem başarısız!'
            });
        return data
    } catch (err) {
        console.log(`HATA: ${err}. Konum: PostUploadImage()/catch()`)
        return 'İşlem başarısız!'
    }
}
export {
    GetList,
    GetTotals,
    GetTransportListsDetails,
    GetUserInfo,
    GetImage,
    GetSenderNames,
    GetVehicleNames,
    PostPaymentDirective,
    PostUploadImage
}