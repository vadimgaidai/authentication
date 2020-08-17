import { store } from 'react-notifications-component'
import { NOTIFICATION, NOTIFICATION_SERVER_ERROR } from '../actionTypes'

const initialState = {
	serverErrors: [403, 404, 405, 415, 422, 429, 500],
	errorsApi: {
		403: {
			title: 'Forbidden',
			message: 'This resource is not intended for public access',
		},
		404: {
			title: 'Not found',
			message: 'Try searching at a different address',
		},
		405: {
			title: 'Method not allowed',
			message: 'Invalid resource request method',
		},
		415: {
			title: 'Unsupported Media-Type',
			message: 'Part of the request was made in an unsupported format',
		},
		422: {
			title: 'Unprocessable Entity',
			message:
				'The request is accepted and understood, but cannot be completed due to semantic errors',
		},
		429: {
			title: 'Too Many Requests',
			message: 'Too many requests in a short amount of time',
		},
		500: {
			title: 'Internal server error',
			message: 'The server cannot process the request due to internal errors',
		},
	},
}

const notification = ({
	notificationType: type = '',
	title = '',
	message = '',
}) => {
	store.addNotification({
		type,
		title,
		message,
		animationIn: ['animated', 'fadeIn'],
		animationOut: ['animated', 'fadeOut'],
		dismiss: {
			duration: 2000,
		},
		showIcon: true,
		container: 'top-right',
	})
}

export const notificationReducer = (
	state = initialState,
	{ type, notificationType, title, text, status }
) => {
	switch (type) {
		case NOTIFICATION: {
			notification({ notificationType, title, message: text })
			return {
				...state,
			}
		}
		case NOTIFICATION_SERVER_ERROR: {
			if (status && state.serverErrors.includes(status)) {
				notification({
					type: 'danger',
					title: state.errorsApi[status].title,
					message: state.errorsApi[status].message,
				})
			} else {
				notification({
					type: 'danger',
					title: 'Unknown error',
					message: 'Try reloading the page',
				})
			}
			return {
				...state,
			}
		}
		default:
			return state
	}
}
