import { svgService } from '../services/mail-svg.service.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
    template:`
    <section :class="{obfuscate: hideDescription, widthslash: isChopped}"
        @mouseenter="expendPanel"
        @mouseleave="detractPanel"
        class="mail-nav">
        <div @click="this.$emit('composeNewMail')" :class="{widthslash: isChopped}" class="compose-new-mail">
            <button>
                <img :src="composeIcon" alt="new" />
            </button>
            <span>Compose</span>
        </div>
        <section class="filters">
            <router-link class="link-inbox" to="/mail/list" @click="select('inbox')">
                <button class="nav-btn circle-animation">
                    <img :src="inboxIcon" alt="inbox" />
                </button>
                <div class="link-txt" :class="{conceal: hideDescription}">inbox</div>
            </router-link> 
            <router-link class="link-star" to="/mail/stars" @click="select('star')">
                <button class="nav-btn circle-animation">
                    <img :src="starIcon" alt="starred" />
                </button>
                <div class="link-txt" :class="{conceal: hideDescription}">starred</div>
            </router-link> 
            <router-link class="link-schedule" to="/mail/schedules">
                <button class="nav-btn circle-animation">
                    <img :src="scheduleIcon" alt="snoozed" />
                </button>
                <div class="link-txt" :class="{conceal: hideDescription}">snoozed</div>
            </router-link> 
            <router-link class="link-important" to="/mail/important" @click="select('important')">
                <button class="nav-btn circle-animation">
                    <img :src="importantIcon" alt="important" />
                </button>
                <div class="link-txt" :class="{conceal: hideDescription}">important</div>
            </router-link> 
            <router-link class="link-sent" to="/mail/outbox" @click="select('sent')">
                <button class="nav-btn circle-animation">
                    <img :src="sentIcon" alt="sent" />
                </button>
                <div class="link-txt" :class="{conceal: hideDescription}" >sent</div>
            </router-link>
            <router-link class="link-draft" to="/mail/draft" @click="select('draft')">
                <button class="nav-btn circle-animation">
                    <img :src="draftIcon" alt="draft" />
                </button>
                <div class="link-txt" :class="{conceal: hideDescription}" >draft</div>
            </router-link> 
        </section>
    </section>
    `, data(){
        return {
            hideDescription: true,
            isChopped: true,
            composeIcon: null, 
            inboxIcon: null,
            starIcon: null,
            scheduleIcon: null,
            importantIcon: null,
            sentIcon: null,
            draftIcon: null,
            filterByStar: false,

        }
    },created(){
        this.composeIcon = svgService.getMailIcon('composeNew');
        this.inboxIcon = svgService.getMailIcon('inboxIcon');
        this.starIcon = svgService.getMailIcon('star');
        this.scheduleIcon = svgService.getMailIcon('scheduleIcon');
        this.importantIcon = svgService.getMailIcon('notImportant');
        this.sentIcon = svgService.getMailIcon('sentIcon');
        this.draftIcon = svgService.getMailIcon('draftIcon');
         
    },
    methods:{
        select(value){
            eventBus.emit('filterByValue', value);
        },
        expendPanel(){
            this.isChopped = false;
            setTimeout(() => {
                this.hideDescription = false;
            }, 75);
        },
        detractPanel(){
            this.isChopped = true;
            this.hideDescription = true
        },
    },
    components: {
        svgService,
        eventBus,
    }
}