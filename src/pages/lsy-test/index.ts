import './styles.scss'

class MyCustomElement extends HTMLElement {
  static observedAttributes = ["color", "size"];
  _internls: ElementInternals;
  constructor() {
    super();
  }

  connectedCallback(){
    console.log('Custom element added to page.')
  }

  disconnectedCallback() {
    console.log('Custom element removed from page')
  }

  adoptedCallback() {
    console.log('Custom element moved to new page')
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any){
    console.log(`Attribute ${name} has changed. ${oldValue} ${newValue}`)
  }
}

customElements.define('my-custom-element', MyCustomElement)

class PopupInfo extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    //create a shadow root
    const shadow = this.attachShadow({mode: "open"});

    //Create spans
    const wrapper = document.createElement("span")
    wrapper.setAttribute("class", "wrapper");

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', "0");

    const info = document.createElement('span');
    info.setAttribute('class', 'info');

    const text = this.getAttribute('data-text');
    info.textContent = text;

    const imgUrl = this.getAttribute('img') || 'img/default.png'

    const img = document.createElement('img')
    img.src = imgUrl;
    icon.appendChild(img);

    //Create som CSS to apply to the shadow dom
    const style = document.createElement('style');
    console.log(style.isConnected);

    style.textContent = `
      .wrapper {
        position: relative;
      }

      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid blck;
        padding: 10px;
        backgroud: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }

      img {
        width: 1.2rem;
      }

      .icon:hover + .info, .icon:focus + .info {
        opcity: 1;
      }
    `

    shadow.appendChild(style)
    console.log(style.isConnected)
    shadow.appendChild(wrapper)
    wrapper.appendChild(icon)
    wrapper.appendChild(info)
  }
}

customElements.define("popup-info", PopupInfo);