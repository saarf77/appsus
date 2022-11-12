export default {
	name: 'noteTodos',
	props: ['info'],
	template: `
	<section class="note-todos" >
		<h4 class="todo-list-title" contenteditable="true">{{title}}</h4>
		<ul class="todo-list">
		  <li v-for="(todo,idx) in todos" :class="{done: todo.isDone}" @click="toggleDone(idx)" contenteditable="true">{{todo.task}}</li>
		  <!-- <li class="fa-regular fa-square" v-for="(todo,idx) in todos" :class="{done: todo.isDone}" @click="toggleDone(idx)" contenteditable="true">{{todo.task}}</li> -->
		</ul>
	</section>
	`,
	data() {
		return {
			title: this.info.title,
			todos: this.info.todos,
		}
	},
	methods: {
		onToggleCheck(todoIdx, noteId){
			noteService
			  .toggleTodoCheck(todoIdx, noteId)
			  .then((todos) => this.setState({ todos }))
		  },
		toggleDone(idx) {
			this.todos[idx].isDone = !this.todos[idx].isDone
			this.$emit('updateInfo', { title: this.title, todos: this.todos })
		},
	},
	computed: {},
}
