/* eslint-disable no-undef */
class ScrollToTop extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'none';
    this._shadowRoot = this.attachShadow({
      mode: 'open',
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
          .scroll-to-top{
              -webkit-user-drag: none;
              position: fixed;
              bottom: 15px;
              right: 15px;
              width: 40px;
              height: 40px;
              border-radius: 10px;
              text-decoration:none;
              z-index: 1;
              text-align:center;
              background:#FF8377;
              transition: 0.1s all;
          }
          
          .scroll-to-top:hover{
              transition:0.2s all;
              transform: translateY(-5px);
              opacity: 0.9;
              cursor: pointer;
          }
          
          .scroll-to-top span{
              color: white;
              font-size: 1.5em;
          }
      </style>
      
      <a href="#" class="scroll-to-top" title="back to top">
          <span>▲</span>
      </a>
    `;
  }
}

customElements.define('scroll-to-top', ScrollToTop);
