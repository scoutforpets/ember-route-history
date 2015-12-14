/**
 * Route History Service
 * This service keeps track of the current route and the previous route state.
 *
 * @module ember-route-history/services/route-history
 * @extends Ember.Service
 */

import Ember from 'ember';

export default Ember.Service.extend({

	/**
	 * Current route
	 *
	 * @property current
	 * @type {String}
	 */
	current: '',

	/**
	 * Previous route
	 * @param  {Array} 'history' The dependent key.
	 * @return The route previously visited
	 */
	previous: Ember.computed('history.[]', function() {
		return this.get('history').get('firstObject');
	}),

	/**
	 * Array contening the history of routes that have been visited.
	 *
	 * @property history
	 * @type {Array}
	 */
	history: Ember.A(),

	/**
	 * Maximum number of entries to keep in the history.
	 *
	 * @property maxHistoryLength
	 * @type number
	 */
	maxHistoryLength: 10,

	/**
	 * Pushes a route name onto the history stack.
	 *
	 * @method pushHistoryState
	 * @param routeName
	 * @return The current history stack.
	 */
	addRouteToHistory(routeName) {
		const maxHistoryLength = this.get('maxHistoryLength');
		let history = this.get('history');

		history.pushObject(routeName);

		if (history.get('length') > maxHistoryLength) {
			history.shiftObject();
		}

		return history;
	},

	/**
	 * @method setCurrentRoute
	 * @param route
	 */
	setCurrentRoute(route) {
		const routeName = route.get('routeName');
		if (routeName !== 'loading') {
			this.set('current', routeName);
			this.addRouteToHistory(routeName);
		}
	}
});
