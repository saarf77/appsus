import { eventBus } from '../../../services/event-bus.service.js'

export default {
    props: ['note'],
    template: `
    <section v-if="note" class="note-edit">
        <form class="edit-form" @submit.prevent="update">
            <input v-model="noteTxt">
            <div class="edit-btns">
                <button @click="update">Update</button>
                <button @click="closeEdit">Cancel</button>
            </div>
        </form> 
    </section>
    `,
    data() {
        return {
            noteTxt: null
        }
    },
    methods: {
        getNoteTxt() {
            if (this.note.type === 'NoteTodos') this.noteTxt = this.note.info.todos.map(todo => todo.txt ).join(',');
            if (this.note.type === 'NoteImg') this.noteTxt = this.note.info.url;
            if (this.note.type === 'NoteVideo') this.noteTxt = this.note.info.url;
            if (this.note.type === 'NoteTxt') this.noteTxt = this.note.info.txt;
        },
        update() {
            eventBus.$emit('update', this.noteTxt, this.note);
            this.closeEdit();
        },
        closeEdit() {
            this.$emit('closeEdit');
        }
    },
    computed: {
       
    },
    created() {
       this.getNoteTxt()
    }
}