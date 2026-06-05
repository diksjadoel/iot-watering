import vine from '@vinejs/vine'

export const createScheduleValidator =
  vine.compile(

    vine.object({

      idDevice:
        vine.number(),

      clockStart:
        vine.string(),

      dayActive:
        vine.array(
          vine.string()
        ),

      isActive:
        vine.boolean(),

      endMinute:
        vine.number(),

      isWatering:
        vine.boolean()

    })

  )