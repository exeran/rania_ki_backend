import type { HttpContext } from '@adonisjs/core/http'
import Siswa from '#models/siswa'

export default class SiswasController {
  public async index({ response }: HttpContext) {
    const siswas = await Siswa.all()
    return response.ok(siswas)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['nama', 'kelas', 'jurusan'])
    const siswa = await Siswa.create(data)
    return response.created(siswa)
  }

  public async show({ params, response }: HttpContext) {
    const siswa = await Siswa.find(params.id)
    if (!siswa) {
      return response.notFound({ message: 'Siswa not found' })
    }
    return response.ok(siswa)
  }

  public async update({ params, request, response }: HttpContext) {
    const siswa = await Siswa.find(params.id)
    if (!siswa) {
      return response.notFound({ message: 'Siswa not found' })
    }
    const data = request.only(['nama', 'kelas', 'jurusan'])
    siswa.merge(data)
    await siswa.save()
    return response.ok(siswa)
  }

  // Hapus data siswa
  public async destroy({ params, response }: HttpContext) {
    const siswa = await Siswa.find(params.id)
    if (!siswa) {
      return response.notFound({ message: 'Siswa not found' })
    }
    await siswa.delete()
    return response.noContent()
  }
}
