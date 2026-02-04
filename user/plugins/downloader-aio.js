import axios from 'axios'
import {
  textOnlyMessage,
  sendText,
  sendVideo,
  sendImage,
  botInfo
} from '#helper'

/**
 * @param {import('../types/plugin.js').HandlerParams} params
 */
async function handler({ sock, m, jid }) {
  if (!textOnlyMessage(m)) return

  const q = m.text?.split(' ').slice(1).join(' ')?.trim()
  if (!q) {
    return sendText(
      sock,
      jid,
      'masukin link video\nsupport url\ntiktok\ninstagram\nfesnuk',
      m
    )
  }

  if (!/(instagram|tiktok|facebook)\.com/i.test(q)) {
    return sendText(sock, jid, 'link tidak didukung', m)
  }

  try {
    const data = await vidssave(q)

    if (!data || !data.medias || !data.medias.length) {
      return sendText(sock, jid, 'media tidak ditemukan', m)
    }

    for (const media of data.medias) {
      const url = media.url
      if (!url) continue

      if (media.type === 'video') {
        await sendVideo(
          sock,
          jid,
          url,
          botInfo.sdn,
          m
        )
      } else {
        await sendImage(
          sock,
          jid,
          url,
          botInfo.sdn,
          m
        )
      }
    }

  } catch (e) {
    return sendText(sock, jid, `error: ${e.message}`, m)
  }
}



async function vidssave(link) {
  const body = new URLSearchParams({
    auth: '20250901majwlqo',
    domain: 'api-ak.vidssave.com',
    origin: 'source',
    link
  }).toString()

  const { data } = await axios.post(
    'https://api.vidssave.com/api/contentsite_api/media/parse',
    body,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        origin: 'https://vidssave.com',
        referer: 'https://vidssave.com/'
      }
    }
  )

  return data
}


handler.pluginName = 'downloader vid'
handler.command = ['aio']
handler.category = ['downloader']
handler.meta = {
  fileName: 'downloader-aio.js',
  version: '1.0.0',
  author: 'Ky',
  note: 'instagram / tiktok / facebook via vidssave'
}

export default handler