import mqtt from 'mqtt'
import Schedule from '#models/schedule'

const brokerUrl = 'mqtts://592e32dc679b4868b8ba76e153149f21.s1.eu.hivemq.cloud:8883'

const options = {
  username: "esp32_device",
  password: "Dika2241999@",
  clientId: "AdonisJS_Backend_" + Math.random().toString(16).substring(2, 10),
  rejectUnauthorized: false
}

export const client = mqtt.connect(brokerUrl, options)

const TOPIC_ADONIS = 'adonis/messages'
const TOPIC_FEEDBACK = 'esp12e/feedback'

client.on('connect', () => {
  console.log('🚀 [MQTT] Berhasil terhubung ke HiveMQ Cloud dengan TLS/SSL!')
  client.subscribe([TOPIC_ADONIS, TOPIC_FEEDBACK], (err) => {
    if (!err) {
      console.log(`📡 [MQTT] Sukses subscribe topik: ${TOPIC_ADONIS} & ${TOPIC_FEEDBACK}`)
    }
  })
})

client.on('message', async (topic, payload) => {
  if (topic === TOPIC_FEEDBACK) {
    console.log(`\n📥 [MQTT] Feedback Arduino Masuk di topik [${topic}]`)

    try {
      const feedback = JSON.parse(payload.toString())
      const idDevice = Number(feedback.idDevice)
      const isWatering = Boolean(feedback.isWatering)

      console.log(`📩 [LOG] Device ID: ${idDevice} | Status Menyiram: ${isWatering}`)

      const schedule = await Schedule.query()
        .where('idDevice', idDevice)
        .first()
      if (schedule) {
        schedule.isWatering = isWatering
        await schedule.save()
        publishMqtt(`adonis/schedule/status/${schedule.id}`, { isWatering: isWatering })

        console.log(`🔄 [DB SUCCESS & BROADCAST TO VUE] Device ${idDevice} -> Schedule ${schedule.id}`)
      }

    } catch (err: any) {
      console.error('❌ [MQTT/DB ERROR] Gagal memproses data:', err.message)
    }
  }
})

export function publishMqtt(topic: string, message: any) {
  const payload = typeof message === 'object' ? JSON.stringify(message) : message
  client.publish(topic, payload, { qos: 1 })
}
