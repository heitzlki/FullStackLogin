const bcrypt = require('bcrypt')
const {
	ApolloError,
	UserInputError,
	AuthenticationError
} = require('apollo-server')
const jwt = require('jsonwebtoken')

const User = require('../models/user');
const {
	JWT_SECRET
} = require('../config/env.js')

const resolvers = {
	Query: {
		getUsers: async (parent, args, context) => {
			try {
				let user
				if (context.req && context.req.headers.authorization) {
					const token = context.req.headers.authorization.split('Bearer ')[1]
					jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
						if (err) {
							throw new AuthenticationError('Unauthenticated')
						}
						user = decodedToken
					})
				}

				return users
			} catch (err) {
				console.log(err)
				throw err
			}
		},
		login: async (parent, args) => {
			const {
				name,
				password
			} = args
			let errors = {}

			try {
				if (name.trim() === '') {
					errors.name = 'name must not be empty'
				}
				if (password === '') {
					errors.password = 'password must not be empty'
				}

				if (Object.keys(errors).length > 0) {
					throw new UserInputError('bad input', {
						errors
					})
				}

				const user = await User.findOne({
					name
				});

				if (!user) {
					errors.name = 'user not found'
					throw new UserInputError('user not found', {
						errors
					})
				}

				const correctPassword = await bcrypt.compare(password, user.password)

				if (!correctPassword) {
					errors.password = 'password is incorrect'
					throw new UserInputError('password is incorrect', {
						errors
					})
				}

				const token = jwt.sign({
					name
				}, JWT_SECRET, {
					expiresIn: 60 * 60,
				})

				return {
					...user.toJSON(),
					token,
				}
			} catch (err) {
				throw err
			}
		},
	},
	Mutation: {
		register: async (parent, args) => {
			let {
				name,
				password,
				confirmPassword
			} = args
			let errors = {}

			try {
				// Validate input data
				if (name.trim() === '')
					errors.name = 'name must not be empty'
				if (password.trim() === '')
					errors.password = 'password must not be empty'
				if (confirmPassword.trim() === '')
					errors.confirmPassword = 'repeat password must not be empty'

				if (password !== confirmPassword)
					errors.confirmPassword = 'passwords must match'

				// Check if name exists
				const userName = await User.findOne({
					name
				})

				if (userName) {
					errors.name = 'name is taken'
				}

				if (Object.keys(errors).length > 0) {
					throw new UserInputError('bad input', {
						errors
					})
				}

				// Hash password
				password = await bcrypt.hash(password, 12)

				// Create user
				let user = new User({
					name,
					password,
				});

				const userSave = await user.save();

				// Return user
				return userSave
			} catch (err) {
				throw new UserInputError('bad input', {
					errors: err
				})
			}
		},
	},
}

module.exports = resolvers;