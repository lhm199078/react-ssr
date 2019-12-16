 import React from 'react'
 import { renderToString } from 'react-dom/server'
 import express from 'express'
 import routes from '../src/App'
import { StaticRouter, matchPath, Route } from 'react-router-dom'
import {getServiceStore} from '../src/store/store'
import { Provider } from 'react-redux'
import Header from '../src/component/Header'
 const app = express()
 const store = getServiceStore()
 app.use(express.static('public'))
 app.get('*', (req, res) => {
    const promises = []
    routes.filter(route => {
        const match = matchPath(req.path, route)
        if(match) {
            const {loadData} = route.component
            if(loadData) {
                promises.push(loadData(store))
            }
        }
        return match
    })
    // 拦截
    const interceptPromises = (promises)=> {
		return promises.map(promise => {
			promise.then(data => {
				return { code: 0, data }
			})
			.catch(err => {
				return { code: 500, err }
			})
        })
	}
    Promise.all(interceptPromises(promises))
        .then(()=>{
            // 把react组件 解析成html
            const content = renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url}>
                        <Header></Header>
                        {routes.map((route)=>{
                            return <Route {...route}></Route>
                        })}
                    </StaticRouter>
                </Provider>
            )
        
            res.send(`
            <html>
            <head>
                <meta charset="utf-8" />
                <title>react ssr</title>
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.__context = ${JSON.stringify(store.getState())}
                </script>
                <script src="/bundle.js"></script>
            </body>
            </html>
            `)
        })
        .catch(err=>{
            console.log(err)
            res.send(`
                <div>报错</div>
            `)
        })
 })

app.listen(3000, ()=>{
    console.log('app listen 3000,')
})