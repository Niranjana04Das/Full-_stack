const _ = require('lodash')

// 4.3
const dummy = (blogs) => {
  return 1
}

// 4.4
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

// 4.5
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((favorite, blog) =>
    blog.likes > favorite.likes ? blog : favorite
  )
}

// 4.6
const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')

  const result = Object.entries(grouped).map(([author, blogs]) => ({
    author,
    blogs: blogs.length
  }))

  return _.maxBy(result, 'blogs')
}

// 4.7
const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')

  const result = Object.entries(grouped).map(([author, blogs]) => ({
    author,
    likes: _.sumBy(blogs, 'likes')
  }))

  return _.maxBy(result, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}