



export default {
    props: ['todo'],
    template: `
    <section class="todo-txt">
            <li @click="done" :class="isDone"> {{todo.txt}} </li>
    </section>
    `,
    methods: {
        done() {
            this.todo.isDone = !this.todo.isDone;
            this.$emit('updateIsDone', this.todo)
        }
    },
    computed: {
       isDone() {
           return { done: this.todo.isDone}
       }
    }
} 