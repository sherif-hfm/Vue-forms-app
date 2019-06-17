import Vue from 'vue';

export class FormGroup
{
    constructor(_vform){
        //console.log('FormGroup constructor');       
        for(let k in _vform)
            this[k]=_vform[k];
        //console.log(this.vForm);
    }
    get(controlName)
    {
        //console.log('get ' + controlName + ' '+controlName.includes('.'));
        try {
            let _control;
            if(controlName.includes('.'))
            {
                controlName.split('.').reduce((accumulator, currentValue)=>{  
                    //console.log(accumulator+ '-' + currentValue);
                if(accumulator == undefined)
                    _control =_control[currentValue]
                else
                _control =this[accumulator][currentValue];
            });
            }
            else
            {
                _control=this[controlName]
                //console.log(this[controlName]);
            }
        return _control ;
          }
          catch(err) {
              console.log('error' + err)
            return null;
          }
    }
    ClearVnode()
    {
        for(let k in this)
        {
            if(this[k] instanceof FormGroup){
                this[k].ClearVnode();
            }
            else{
                this[k].vNodes=[];                
            }
        }
    }
    ClearUnlinkedValue()
    {
        for(let k in this)
        {
            if(this[k] instanceof FormGroup){
                this[k].ClearUnlinkedValue();
            }
            else{
                if(this[k].vNodes.length==0){
                    this[k]._value=undefined;                
                }
                
            }
        }
    }
}

export class FormControl
{
    constructor(){
        //console.log('FormControl constructor');
        this._value=undefined;
        this.vNodes=[];
    }
    setValue(newValue)
    {
        this._value=newValue;
        if(this.vNodes.length > 0)
        {
            this.vNodes.forEach(vNode=>{
                if(vNode.tag.startsWith('vue-component'))
                {
                    vNode.componentInstance.value=newValue;
                }
                else if(vNode.tag=='select')
                {
                    vNode.children.forEach(option=>{
                        if(newValue==option.elm.value){
                            option.elm.setAttribute("selected", "true");
                        }
                        else{
                            option.elm.removeAttribute("selected");
                        }
                    })
                }
                else
                {
                    switch(vNode.elm.type)
                    {
                        case 'radio':
                            if(vNode.elm.value == newValue)  
                                vNode.elm.checked=true;
                            break;
                        case 'checkbox':
                            vNode.elm.checked=newValue;
                            break;
                        default:
                            vNode.elm.value=newValue;
                    }
                }
            })
            
        }
    }    
    get value() {
        return this._value;
      }
      ApplyValue()
      {
        if(this._value!= undefined)
            this.setValue(this._value);
      }
}

export class FormArray
{
    constructor(){
        //console.log('FormControl constructor');
        this._value=undefined;
        this.vNodes=[];
    }
    setValue(newValue)
    {
        if(Array.isArray(newValue))
        {
            this._value=[];
            this._value.push(...newValue);
              
            if(this.vNodes.length > 0)
            {
                this.vNodes.forEach(vNode=>{                    
                    if(vNode.tag.startsWith('vue-component'))
                    {
                        vNode.componentInstance.value=newValue;
                    }
                    else if(vNode.tag=='select')
                    {
                        vNode.children.forEach(option=>{
                            if(newValue.includes(option.elm.value)){
                                option.elm.setAttribute("selected", "true");
                            }
                            else{
                                option.elm.removeAttribute("selected");
                            }
                        })
                    }
                })
                
            }
        }
    }    
    get value() {
        return this._value;
      }
      ApplyValue()
      {
          if(this._value!= undefined)
            this.setValue(this._value);
      }
}

const bindData={
    lastEl:{},
    lastBinding:{},
    lastvnode:{},
    formChangeEvent:false
}

const bindEvent=function(el, binding, vnode,){
    //console.log(vnode);
    if(vnode.tag=="form" && bindData.formChangeEvent==false)
    {
        var config = { attributes: false, childList: true, subtree: true };
        var callback = function(mutationsList, observer) {
            //console.log('observer');
            bindData.lastBinding.value.ClearVnode();
            bindEvent(bindData.lastEl, bindData.lastBinding, bindData.lastvnode);
            bindData.lastBinding.value.ClearUnlinkedValue();
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
                        let controlName=element.data.attrs.formControlName;
                        let control=binding.value.get(controlName);
                        if(control != undefined){
                            // set control value
                            
                            
                            // if(element.tag.startsWith('vue-component'))
                            // {
                            //     control.setValue(element.componentInstance.value)
                            // }
                            // else if(element.tag=='select')
                            // {

                            // }
                            // else
                            // {
                            //     switch(element.elm.type) {
                            //         case 'checkbox':
                            //                 control.setValue(element.elm.checked);
                            //               break;
                            //               case 'radio':
                            //                 if(element.elm.checked)  
                            //                     control.setValue(element.elm.value);
                            //               break;
                            //         default:                                            
                            //                 control.setValue(element.elm.value);
                            //     }
                            // }
                            
                            element.elm.formControl=control;
                            element.elm.formControlName=controlName;
                            control.vNodes.push(element);
                            
                            if(element.tag.startsWith('vue-component'))
                            {
                                element.componentInstance.$on('input',function(e){
                                    e.$el.formControl.setValue(e.value);
                                })
                            }
                            else if(element.tag=='select')
                            {
                                element.elm.onchange=function(e){
                                    if(e.target.formControl instanceof FormArray)
                                    {
                                        let selectedOptions=[];
                                        Array.apply(null, e.target.options).map(option=>{
                                            if(option.selected)
                                             {
                                                 selectedOptions.push(option.value);
                                             }
                                        });
                                        e.target.formControl.setValue(selectedOptions)
                                    }
                                    else if(e.target.formControl instanceof FormControl)
                                    {
                                        e.target.formControl.setValue(e.target.options[e.target.selectedIndex].value);
                                    }
                                }
                            }
                            else
                            {
                                element.elm.oninput=function(e){    
                                    switch(e.target.type) {
                                        case 'checkbox':
                                            e.target.formControl.setValue(e.target.checked);
                                          break;
                                        case 'radio':
                                            e.target.formControl.setValue(e.target.value)
                                          break;
                                        default:
                                            e.target.formControl.setValue(e.target.value);
                                      }
                                }
                            }
                            // apply model value to ui
                            control.ApplyValue();
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