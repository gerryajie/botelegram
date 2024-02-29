const telegramBot = require('node-telegram-bot-api')
const axios = require('axios')
const moment = require('moment')


const token = "6655908406:AAHuigTLLFVspv7DGgWbKc_Pkp0PgKVdopA"
const options = {
    polling: true
}

// console.log("okayyy")

const gerryBot = new telegramBot(token, options)

// gerryBot.on("message", (callback) => {
//     const id = callback.from.id
//     gerryBot.sendMessage(id, callback.text)
// })

const sayHi = /^halo$/i
const gempa = /^!gempa$/i
let sholat = /^!sholat/i


gerryBot.onText(sayHi, (callback) => {
    gerryBot.sendMessage(callback.from.id, `Halo juga ${callback.from.first_name} Ada yang bisa Gerry bantu ?
   
    Ketik !sholat untuk info jadwal sholat
    Ketik !gempa untuk tau info gempa terakhir di Indonesia
    `)
})


gerryBot.onText(gempa, async (callback) => {
    const bmkgAPI = "https://data.bmkg.go.id/DataMKG/TEWS/"
    const apiCall = await axios.get(bmkgAPI + "autogempa.json")

    // console.log(apiCall.data.Infogempa.gempa,"balikan")
    const hasil = apiCall.data.Infogempa.gempa
    let jam = hasil.Jam
    let tanggal = hasil.Tanggal
    let magnitude = hasil.Magnitude
    let wilayah = hasil.Wilayah
    let kedalaman = hasil.Kedalaman
    let potensi = hasil.Potensi
    let gambar = hasil.Shakemap

    let bmkgImage = bmkgAPI + gambar

    const deskripsiString = `Terima kasih ${callback.from.first_name} , Berikut Hasil Pencarian Gempa Terakhir Di Indonesia
Waktu: ${jam} | ${tanggal}
Magnitude: ${magnitude}
Wilayah: ${wilayah}
Kedalaman: ${kedalaman}
Potensi: ${potensi}
`

    gerryBot.sendPhoto(callback.from.id, bmkgImage, {
        caption: deskripsiString
    })
})

gerryBot.onText(sholat, async (callback) => {
    moment.locale();
    // const currentDate=
    const today = moment().format('YYYY/MM/DD');

    const sholatAPI = `https://api.myquran.com/v2/sholat/jadwal/1301/${today}`
    const apiCall = await axios.get(sholatAPI)

    // console.log(apiCall.data.Infogempa.gempa,"balikan")
    const hasil = apiCall.data.data

    const jadwal = apiCall.data.data.jadwal
    let lokasi = hasil.lokasi
    let daerah = hasil.daerah
    let tanggalSholat = jadwal.tanggal
    let imsak = jadwal.imsak
    let subuh = jadwal.subuh
    let terbit = jadwal.terbit
    let dhuha = jadwal.dhuha
    let dzuhur = jadwal.dzuhur
    let ashar = jadwal.ashar
    let maghrib = jadwal.maghrib
    let isya = jadwal.isya

    let sholatImage = `https://www.istockphoto.com/id/vektor/idul-fitri-mubarak-dengan-masjid-drum-islam-di-padang-pasir-gm1146201528-308766984`

    const deskripsiSholat = `Terima kasih ${callback.from.first_name} , Berikut Hasil Jadwal Adzan Di Jakarta dan Sekitarnya
Waktu: ${tanggalSholat} | ${lokasi} |${daerah}
Imsak: ${imsak}
Subuh: ${subuh}
Terbit: ${terbit}
Dhuha: ${dhuha}
Dzuhur: ${dzuhur}
Ashar: ${ashar}
Magribh: ${maghrib}
Isya:${isya}
`

    gerryBot.sendPhoto(callback.from.id, sholatImage, {
        caption: deskripsiSholat
    })
})
