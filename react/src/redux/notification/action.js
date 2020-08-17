import { NOTIFICATION, NOTIFICATION_SERVER_ERROR } from '../actionTypes'

export const notification = ({
	type: notificationType = '',
	title = '',
	text = '',
}) => ({
	type: NOTIFICATION,
	notificationType,
	title,
	text,
})

export const notificationServerError = (status) => ({
	type: NOTIFICATION_SERVER_ERROR,
	status,
})
