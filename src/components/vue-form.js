import Vue from 'vue';

export class FormGroup
{
    constructor(_vform){
        //console.log('FormGroup constructor');       
        for(let k in _vform)
            this[k]=_vform[k];
        //console.log(this.vForm);
    }
    get(controlName,formControlIndex){
        try {
            let _control;
            if(controlName.includes('.')){
                let path=controlName.split('.');
                let newPath=path.splice(1).join('.');
                return this[path[0]].get(newPath,formControlIndex);
            }
            else{
                return this[controlName];
            }
          }
          catch(err) {
            console.log('error' + err)
            return null;
          }
    }
    ClearVnode(){
        for(let k in this){
            if(this[k] instanceof FormGroup || this[k] instanceof FormArray){
                this[k].ClearVnode();
            }
            else{
                this[k].vNodes=[];                
            }
        }
    }
    ClearUnlinkedValue(){
        for(let k in this){
            if(this[k] instanceof FormGroup){
                this[k].ClearUnlinkedValue();
            }
            else if(this[k] instanceof FormControl){
                if(this[k].vNodes.length==0){
                    this[k]._value=undefined;                
                }
            }
            else if(this[k] instanceof FormArray){
                if(this[k].vNodes.length==0){
                    this[k]._value=undefined;                
                }
            }
        }
    }

    Push(prop,data)
    {
        Vue.set(this, prop, data);
    }
}

export class FormControl
{
    constructor(defValue){
        //console.log('FormControl constructor');
        this._value=defValue;
        this.vNodes=[];
    }

    setValue(newValue){
        this.UpdateModelValue(newValue)
        this.UpdateUiValue();
    }

    get value() {
        return this._value;
      }

      UpdateModelValue(newValue){
            this._value=newValue;
      }

      UpdateUiValue()
      {
          //if(this._value != undefined && this.IsvNodeExist())
          if(this._value)
          {
            this.vNodes.forEach(vnode=>{
                SetElementValue(vnode,this._value);
            })
          }
          else
          {
            this.vNodes.forEach(vnode=>{
                ClearElementValue(vnode);
            })
          }
      }

      IsvNodeExist()
      {
        if(this.vNodes != undefined && this.vNodes != null && this.vNodes.length >0) 
            return true;
        else
            return false;
      }
}

export class FormArray
{
    constructor(){
        //console.log('FormArray constructor');
        this._value=[];
        this.vNodes=[];
        this.Controls=[];
    }
    get(controlName,formControlIndex){
        return this.Controls[formControlIndex].get(controlName)
    }

    ClearVnode(){
        this.Controls.forEach(element => {
            element.ClearVnode();
        });
    }

    get value() {
        return this._value;
      }

      Push(obj){
        this.Controls.push(obj) 
      }
}

const GetElementValue=function(elm)
{
    let crElm=elm;
    if(elm.constructor.toString().includes('VNode')) // elm.constructor.name=='VNode'
    {
        if(elm.componentInstance != undefined)
            crElm=elm.componentInstance;
        else
            crElm=elm.elm
    }
    if(crElm.constructor.toString().includes('VueComponent')) // crElm.constructor.name=='VueComponent'
    {
        return crElm.value;
    }
    else if(crElm.constructor.toString().includes('HTMLInputElement')) // crElm.constructor.name=='HTMLInputElement'
    {
        switch(crElm.type)
        {
            case 'checkbox':
                    return crElm.checked;
            break;
            case 'radio':
                    return crElm.value
            break;
            default:
                return crElm.value
        }
    }
    else if(crElm.constructor.toString().includes('HTMLSelectElement')) // crElm.constructor.name=='HTMLSelectElement'
    {
        let selectedOptions=[];
        Array.apply(null, crElm.options).map(option=>{
            if(option.selected)
                {
                    selectedOptions.push(option.value);
                }
        });
        return selectedOptions
    }
}

const SetElementValue=function(elm,newValue)
{
    let crElm=elm;
    if(elm.constructor.toString().includes('VNode')) // elm.constructor.name=='VNode'
    {
        if(elm.componentInstance != undefined)
            crElm=elm.componentInstance;
        else
            crElm=elm.elm
    }
    if(crElm.constructor.toString().includes('VueComponent')){ // crElm.constructor.name=='VueComponent'
        crElm.value=newValue;
    }
    else if(crElm.constructor.toString().includes('HTMLInputElement')){ // crElm.constructor.name=='HTMLInputElement'
        switch(crElm.type){
            case 'checkbox':
                crElm.checked=newValue;
            break;
            case 'radio':
                if(crElm.value == newValue)  
                    crElm.checked=true;
            break;
            default:
                crElm.value=newValue;
        }
    }
    else if(crElm.constructor.toString().includes('HTMLSelectElement')){ //crElm.constructor.name=='HTMLSelectElement'
        crElm.selectedIndex=-1;
        for(var i = 0; i < crElm.options.length; i++) {
            let option=crElm.options[i];
            if(newValue.includes(option.value)){
                option.selected=true;
            }
            else{
                option.selected=false;
            }
          }
        
    }
}

