import { User } from "../components/Constants";
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
            .then(res => res.value)
            .catch((err) => {
                console.log(`HATA: ${err}. Konum: GetTransportCards()/try/fetch()/catch`)
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
            .then(res => res.value[0])
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

export { GetList, GetTotals }