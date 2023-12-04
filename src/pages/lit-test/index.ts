import { LitElement, html, css, render } from 'lit'
import {customElement, property} from 'lit/decorators.js'
import './styles.scss'
console.log('lit test')

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    static styles = css`p {color: blue}`;

    @property() 
    name = 'Somebody';

    render() {
        return html`<p>Hello, ${this.name}!</p>`;
    }
}



const test = html`<simple-greeting name="zzzasdfddddasfasdf"></simple-greeting>`
render(test, document.body)


import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MyDB extends DBSchema {
    'favourite-number': {
        key: string;
        value: number;
    };
    'products': {
        key: string;
        value: {
            name: string;
            price: number;
            productCode?: string;
        },
        indexes: {'by-price': number}
    }
}

interface MYDBV2 extends DBSchema {
    'fave-num': {key: string; value: number;}
}

async function demo(){
    const db = await openDB<MYDBV2>('my-db', 2, {
        upgrade(db, oldVersion) {
            // db.createObjectStore('favourite-number')
            // const productStore = db.createObjectStore('products', {
            //     keyPath: 'productCode'
            // });
            // productStore.createIndex('by-price', 'price')
            console.log(`db: ${db}`)
            console.log(`oldVersion: ${oldVersion}`)
            const v1Db = db as unknown as IDBPDatabase<MyDB>
            if(oldVersion < 1){
                v1Db.createObjectStore('favourite-number')
            }
            if(oldVersion < 2){
                const store = v1Db.createObjectStore('favourite-number')
                store.name = 'fave-num'
            }
        }
    })
    await db.put('fave-num', 11)
    // await db.put('favourite-number', 7, 'Jen')
    // await db.put('favourite-number', 8, 'Jake');

    // await db.put('products', {name: 'hihi2', price: 123})
}

demo()


class CurrnetTime extends HTMLElement {
    _timer?: number
    
    constructor() {
        //클래스 초기화, 속성이나 하위 노드는 접근할 수는 없다.
        super()
    }
    static get observedAttributes() {
        return ['locale']
    }
    connectedCallback() {
        this.start();
    }
    disconnectedCallback() {
        this.stop()
    }
    attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
        //속성이 추가/제거/변경 되었다.
        // this[attrName] = newVal;
    }
    adoptedCallback(oldDoc: any, newDoc: any){
        //다른 Document에서 옮겨저 왔음
        //자주 쓸 일은 없다.
    }

    start() {
        this.stop();
        this._timer = window.setInterval(()=>{
            this.innerText = new Date().toLocaleString(this.locale)
        }, 1000)
    }
    stop() {
        if (this._timer) {
            window.clearInterval(this._timer)
            this._timer = undefined;
        }
    }
}
window.customElements.define('current-time', CurrnetTime)