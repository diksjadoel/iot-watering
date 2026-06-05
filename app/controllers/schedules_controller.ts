import type { HttpContext } from '@adonisjs/core/http'
import Schedule from '#models/schedule'
import { createScheduleValidator } from '#validators/schedule'
import { publishMqtt } from '#start/mqtt'

export default class SchedulesController {

  public static async updateWateringStatus(idDevice: number, isWatering: boolean) {
    try {
      const schedule = await Schedule.query()
        .where('idDevice', idDevice)
        .first()

      if (schedule) {
        schedule.isWatering = isWatering
        await schedule.save()
        
        console.log(`=======================================================`)
        console.log(`🔄 [DATABASE SUCCESS] Device ${idDevice} berhasil di-update.`)
        console.log(`📌 Kondisi Saat Ini -> isWatering: ${isWatering}`)
        console.log(`=======================================================`)
      } else {
        console.log(`⚠️ [DATABASE WARN] Device ID ${idDevice} tidak ditemukan di DB.`)
      }
    } catch (error) {
      console.error('❌ [DATABASE ERROR] Gagal memperbarui data status watering:', error)
    }
  }

  async storeSchedule({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createScheduleValidator)
      console.log(payload)

      const schedule = await Schedule.create({
        idDevice: payload.idDevice,
        clockStart: payload.clockStart,
        dayActive: payload.dayActive.join(','),
        isActive: payload.isActive ?? true,
        endMinute: payload.endMinute ?? 0,
        isWatering: payload.isWatering ?? false
      })

      const mqttPayload = {
        idDevice: Number(schedule.idDevice),
        clockStart: schedule.clockStart,
        dayActive: schedule.dayActive.split(','),
        isActive: schedule.isActive,
        endMinute: Number(schedule.endMinute),
        isWatering: false
      }

      const topic = `esp12e/${schedule.idDevice}/schedule`
      publishMqtt(topic, mqttPayload)

      console.log(`🚀 MQTT SENT TO ESP: ${topic}`)
      
      return response.created({
        message: 'Jadwal berhasil disimpan',
        data: schedule
      })

    } catch (error: any) {
      console.log(error.messages)
      return response.status(error.status || 500).json({
        message: 'Gagal menambahkan jadwal',
        errors: error.messages,
        error: error.message || error
      })
    }
  }

  async index({ response }: HttpContext) {
    try {
      const schedules = await Schedule.query().orderBy('id', 'desc')
      return response.ok({
        message: 'Data jadwal berhasil diambil',
        data: schedules
      })
    } catch (error: any) {
      console.error('❌ [DATABASE ERROR] Gagal mengambil data jadwal:', error)
      return response.status(500).json({
        message: 'Gagal mengambil data jadwal',
        error: error.message || error
      })
    }
  }
}