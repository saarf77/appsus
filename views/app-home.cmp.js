export default {
	name: 'appHome',
	template: `
        <section class="home-page app-main">
			<h2>Make life easier with a little help from our products</h2>
			<div class="home-page-img-container flex column align-center">
				<div class="flex space-around">
					<div class="img-container" @click="onNotes">
						<img src="assets/img/icons8-google-keep-144.svg">
						<h3>Notes</h3>
					</div>
					<div class="img-container" @click="onMail">
						<img src="assets/img/icons8-gmail-144.svg">
						<h3>Gmail</h3>
					</div>
					<div class="img-container" @click="onBooks">
						<img src="assets/img/icons8-google-books.svg">
						<h3>Books</h3>
					</div>
				</div>
			</div>
		</section>
	  `,

	methods: {
		onNotes() {
			this.$router.push('/keep')
		},
		onMail() {
			this.$router.push('/mail/list')
		},
		onBooks() {
			this.$router.push('/books')
		},
	},
}


