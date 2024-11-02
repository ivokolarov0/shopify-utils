import { conditions, options } from './options';

export function dynamicContentHTML(){
  return `
    <div class="${this.prefix}-dynamic-content ${this.prefix}-sidepanel">
      <span class="${this.prefix}-sidepanel__close"></span>
      <form class="js-${this.prefix}-dynamic-form">
        <h4>Conditions</h4>
        <div class="js-${this.prefix}-dynamic-rows">
          ${this.dynamicRow()}
        </div>
        <h4>Target</h4>
        <div class="js-${this.prefix}-option-row">
          ${this.generateOptionType()}
          <select class="dynamic-option-method"></select>
        </div>
        <textarea class="entry"></textarea>
        <button type="submit" class="btn">Start</button>
      </form>
    </div>
  `;
}

export function dynamicRow(){
  return `
    <div class="dynamic-row">
      ${this.generateConditionType()}
      <select class="dynamic-condition"></select>
      <input type="text" class="dynamic-check value="" />
    </div>
  `
}

export function appendDynamicContentHTML(){
  const currentPage = this.getCurrentPageType();
  if(currentPage[0] === 'navigation' || currentPage[0] === 'order' || currentPage[0] === 'orders'){
    return;
  }
  this.sidebar.querySelector(`.${this.prefix}-modals`).innerHTML = this.dynamicContentHTML();
}

export function generateConditionType(){
  const currentPage = this.getCurrentPageType();
  const conditionsFilter = conditions.filter(item => item.scope.indexOf(currentPage[0]) > -1)
  const htmlOptions =  conditionsFilter.map(item => `<option value="${item.target}" data-conditions="${item.methods.join(',')}">${item.name}</option>`);
  return `<select class="dynamic-type" onchange="shopifyUtils.conditionPopulate(this)"><option disabled selected>Choose Type</option>${htmlOptions.join('')}</select>`;
}

export function generateOptionType(){
  const currentPage = this.getCurrentPageType();
  const optionsFilter = options.filter(item => item.scope.indexOf(currentPage[0]) > -1);
  const htmlOptions =  optionsFilter.map(item => `<option value="${item.target}" data-conditions="${item.methods.join(',')}">${item.name}</option>`);
  return `<select class="dynamic-option-type" onchange="shopifyUtils.conditionPopulate(this)"><option disabled selected>Choose Type</option>${htmlOptions.join('')}</select>`;
}
