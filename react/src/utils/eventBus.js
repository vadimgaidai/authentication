const eventBus = {
	events: {},
	emit(event, data) {
		if (!this.events[event]) return
		for (const callback of this.events[event]) {
			callback(data)
		}
	},
	on(event, callback) {
		if (!this.events[event]) {
			this.events[event] = []
		}
		this.events[event].push(callback)
	},
	remove(event) {
		delete this.events[event]
	},
}

export default eventBus
