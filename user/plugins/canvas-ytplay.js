import fetch from 'node-fetch'
import axios from 'axios'
import { textOnlyMessage, sendText, sendFancyMp3, react, botInfo } from '#helper'

/**
 * @param {import('../types/plugin.js').HandlerParams} params
 */
async function handler({ sock, m, jid, text }) {
  if (!textOnlyMessage(m)) return
  if (!text) return sendText(sock, jid, 'judul lagu nya?', m)

  await react(sock, m, '🕛')

  try {
    // ===== 1. SEARCH YOUTUBE (KIRA) =====
    const searchRes = await fetch(
      `https://api.kiracloud.my.id/api/search/youtube?q=${encodeURIComponent(text)}`
    )
    const search = await searchRes.json()

    if (search.status !== 200 || !search.data?.length) {
      return sendText(sock, jid, 'lagu tidak ditemukan', m)
    }

    // ambil hasil pertama
    const yt = search.data[0]
    const ytUrl = yt.url
    const title = yt.title
    const artist = yt.channel
    const thumbnail = yt.thumbnail

    // ===== 2. YTDL ACODEX =====
    const ytdlRes = await fetch(
      `https://api.acodex.my.id/api/downloader/ytdl?url=${encodeURIComponent(
        ytUrl
      )}&format=mp3&quality=128k`
    )
    const ytdl = await ytdlRes.json()

    if (ytdl.status !== 200 || !ytdl.data?.downloadUrl) {
      return sendText(sock, jid, 'gagal download audio', m)
    }

    const audioUrl = ytdl.data.downloadUrl

    // ===== 3. CANVAS COVER (BUFFER) =====
    const { data: coverBuffer } = await axios.get(
      'https://api.nexray.web.id/canvas/youtube',
      {
        params: {
          title,
          artist,
          coverurl: thumbnail
        },
        responseType: 'arraybuffer'
      }
    )

    // ===== 4. SEND MP3 =====
    await sendFancyMp3(
      sock,
      jid,
      audioUrl,
      title,
      artist || botInfo.sdn,
      Buffer.from(coverBuffer)
    )

    await react(sock, m, '✅')
  } catch (e) {
    await sendText(sock, jid, `error: ${e.message}`, m)
    await react(sock, m, '❌')
  }
}

handler.pluginName = 'youtube play'
handler.command = ['play']
handler.category = ['canvas']
handler.meta = {
  fileName: 'canvas-ytplay.js',
  version: '1.0.0',
  author: 'Kado',
  note: 'gd'
}

export default handler