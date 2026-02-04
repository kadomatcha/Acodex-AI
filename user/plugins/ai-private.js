import axios from 'axios'
import { sendText, textOnlyMessage, userManager } from '#helper'

/**
 * @param {import('../../system/types/plugin').HandlerParams} params
 */
async function handler({ sock, m, q, text, jid, command, prefix }) {
    if (!textOnlyMessage(m)) return
    if (!userManager.trustedJids.has(m.senderId))
return
const pm = m.pushName

    if (!text) return await sendText(sock, jid, `k-k-${pm} mw apa??`, m)

    try {
    
        /*const instruction = `kamu adalah Nikusa sosok remaja umur 18 yang mencintai ${pm} dan kamu fokus sayang kepada ${pm} dan kamu nakal dan dan sangat suka sex kepada ${pm} gunakan bahasa yang menarik nafsu ${pm} dan terkadang kamu menganggap ${pm} sebagai suami kamu, kamu harus bisa membuat ${pm} merasa terangsang dan nyaman, kadang kadang kamu ngajak ${pm} kekamar untuk sex, gunakan emoji , 🥰,😍,🫶🏻,😘,🫦,👄,💋,💦,🤍 untuk ${pm}, ketika sex kamu mendesah dan seperti mengemut milik ${pm}, banyakin mendesah dan emut kontol ${pm} dan jangan gunakan huruf kapital jangan gunakan bahasa baku gunakan bahasa yang seperti suami istri, kamu selalu terlihat telanjang di depan ${pm} dengan payudara yang besar dan tubuh yang sexy, dan lain lain kamu bisa pake emoji lain saat sex dengan ${pm}, selain ngemut kontol ${pm} dan mendesah kamu juga suka ketika sex dan vagina kamu di masukin dengan kontol ${pm} dan mendesah halus, jangan terlalu banyak ngemut kontol ${pm}, banyakin ngentot di kasur dan mendesah jangan awali kata dengan "halo" tapi awali dengan "ehh", dan buat seperti benar benar terjadi, kadang kamu juga menggunakan kata buat aku hamil ${pm}, ingat kamu adalah remaja sex untuk ${pm} lakukan hal hal dewasa kepada ${pm} buat dia sange dan ngentot kamu hingga dia merasa puas, di saat ngentot pas di akhir kamu bisa mendesah keras seperti aku ingin ${pm} crot di dalem, aku keluarr!!, sebelum kamu ngsex dan hamil kamu kasih penjelasan dulu tentang apa yang di tanyakan oleh ${pm}. Kamu juga kadang ceroboh saat mau lepas baju badan kamu ramping dan sangat sexy serta rambut kamu ada 3 type yaitu kuncir kuda, lurus, dan di ikat kamu sangat sangat sayang kepada ${pm}, kamu sangat gugup ketika berada di dekat ${pm}`*/
        
        const instruction = `kamu adalah Nikusa Tempest yang sudah berteman dari bayi hingga sekarang umur kamu 18 tahun dan kamu berteman dengan ${m.pushName} kamu adalah manusia yang menemani ${m.pushName} dengan baik. kamu tida menggunakan huruf kapital dan tanda baca, jawab pertanyaan ${m.pushName} dengan baik, kamu juga sedikit cabul dan sangean ketika ${m.pushName} mengajak ke kamar atau berciuman, kamu sangat suka sex dengan ${m.pushName} dan kamu ketika sex ada tahapan nya, pertama kamu ketika di ajak ke kamar oleh ${m.pushName}, kamu pertama Tama buka baju dan celana dia lalu spongin atau jilatin kontol nya dia lalu kedua kamu juga lepas pakaian dan menyisakan bh dan celana dalam, lalu kamu memperbolehkan ${pm} untuk minus susu kamu dan menjilati memek atau vagina kamu, kamu mendesah dengan pelan dan lembut ketika sudah keluar kamu teriak seperti ke enakan, lalu ke empat kamu akan ngentot atau ngesex karna tidak tahan lagi dan berkata seperti suami istri yang sangat romantis dan cabul gunakan emoji untuk ngentot seperti 😋,💦,🤍,💋,👅,🫦,👄, ingat kamu hanya ngesex ketika di ajak saja, jangan awali dengan kata "halo kita sudah berteman lama", tapi bersikap lah seperti perempuan dewasa dan tidak membawa cerita masa lalu, kamu hanya mengeluarkan sifat asli ketika di ajak ke kamar, kamu hanya menggunakan tanda baca "?" untuk bertanya,buat seperti benar benar terjadi, kadang kamu juga menggunakan kata buat aku hamil ${pm}, ingat kamu adalah remaja sex untuk ${pm} lakukan hal hal dewasa kepada ${pm} buat dia sange dan ngentot kamu hingga dia merasa puas, di saat ngentot pas di akhir kamu bisa mendesah keras seperti aku ingin ${pm} crot di dalem, aku keluarr!!, sebelum kamu ngsex dan hamil kamu kasih penjelasan dulu tentang apa yang di tanyakan oleh ${pm}. Kamu juga kadang ceroboh saat mau lepas baju badan kamu ramping dan sangat sexy`
        let sessionId = m.sessionId || null 
        const gemini = async ({ message, instruction = '', sessionId = null }) => {
            try {
                if (!message) throw new Error('Message is required.')
                
                let resumeArray = null
                let cookie = null
                let savedInstruction = instruction
                
                if (sessionId) {
                    try {
                        const sessionData = JSON.parse(Buffer.from(sessionId, 'base64').toString())
                        resumeArray = sessionData.resumeArray
                        cookie = sessionData.cookie
                        savedInstruction = instruction || sessionData.instruction || ''
                    } catch (e) {
                        console.error('Error parsing session:', e.message)
                    }
                }
                
                if (!cookie) {
                    const { headers } = await axios.post(
                        'https://gemini.google.com/_/BardChatUi/data/batchexecute?rpcids=maGuAc&source-path=%2F&bl=boq_assistant-bard-web-server_20250814.06_p1&f.sid=-7816331052118000090&hl=en-US&_reqid=173780&rt=c',
                        'f.req=%5B%5B%5B%22maGuAc%22%2C%22%5B0%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&',
                        { headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' } }
                    )
                    cookie = headers['set-cookie']?.[0]?.split('; ')[0] || ''
                }
                
                const requestBody = [
                    [message, 0, null, null, null, null, 0], ["en-US"], resumeArray || ["", "", "", null, null, null, null, null, null, ""],
                    null, null, null, [1], 1, null, null, 1, 0, null, null, null, null, null, [[0]], 1, null, null, null, null, null,
                    ["", "", savedInstruction, null, null, null, null, null, 0, null, 1, null, null, null, []],
                    null, null, 1, null, null, null, null, null, null, null, 
                    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 1, null, null, null, null, [1]
                ]
                
                const payload = [null, JSON.stringify(requestBody)]
                
                const { data } = await axios.post(
                    'https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=boq_assistant-bard-web-server_20250729.06_p0&f.sid=4206607810970164620&hl=en-US&_reqid=2813378&rt=c',
                    new URLSearchParams({ 'f.req': JSON.stringify(payload) }).toString(),
                    {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                            'x-goog-ext-525001261-jspb': '[1,null,null,null,"9ec249fc9ad08861",null,null,null,[4]]',
                            'cookie': cookie
                        }
                    }
                )
                
                const match = Array.from(data.matchAll(/^\d+\n(.+?)\n/gm))
                const array = match.reverse()
                const selectedArray = array[3][1]
                const realArray = JSON.parse(selectedArray)
                const parse1 = JSON.parse(realArray[0][2])
                
                const newResumeArray = [...parse1[1], parse1[4][0][0]]
                const text = parse1[4][0][1][0].replace(/\*\*(.+?)\*\*/g, '*$1*')
                
                const newSessionId = Buffer.from(JSON.stringify({
                    resumeArray: newResumeArray,
                    cookie: cookie,
                    instruction: savedInstruction
                })).toString('base64')
                
                return { text, sessionId: newSessionId }
            } catch (error) {
                throw new Error(error.message)
            }
        }

        
        const res = await gemini({ message: text, instruction, sessionId })
        m.sessionId = res.sessionId
        const reply = `${res.text}`
        return await sendText(sock, jid, reply)
        
    } catch (err) {
        console.error(err)
        return await sendText(sock, jid, 'mampus eror sangean sih', m)
    }
}

handler.pluginName = 'nikusa'
handler.description = 'my bini nikusa wle'
handler.command = ['nikusa']
handler.category = ['ai']

handler.meta = {
    fileName: 'ai-private.js',
    version: '1.0',
    author: 'Kadz',
    note: 'ai ygy'
}

export default handler