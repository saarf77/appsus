import { eventBus } from '/services/event-bus.service.js';
import { svgService } from '../services/mail-svg.service.js';
import { clientService } from '../services/mail.service.js';

export default {
    props: ['mail'],
    template:`
        <section class="mail-preview">
            <input class="selected-icon" type="checkbox" />
            <img class="star-icon" :src="starSrc" alt="star" @click="toggleStar" />
            <img class="important-icon" :src="importantIcon" alt="important" @click="toggleImportant"/>
            <section class="mail-info" @click="openPreview">
                <div class="mail-sender" :class="{unread: unreadMail}"> {{ mailSender }}</div>
                <div class="mail-title" >
                    <span :class="{unread: unreadMail}">{{ mailData.subject }} </span>
                    <span> {{ shortenBody }}  </span>
                </div>
                <div class="attach-icon"> <img :src="hasAttach" alt="" /> </div>
                <div class="mail-date" :class="{unread: unreadMail}"> {{ mailDate }} </div>
            </section>
        </section>
    `, 
    data(){
        return {
            mailData: null,
            starSrc: null,
            importantIcon: null,
            unreadMail: false,
            hasAttach: null,
        }
    },
    created(){
        this.mailData = this.mail;
        (this.mail.hasStar)? this.starSrc = svgService.getMailIcon('markStar') :
        this.starSrc = svgService.getMailIcon('star');
        (this.mail.isImportant)? this.importantIcon = svgService.getMailIcon('markImportant') :
        this.importantIcon  = svgService.getMailIcon('notImportant');
        if(!this.mail.isRead) this.unreadMail = true;
        if(this.mail.hasAttach) this.hasAttach = svgService.getMailIcon('markAttach');
        
    },
    methods:{
        openPreview(){
            this.mailData.isRead = true;
            clientService.remove('mail',this.mailData.id)
            clientService.put('mail', this.mailData);
            eventBus.emit('showDetails', this.mailData);
        },
        toggleStar(){
            this.mailData.hasStar = ! this.mailData.hasStar;
            clientService.put('mail', this.mailData);
            (this.mail.hasStar)? this.starSrc = svgService.getMailIcon('markStar') :
            this.starSrc = svgService.getMailIcon('star');
        },
        toggleImportant(){
            this.mailData.isImportant = ! this.mailData.isImportant;
            clientService.put('mail', this.mailData);
            (this.mail.isImportant)? this.importantIcon = svgService.getMailIcon('markImportant') :
            this.importantIcon  = svgService.getMailIcon('notImportant');
        }
        
    },
    computed:{
        shortenBody(){
            return this.mailData.body.substring(0, 50); 
        },
        mailDate(){
            const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September",
                                "October", "November", "December"];

            let currDate = new Date(this.mailData.sentAt);
            if(currDate.getFullYear() === new Date().getFullYear()){
                return currDate.getDay() + ' ' + monthNames[currDate.getMonth()].substring(0,4) +'\`';
            }
            return currDate.getUTCDay() + '.' + currDate.getUTCMonth() + '.' +  currDate.getUTCFullYear() ;
        }, 
        mailSender(){
            let idx = this.mailData.from.indexOf('@');
            if(idx > 20) idx = 20;
            return this.mailData.from.substring(0,idx);
        }
    },
    components:{
        eventBus,
        svgService,
        clientService,
    }
}