const ClearElementValue=function(elm)
{
    let crElm=elm;
    if(elm.constructor.toString().includes('VNode')) // elm.constructor.name=='VNode'
    {
        if(elm.componentInstance != undefined)
            crElm=elm.componentInstance;
        else
            crElm=elm.elm
    }
    if(crElm.constructor.toString().includes('VueComponent')){ // crElm.constructor.name=='VueComponent'
        crElm.value=null;
    }
    else if(crElm.constructor.toString().includes('HTMLInputElement')){ // crElm.constructor.name=='HTMLInputElement'
        switch(crElm.type){
            case 'checkbox':
                crElm.checked=false;
            break;
            case 'radio':               
            break;
            default:
                crElm.value=null;
        }
    }
    else if(crElm.constructor.toString().includes('HTMLSelectElement')){ //crElm.constructor.name=='HTMLSelectElement'
        crElm.selectedIndex=-1;
    }
}

const bindData={
    lastEl:{},
    lastBinding:{},
    lastvnode:{},
    formChangeEvent:false
}

const bindEvent=function(el, binding, vnode){
    //console.log(vnode);
    if(vnode.tag=="form" && bindData.formChangeEvent==false)
    {
        var config = { attributes: false, childList: true, subtree: true };
        var callback = function(mutationsList, observer) {
            bindData.lastBinding.value.ClearVnode();
            bindEvent(bindData.lastEl, bindData.lastBinding, bindData.lastvnode);
            //bindData.lastBinding.value.ClearUnlinkedValue();
        };
        var observer = new MutationObserver(callback);
        observer.observe(vnode.elm, config);
        bindData.formChangeEvent=true;

    }
    if(vnode.children != undefined)
    {
        vnode.children.forEach(element => {            
            if(element.data != undefined)
            {
                if(element.data.attrs != undefined)
                {                    
                    if(element.data.attrs.formControlName != undefined)
                    {   
                        let formControlIndex;                     
                        if(element.data.attrs.formControlIndex != undefined)
                            formControlIndex=element.data.attrs.formControlIndex
                        let controlName=element.data.attrs.formControlName;
                        let control=binding.value.get(controlName,formControlIndex);
                        // console.log(controlName);
                        // console.log(control);
                        if(control != undefined){
                            
                            element.elm.formControl=control;
                            element.elm.formControlName=controlName;
                            control.vNodes.push(element);
                            
                            if(element.tag.startsWith('vue-component'))
                            {
                                element.componentInstance.$on('input',function(e){
                                    //console.log('input');
                                    //console.log(e);
                                    e.$el.formControl.UpdateModelValue(GetElementValue(e),formControlIndex);
                                })
                            }
                            else if(element.tag=='select')
                            {
                                element.elm.onchange=function(e){
                                    //console.log('onchange');
                                    //console.log(e.target);
                                    e.target.formControl.UpdateModelValue(GetElementValue(e.target),formControlIndex)
                                }
                            }
                            else
                            {
                                const inputEvent=function(e)
                                {
                                    //console.log('oninput');
                                    //console.log(e.target);
                                    e.target.formControl.UpdateModelValue(GetElementValue(e.target),formControlIndex)
                                    
                                };
                                switch(element.data.attrs.type) {
                                    case 'checkbox':
                                            element.elm.onchange=inputEvent;
                                      break;
                                    case 'radio':
                                            element.elm.onchange=inputEvent;
                                      break;
                                    default:
                                            element.elm.oninput=inputEvent;
                                        
                                  }
                            }
                            // Update ui by model data
                            control.UpdateUiValue();
                        }
                    }
                }
            }
            bindEvent(element.elm,binding,element)
        }); 
    }
}



export const VFormGroup = {    
    bind:function(el, binding, vnode){
        //console.log('bind');        
        //console.log(vnode);
        bindEvent(el, binding, vnode);
    },
    inserted:function(el, binding, vnode){
        //console.log('inserted');
        
      },
      update:function(el, binding, vnode,oldVnode){
        //console.log('update');
        bindData.lastEl=el;
        bindData.lastBinding=binding;
        bindData.lastvnode=vnode;
      },
      componentUpdated:function(el, binding, vnode,oldVnode){
        //console.log('componentUpdated');
        
      },
      unbind:function(el, binding, vnode){
        //console.log('unbind');
      },
      
}


Vue.directive('FormGroup', VFormGroup)