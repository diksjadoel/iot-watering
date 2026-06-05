// app/controllers/access_tokens_controller.ts
import User from '#models/user'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

export default class AccessTokensController {
  async store({ request, response, serialize }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(email, password)
      
      const token = await User.accessTokens.create(user)
      return serialize({
        user: UserTransformer.transform(user),
        token: token.value!.release(),
      })

    } catch (error) {
      if (error.code === 'E_INVALID_CREDENTIALS') {
        return response.badRequest({
          message: 'Email atau password yang Anda masukkan salah.'
        })
      }
      if (error.status === 422) {
        return response.unprocessableEntity({
          errors: error.messages
        })
      }
      return response.internalServerError({
        message: 'Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.'
      })
    }
  }

  async destroy({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }

    return {
      message: 'Logged out successfully',
    }
  }
}