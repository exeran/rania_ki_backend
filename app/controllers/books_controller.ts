import type { HttpContext } from '@adonisjs/core/http'
import Book  from '#models/book'

export default class BooksController {
    public async index({response}: HttpContext) {
        const books = await Book.all()
        return response.ok(books)
}
    public async store({request, response}: HttpContext) {
        const data = request.only(['title', 'author'])
        const books = await Book.create(data)
        return response.created(books)
}

    public async show({params, response}: HttpContext) {
        const books = await Book.find(params.id)
        if (!books) {
            return response.notFound({ message: 'Book not found' })
        }
        return response.ok(books)
    }

    public async update({params, request, response}: HttpContext) {
        const books = await Book.find(params.id)
        if (!books) {
            return response.notFound({ message: 'Book not found' })
        }
        const data = (request.only(['title', 'author']))
        books.merge(data)
        await books.save()
        return response.ok(books)
    }

    // Delete a book
    public async destroy({params, response}: HttpContext) {
        const books = await Book.find(params.id)
        if (!books) {
            return response.notFound({ message: 'Book not found' })
        }
        await books.delete()
        return response.noContent()
    }
}