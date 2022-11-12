import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import noteIndexCmp from './apps/keep/pages/note-index.cmp.js'
import aboutTeam from "./views/about-team.cmp.js"
import aboutGoals from "./views/about-goals.cmp.js"
import mailPage from './views/app-mail.cmp.js'
import mailStar from './apps/mail/cmps/mail-star-page.cmp.js'
import mailSchedule from './apps/mail/cmps/mail-schedule.cmp.js'
import mailImportant from './apps/mail/cmps/mail-important.cmp.js'
import mailOutbox from './apps/mail/cmps/mail-outbox.cmp.js'
import mailDraft from './apps/mail/cmps/mail-draft.cmp.js'




const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage,
		},
		{
			path: '/keep',
			component: noteIndexCmp,
		},
		{
			path: '/about',
			component: aboutPage,
			children: [
                {
                    path: 'team',
                    component: aboutTeam,
                },                
                {
                    path: 'goals',
                    component: aboutGoals,
                },                
            ]
		},{
			path: '/mail/list',
			component: mailPage,
			children: [
				{
                    path: '/mail/list',
                    component: mailPage,
                },
				{
                    path: '/mail/stars',
                    component: mailStar,
                },
				{
                    path: '/mail/schedules',
                    component: mailSchedule,
                }, 
				{
                    path: '/mail/important',
                    component: mailImportant,
                },
				{
                    path: '/mail/outbox',
                    component: mailOutbox,
                },{
                    path: '/mail/draft',
                    component: mailDraft,
                },
			]

		},
	],
}
		

export const router = createRouter(routerOptions)
