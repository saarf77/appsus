export default {
	name: 'noteVideo',
	props: ['info'],
	template: `
			<section class="note-video">
              <h4 class="note-video-title" contenteditable="true">{{title}}</h4>
				<div class="video-container">
					<iframe v-bind:src="src" frameborder="1"></iframe>
				</div>
			</section>
          `,
	data() {
		return {
			title: this.info.title,
			src: this.info.src,
		}
	},
	methods: {},
	computed: {},
}
