export default {
	name: 'noteAudio',
	props: ['info'],
	template: `
  			<section class="note-audio">
              <h4 contenteditable="true" class="note-audio-title">{{title}}</h4>
			  <div>
                <audio v-bind:src="'src"></audio>
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
