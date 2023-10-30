const app = Vue.createApp({
	// template: '<h2>Hello word</h2>',
	data() {
		return {
			showMore: false,
			bookName: 'Vue.js 3',
			number: 100,
		}
	},
	methods: {
		changeBookName: function() {
			this.bookName = 'Vue.js 3.0 - Bootstrap 5';
		},
		showMoreChange() {
			this.showMore = !this.showMore;
		},
		handleEvent(event) {
			console.log(event);
		},
		handleMouseMouve(event) {
			
		},
	}
});

app.mount('#app');