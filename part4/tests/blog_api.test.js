const { test, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('blog api tests', () => {

  // 4.8
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blogs returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  // 4.9
  test('unique identifier property is id', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id !== undefined)
  })

  // 4.10
  test('a valid blog can be added', async () => {

    const newBlog = {
      title: 'Async testing',
      author: 'Tester',
      url: 'http://test.com',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(
      blogsAtEnd.length,
      helper.initialBlogs.length + 1
    )
  })

  // 4.11
  test('likes default to zero if missing', async () => {

    const newBlog = {
      title: 'No likes blog',
      author: 'Tester',
      url: 'http://test.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    assert.strictEqual(response.body.likes, 0)
  })

  // 4.12
  test('blog without title is not added', async () => {

    const newBlog = {
      author: 'Tester',
      url: 'http://test.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('blog without url is not added', async () => {

    const newBlog = {
      title: 'Missing URL'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(!titles.includes(blogToDelete.title))
})
test('a blog can be updated', async () => {

  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedData = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 5
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 5)
})
test('adding blog fails without token', async () => {

  const newBlog = {
    title: 'Token test',
    author: 'Tester',
    url: 'http://test.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})
})